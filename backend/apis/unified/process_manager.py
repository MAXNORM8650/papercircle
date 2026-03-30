"""
Process Job Manager
==================
Manages background jobs as separate OS processes for hard cancellation support.
Each job runs in a multiprocessing.Process with file-based status tracking.

Key features:
- Jobs run as multiprocessing.Process (not threads) for hard cancellation
- File-based IPC via JSON status files in job_status/ directory
- cancel_job() uses SIGTERM then SIGKILL for guaranteed termination
- Jobs survive page refresh (server stays running)
- Orphan detection on startup (server restart recovery)
"""

import multiprocessing
import os
import signal
import json
import time
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, Callable

# Status directory for job tracking files
STATUS_DIR = Path(__file__).parent.parent.parent.parent / "job_status"


def update_job_progress(status_file: str, progress: int = None, message: str = None, **extra):
    """Helper for child processes to update their job status file."""
    try:
        path = Path(status_file)
        data = json.loads(path.read_text())
        if progress is not None:
            data["progress"] = progress
        if message is not None:
            data["message"] = message
        data.update(extra)
        path.write_text(json.dumps(data, default=str))
    except Exception:
        pass


def complete_job(status_file: str, result: Any = None):
    """Mark a job as completed in its status file."""
    try:
        path = Path(status_file)
        data = json.loads(path.read_text())
        data["status"] = "completed"
        data["progress"] = 100
        data["message"] = "Completed"
        data["completed_at"] = datetime.now().isoformat()
        if result is not None:
            data["result"] = result
        path.write_text(json.dumps(data, default=str))
    except Exception:
        pass


def fail_job(status_file: str, error: str):
    """Mark a job as failed in its status file."""
    try:
        path = Path(status_file)
        data = json.loads(path.read_text())
        data["status"] = "failed"
        data["message"] = error
        data["completed_at"] = datetime.now().isoformat()
        path.write_text(json.dumps(data, default=str))
    except Exception:
        pass


def _reset_singletons():
    """Reset shared singletons in a forked child process to avoid stale connections."""
    try:
        from . import config as config_module
        config_module._supabase_client = None
    except Exception:
        try:
            import importlib
            config_module = importlib.import_module("unified.config")
            config_module._supabase_client = None
        except Exception:
            pass


class ProcessJobManager:
    """
    Singleton manager for background jobs running as OS processes.

    Usage:
        manager = ProcessJobManager.instance()
        manager.start_job("job123", "research", my_target_func, args=(arg1, arg2))
        status = manager.get_status("job123")
        manager.cancel_job("job123")

    The target function signature must be:
        def my_target_func(status_file: str, arg1, arg2, ...):
            update_job_progress(status_file, progress=50, message="Halfway...")
            ...
            complete_job(status_file, result={"key": "value"})
    """

    _instance = None

    def __init__(self):
        self._jobs: Dict[str, dict] = {}
        STATUS_DIR.mkdir(parents=True, exist_ok=True)
        self._recover_orphans()

    @classmethod
    def instance(cls) -> "ProcessJobManager":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def start_job(
        self,
        job_id: str,
        job_type: str,
        target: Callable,
        args: tuple = (),
        kwargs: dict = None,
    ) -> str:
        """
        Start a job in a separate OS process.

        The target function receives status_file as its first argument,
        followed by *args and **kwargs.
        """
        status_file = str(STATUS_DIR / f"{job_id}.json")

        initial_status = {
            "job_id": job_id,
            "job_type": job_type,
            "status": "running",
            "progress": 0,
            "message": "Starting...",
            "started_at": datetime.now().isoformat(),
            "completed_at": None,
            "pid": None,
            "result": None,
        }
        Path(status_file).write_text(json.dumps(initial_status, default=str))

        process = multiprocessing.Process(
            target=self._job_wrapper,
            args=(status_file, target, args, kwargs or {}),
            daemon=True,
        )
        process.start()

        # Update PID
        initial_status["pid"] = process.pid
        Path(status_file).write_text(json.dumps(initial_status, default=str))

        self._jobs[job_id] = {
            "process": process,
            "job_type": job_type,
            "started_at": datetime.now(),
        }

        return job_id

    @staticmethod
    def _job_wrapper(status_file: str, target: Callable, args: tuple, kwargs: dict):
        """Wrapper that runs in the child process."""
        _reset_singletons()
        try:
            target(status_file, *args, **kwargs)
        except Exception as e:
            fail_job(status_file, str(e))

    def cancel_job(self, job_id: str) -> dict:
        """
        Hard-cancel a job by terminating its OS process.
        Uses SIGTERM first, then SIGKILL if still alive.
        """
        if job_id in self._jobs:
            job = self._jobs[job_id]
            process = job["process"]

            if not process.is_alive():
                self._jobs.pop(job_id, None)
                return {"status": "already_complete", "message": f"Job {job_id} already finished"}

            process.terminate()
            process.join(timeout=5)

            if process.is_alive():
                process.kill()
                process.join(timeout=3)

            self._jobs.pop(job_id, None)
        else:
            # Not tracked in memory - try to kill by PID from status file
            status = self._read_status_file(job_id)
            if not status:
                return {"status": "not_found", "message": f"Job {job_id} not found"}

            if status.get("status") not in ("running",):
                return {"status": "already_complete", "message": f"Job {job_id} already {status.get('status')}"}

            pid = status.get("pid")
            if pid:
                try:
                    os.kill(pid, signal.SIGTERM)
                    time.sleep(2)
                    try:
                        os.kill(pid, signal.SIGKILL)
                    except ProcessLookupError:
                        pass
                except ProcessLookupError:
                    pass

        self._update_status_file(job_id, status="cancelled", message="Cancelled by user")
        return {"status": "cancelled", "message": f"Job {job_id} cancelled"}

    def get_status(self, job_id: str) -> Optional[dict]:
        """Get job status. Detects dead processes and updates status accordingly."""
        data = self._read_status_file(job_id)
        if not data:
            return None

        # If status says running, verify process is actually alive
        if data.get("status") == "running":
            if not self.is_alive(job_id):
                data["status"] = "failed"
                data["message"] = "Process terminated unexpectedly"
                data["completed_at"] = datetime.now().isoformat()
                self._write_status_file(job_id, data)

        return data

    def is_alive(self, job_id: str) -> bool:
        """Check if the job's process is still running."""
        if job_id in self._jobs:
            return self._jobs[job_id]["process"].is_alive()

        # Fall back to PID check
        data = self._read_status_file(job_id)
        if data and data.get("pid"):
            try:
                os.kill(data["pid"], 0)
                return True
            except (ProcessLookupError, OSError):
                pass
        return False

    def list_jobs(self, job_type: str = None, status_filter: str = None) -> list:
        """List all tracked jobs, optionally filtered."""
        results = []
        for status_file in STATUS_DIR.glob("*.json"):
            try:
                data = json.loads(status_file.read_text())
                if job_type and data.get("job_type") != job_type:
                    continue
                if status_filter and data.get("status") != status_filter:
                    continue
                results.append(data)
            except (json.JSONDecodeError, OSError):
                continue
        return results

    def cleanup(self, max_age_hours: int = 24):
        """Remove status files for finished jobs older than max_age_hours."""
        cutoff = datetime.now() - timedelta(hours=max_age_hours)
        for status_file in STATUS_DIR.glob("*.json"):
            try:
                data = json.loads(status_file.read_text())
                if data.get("status") in ("completed", "failed", "cancelled"):
                    completed_at = data.get("completed_at")
                    if completed_at:
                        if datetime.fromisoformat(completed_at) < cutoff:
                            status_file.unlink()
            except (json.JSONDecodeError, OSError, ValueError):
                continue

    def _read_status_file(self, job_id: str) -> Optional[dict]:
        status_file = STATUS_DIR / f"{job_id}.json"
        if not status_file.exists():
            return None
        try:
            return json.loads(status_file.read_text())
        except (json.JSONDecodeError, OSError):
            return None

    def _write_status_file(self, job_id: str, data: dict):
        status_file = STATUS_DIR / f"{job_id}.json"
        try:
            status_file.write_text(json.dumps(data, default=str))
        except OSError:
            pass

    def _update_status_file(self, job_id: str, **updates):
        data = self._read_status_file(job_id)
        if not data:
            return
        data.update(updates)
        if "completed_at" not in updates and updates.get("status") in ("completed", "failed", "cancelled"):
            data["completed_at"] = datetime.now().isoformat()
        self._write_status_file(job_id, data)

    def _recover_orphans(self):
        """On startup, check for running jobs from a previous server instance."""
        for status_file in STATUS_DIR.glob("*.json"):
            try:
                data = json.loads(status_file.read_text())
                if data.get("status") == "running":
                    pid = data.get("pid")
                    job_id = data.get("job_id")
                    if pid:
                        try:
                            os.kill(pid, 0)
                            print(f"[ProcessManager] Orphaned job {job_id} (PID {pid}) still alive")
                        except ProcessLookupError:
                            data["status"] = "failed"
                            data["message"] = "Process died during server restart"
                            data["completed_at"] = datetime.now().isoformat()
                            status_file.write_text(json.dumps(data, default=str))
                            print(f"[ProcessManager] Marked orphaned job {job_id} as failed")
            except (json.JSONDecodeError, OSError):
                continue

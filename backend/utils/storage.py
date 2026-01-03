"""
Supabase Storage utilities for file uploads/downloads
Replaces local filesystem storage with cloud storage
"""
import os
import json
from pathlib import Path
from typing import Optional, Union
from supabase import create_client, Client
from datetime import datetime

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


class SupabaseStorage:
    """Handle file operations with Supabase Storage"""

    def __init__(self, bucket: str = "research-outputs"):
        self.bucket = bucket

    def upload_file(self, file_path: Union[str, Path], storage_path: str) -> dict:
        """
        Upload a file to Supabase Storage

        Args:
            file_path: Local file path to upload
            storage_path: Destination path in bucket (e.g., "20260103_174904/dashboard.html")

        Returns:
            dict with 'url' and 'path'
        """
        file_path = Path(file_path)

        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        # Read file content
        with open(file_path, 'rb') as f:
            file_content = f.read()

        # Determine content type
        content_type = self._get_content_type(file_path.suffix)

        # Upload to Supabase
        try:
            response = supabase.storage.from_(self.bucket).upload(
                path=storage_path,
                file=file_content,
                file_options={"content-type": content_type, "upsert": "true"}
            )

            # Get public URL
            public_url = supabase.storage.from_(self.bucket).get_public_url(storage_path)

            return {
                "url": public_url,
                "path": storage_path,
                "bucket": self.bucket
            }
        except Exception as e:
            print(f"Upload failed: {e}")
            raise

    def upload_json(self, data: dict, storage_path: str) -> dict:
        """
        Upload JSON data directly to Supabase Storage

        Args:
            data: Dictionary to upload as JSON
            storage_path: Destination path in bucket

        Returns:
            dict with 'url' and 'path'
        """
        json_content = json.dumps(data, indent=2).encode('utf-8')

        try:
            response = supabase.storage.from_(self.bucket).upload(
                path=storage_path,
                file=json_content,
                file_options={"content-type": "application/json", "upsert": "true"}
            )

            public_url = supabase.storage.from_(self.bucket).get_public_url(storage_path)

            return {
                "url": public_url,
                "path": storage_path,
                "bucket": self.bucket
            }
        except Exception as e:
            print(f"JSON upload failed: {e}")
            raise

    def upload_text(self, text: str, storage_path: str, content_type: str = "text/html") -> dict:
        """
        Upload text content (HTML, CSV, etc.) to Supabase Storage

        Args:
            text: Text content to upload
            storage_path: Destination path in bucket
            content_type: MIME type (default: text/html)

        Returns:
            dict with 'url' and 'path'
        """
        text_content = text.encode('utf-8')

        try:
            response = supabase.storage.from_(self.bucket).upload(
                path=storage_path,
                file=text_content,
                file_options={"content-type": content_type, "upsert": "true"}
            )

            public_url = supabase.storage.from_(self.bucket).get_public_url(storage_path)

            return {
                "url": public_url,
                "path": storage_path,
                "bucket": self.bucket
            }
        except Exception as e:
            print(f"Text upload failed: {e}")
            raise

    def download_file(self, storage_path: str, local_path: Optional[Union[str, Path]] = None) -> bytes:
        """
        Download a file from Supabase Storage

        Args:
            storage_path: Path in bucket
            local_path: Optional local path to save file

        Returns:
            File content as bytes
        """
        try:
            response = supabase.storage.from_(self.bucket).download(storage_path)

            if local_path:
                local_path = Path(local_path)
                local_path.parent.mkdir(parents=True, exist_ok=True)
                with open(local_path, 'wb') as f:
                    f.write(response)

            return response
        except Exception as e:
            print(f"Download failed: {e}")
            raise

    def download_json(self, storage_path: str) -> dict:
        """
        Download and parse JSON from Supabase Storage

        Args:
            storage_path: Path in bucket

        Returns:
            Parsed JSON as dict
        """
        content = self.download_file(storage_path)
        return json.loads(content.decode('utf-8'))

    def list_files(self, prefix: str = "") -> list:
        """
        List files in bucket with optional prefix filter

        Args:
            prefix: Optional path prefix to filter (e.g., "20260103_174904/")

        Returns:
            List of file objects
        """
        try:
            response = supabase.storage.from_(self.bucket).list(prefix)
            return response
        except Exception as e:
            print(f"List failed: {e}")
            raise

    def delete_file(self, storage_path: str) -> bool:
        """
        Delete a file from Supabase Storage

        Args:
            storage_path: Path in bucket

        Returns:
            True if successful
        """
        try:
            supabase.storage.from_(self.bucket).remove([storage_path])
            return True
        except Exception as e:
            print(f"Delete failed: {e}")
            return False

    def get_public_url(self, storage_path: str) -> str:
        """
        Get public URL for a file

        Args:
            storage_path: Path in bucket

        Returns:
            Public URL string
        """
        return supabase.storage.from_(self.bucket).get_public_url(storage_path)

    def _get_content_type(self, extension: str) -> str:
        """Map file extension to content type"""
        content_types = {
            '.html': 'text/html',
            '.json': 'application/json',
            '.csv': 'text/csv',
            '.txt': 'text/plain',
            '.pdf': 'application/pdf',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.md': 'text/markdown',
        }
        return content_types.get(extension.lower(), 'application/octet-stream')


# Convenience functions
def upload_research_output(run_id: str, file_name: str, content: Union[str, dict, bytes]) -> dict:
    """
    Upload a research output file

    Args:
        run_id: Research run ID (e.g., "20260103_174904")
        file_name: File name (e.g., "dashboard.html", "papers.json")
        content: File content (string, dict for JSON, or bytes)

    Returns:
        Upload result with URL
    """
    storage = SupabaseStorage("research-outputs")
    storage_path = f"{run_id}/{file_name}"

    if isinstance(content, dict):
        return storage.upload_json(content, storage_path)
    elif isinstance(content, str):
        # Determine content type from file extension
        ext = Path(file_name).suffix
        content_type = storage._get_content_type(ext)
        return storage.upload_text(content, storage_path, content_type)
    elif isinstance(content, bytes):
        # Create temp file and upload
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file_name).suffix) as tmp:
            tmp.write(content)
            tmp_path = tmp.name

        try:
            return storage.upload_file(tmp_path, storage_path)
        finally:
            Path(tmp_path).unlink()
    else:
        raise ValueError(f"Unsupported content type: {type(content)}")


def get_research_output_url(run_id: str, file_name: str) -> str:
    """
    Get public URL for a research output file

    Args:
        run_id: Research run ID
        file_name: File name

    Returns:
        Public URL
    """
    storage = SupabaseStorage("research-outputs")
    return storage.get_public_url(f"{run_id}/{file_name}")


def list_research_runs() -> list:
    """
    List all research run IDs

    Returns:
        List of run IDs (folder names)
    """
    storage = SupabaseStorage("research-outputs")
    files = storage.list_files()

    # Extract unique folder names (run IDs)
    run_ids = set()
    for file in files:
        path_parts = file['name'].split('/')
        if len(path_parts) > 0:
            run_ids.add(path_parts[0])

    return sorted(list(run_ids), reverse=True)

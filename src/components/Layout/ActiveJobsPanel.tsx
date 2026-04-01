import { useState, useEffect, useCallback } from 'react';
import { Loader, X, StopCircle, ChevronDown, ChevronUp, Brain, FileCheck, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { API_BASE_URL } from '../../lib/api';

interface ActiveJob {
  key: string; // localStorage key
  jobId: string;
  paperId: string;
  jobType: 'analysis' | 'review' | 'research';
  paperTitle: string;
  startedAt: string;
  status: string;
  progress: number;
  message: string;
}

const JOB_PREFIX = 'papercircle_';
const POLL_INTERVAL = 5000;

/**
 * Global floating panel that shows all active analysis/review/research jobs.
 * Reads from localStorage, polls backend for status, shows progress.
 * Persists across navigation and page refresh.
 */
export function ActiveJobsPanel() {
  const [jobs, setJobs] = useState<ActiveJob[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [paperTitles, setPaperTitles] = useState<Record<string, string>>({});

  // Scan localStorage for active jobs
  const scanForJobs = useCallback(() => {
    const found: ActiveJob[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Match analysis, review, and research job keys
      if (key.startsWith(`${JOB_PREFIX}analysis_job_`) ||
          key.startsWith(`${JOB_PREFIX}review_job_`) ||
          key.startsWith(`${JOB_PREFIX}research_job`)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '');
          const jobType = key.includes('analysis') ? 'analysis' :
                         key.includes('review') ? 'review' : 'research';

          found.push({
            key,
            jobId: data.jobId || data.timestamp || '',
            paperId: data.paperId || '',
            jobType,
            paperTitle: data.paperTitle || '',
            startedAt: data.startedAt || '',
            status: 'running',
            progress: 0,
            message: 'Checking status...',
          });
        } catch {
          // Invalid JSON, skip
        }
      }
    }

    return found;
  }, []);

  // Fetch paper title from Supabase if we don't have it
  const fetchPaperTitle = useCallback(async (paperId: string) => {
    if (!paperId || paperTitles[paperId]) return;
    try {
      const { data } = await supabase
        .from('papers')
        .select('title')
        .eq('id', paperId)
        .maybeSingle();
      if (data?.title) {
        setPaperTitles(prev => ({ ...prev, [paperId]: data.title }));
      }
    } catch {
      // Ignore
    }
  }, [paperTitles]);

  // Poll job status from backend
  const pollJobStatus = useCallback(async (job: ActiveJob): Promise<ActiveJob | null> => {
    try {
      let url = '';
      if (job.jobType === 'analysis') {
        url = `${API_BASE_URL}/analysis/status/${job.jobId}`;
      } else if (job.jobType === 'review') {
        url = `${API_BASE_URL}/review/status/${job.jobId}`;
      } else if (job.jobType === 'research') {
        url = `${API_BASE_URL}/research/status/${job.jobId}`;
      }

      if (!url) return null;

      const res = await fetch(url);
      if (!res.ok) {
        // Job status not found — could be slow startup, give it time
        // Only remove after 3 minutes of consecutive 404s
        const startedAt = new Date(job.startedAt).getTime();
        const elapsed = Date.now() - startedAt;
        if (elapsed > 3 * 60 * 1000) {
          localStorage.removeItem(job.key);
          return null;
        }
        return { ...job, message: 'Starting process...' };
      }

      const status = await res.json();

      if (status.status === 'completed' || status.status === 'failed' || status.status === 'cancelled') {
        // Job finished — keep in panel briefly so user sees completion, then remove
        localStorage.removeItem(job.key);
        return null;
      }

      return {
        ...job,
        status: status.status || 'running',
        progress: status.progress || 0,
        message: status.message || 'Processing...',
      };
    } catch {
      return job; // Keep showing on network error
    }
  }, []);

  // Cancel a job
  const cancelJob = async (job: ActiveJob) => {
    try {
      let url = '';
      if (job.jobType === 'analysis') {
        url = `${API_BASE_URL}/analysis/cancel/${job.jobId}`;
      } else if (job.jobType === 'review') {
        url = `${API_BASE_URL}/review/cancel/${job.jobId}`;
      } else if (job.jobType === 'research') {
        url = `${API_BASE_URL}/research/cancel/${job.jobId}`;
      }
      if (url) {
        await fetch(url, { method: 'POST' });
      }
    } catch {
      // Ignore
    }
    localStorage.removeItem(job.key);
    setJobs(prev => prev.filter(j => j.key !== job.key));
  };

  // Initial scan + polling loop
  useEffect(() => {
    // Scan immediately
    const initialJobs = scanForJobs();
    setJobs(initialJobs);

    // Fetch paper titles for any jobs that don't have them
    initialJobs.forEach(job => {
      if (job.paperId && !job.paperTitle) {
        fetchPaperTitle(job.paperId);
      }
    });

    // Poll interval
    const interval = setInterval(async () => {
      const currentJobs = scanForJobs();

      if (currentJobs.length === 0) {
        setJobs([]);
        return;
      }

      // Poll status for each job
      const updated: ActiveJob[] = [];
      for (const job of currentJobs) {
        const result = await pollJobStatus(job);
        if (result) {
          // Use cached paper title if available
          if (!result.paperTitle && result.paperId && paperTitles[result.paperId]) {
            result.paperTitle = paperTitles[result.paperId];
          }
          updated.push(result);
        }
      }

      setJobs(updated);
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [paperTitles]);

  // Don't render if no active jobs
  if (jobs.length === 0) return null;

  const jobIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <Brain className="w-4 h-4" />;
      case 'review': return <FileCheck className="w-4 h-4" />;
      case 'research': return <Search className="w-4 h-4" />;
      default: return <Loader className="w-4 h-4" />;
    }
  };

  const jobTypeLabel = (type: string) => {
    switch (type) {
      case 'analysis': return 'Analysis';
      case 'review': return 'Review';
      case 'research': return 'Discovery';
      default: return 'Job';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          <Loader className="w-4 h-4 animate-spin" />
          <span className="text-sm font-semibold">
            {jobs.length} Active Job{jobs.length > 1 ? 's' : ''}
          </span>
        </div>
        {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>

      {/* Job list */}
      {!collapsed && (
        <div className="max-h-64 overflow-y-auto">
          {jobs.map(job => {
            const title = job.paperTitle || paperTitles[job.paperId] || 'Loading paper title...';

            return (
              <div key={job.key} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                {/* Job type badge + title */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="flex-shrink-0 text-blue-600">{jobIcon(job.jobType)}</span>
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded flex-shrink-0">
                      {jobTypeLabel(job.jobType)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); cancelJob(job); }}
                    className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Cancel"
                  >
                    <StopCircle className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Paper title */}
                <p className="text-sm font-medium text-gray-900 truncate mb-1" title={title}>
                  {title.length > 50 ? title.substring(0, 50) + '...' : title}
                </p>

                {/* Status message */}
                <p className="text-xs text-gray-500 truncate mb-1.5">
                  {job.message}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(job.progress, 3)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5 text-right">{job.progress}%</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

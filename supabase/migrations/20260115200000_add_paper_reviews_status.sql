/*
  # Add Status Tracking to Paper Reviews

  This migration adds status tracking columns to the paper_reviews table
  so users can see if a review is in progress even after page refresh.

  Changes:
  - Adds `status` column (pending/processing/completed/failed)
  - Adds `job_id` column to link to background jobs
  - Adds `started_at` column to track when review was initiated
  - Adds `error_message` column for failed reviews
*/

-- Add status column with default 'pending'
ALTER TABLE paper_reviews
ADD COLUMN IF NOT EXISTS status varchar(50) DEFAULT 'pending';

-- Add job_id column for linking to background jobs
ALTER TABLE paper_reviews
ADD COLUMN IF NOT EXISTS job_id varchar(50);

-- Add started_at to track when review was initiated
ALTER TABLE paper_reviews
ADD COLUMN IF NOT EXISTS started_at timestamptz DEFAULT now();

-- Add error_message for failed reviews
ALTER TABLE paper_reviews
ADD COLUMN IF NOT EXISTS error_message text;

-- Create index on job_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_paper_reviews_job_id ON paper_reviews(job_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_paper_reviews_status ON paper_reviews(status);

-- Update existing records to have 'completed' status
UPDATE paper_reviews
SET status = 'completed'
WHERE status IS NULL OR status = 'pending';

-- Add comment
COMMENT ON COLUMN paper_reviews.status IS 'Review status: pending, processing, completed, failed';
COMMENT ON COLUMN paper_reviews.job_id IS 'Background job ID for status polling';
COMMENT ON COLUMN paper_reviews.started_at IS 'When the review was initiated';
COMMENT ON COLUMN paper_reviews.error_message IS 'Error message if review failed';

-- Add AI Edge Metadata Columns
-- Migration to add source_type and confidence_score for AI-generated relationship tracking

-- Add source_type column to track the origin of edges
ALTER TABLE edges
  ADD COLUMN IF NOT EXISTS source_type VARCHAR(20) DEFAULT 'manual';

-- Add comment explaining the source_type values
COMMENT ON COLUMN edges.source_type IS 'Source of edge creation: manual (user-created), ai_review (from paper review analysis), ai_analysis (from mind graph analysis)';

-- Add confidence_score column for AI-generated edges
ALTER TABLE edges
  ADD COLUMN IF NOT EXISTS confidence_score DECIMAL(3,2);

-- Add comment explaining confidence_score
COMMENT ON COLUMN edges.confidence_score IS 'Confidence score for AI-generated edges (0.00 to 1.00). Derived from similarity_score or review analysis confidence.';

-- Create index for filtering by source_type
CREATE INDEX IF NOT EXISTS idx_edges_source_type ON edges(source_type);

-- Create index for filtering AI edges by confidence
CREATE INDEX IF NOT EXISTS idx_edges_confidence ON edges(confidence_score) WHERE source_type != 'manual';

-- Add check constraint to ensure confidence_score is between 0 and 1
ALTER TABLE edges
  ADD CONSTRAINT check_confidence_score_range
  CHECK (confidence_score IS NULL OR (confidence_score >= 0 AND confidence_score <= 1));

-- Update existing AI-generated edges to have source_type 'ai_analysis'
-- This assumes current is_ai_generated edges are from analysis
UPDATE edges
SET source_type = 'ai_analysis'
WHERE is_ai_generated = true AND source_type = 'manual';

-- Update existing AI edges to copy similarity_score to confidence_score if available
UPDATE edges
SET confidence_score = similarity_score
WHERE is_ai_generated = true
  AND similarity_score IS NOT NULL
  AND confidence_score IS NULL
  AND similarity_score >= 0
  AND similarity_score <= 1;

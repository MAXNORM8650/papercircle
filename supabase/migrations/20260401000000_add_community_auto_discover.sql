-- Add auto-discovery fields to communities for dynamic paper feed
-- keywords: research topics the community cares about (used as search queries)
-- discovery_conferences: which conferences to search in the offline DB
-- auto_discover: whether to run daily auto-discovery
-- last_discovery_at: when discovery last ran (to throttle cron)

ALTER TABLE communities ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';
ALTER TABLE communities ADD COLUMN IF NOT EXISTS discovery_conferences TEXT[] DEFAULT '{}';
ALTER TABLE communities ADD COLUMN IF NOT EXISTS auto_discover BOOLEAN DEFAULT true;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS last_discovery_at TIMESTAMPTZ;

-- Add source tracking to community_papers so we know how a paper was added
ALTER TABLE community_papers ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';
-- source values: 'manual', 'auto_discovery', 'ai_discovery', 'arxiv_live'

COMMENT ON COLUMN communities.keywords IS 'Research keywords for auto paper discovery (e.g., ["LLM scaling", "transformer efficiency"])';
COMMENT ON COLUMN communities.discovery_conferences IS 'Conferences to search in offline DB (e.g., ["ICLR", "NeurIPS", "ICML"])';
COMMENT ON COLUMN communities.auto_discover IS 'Enable daily automatic paper discovery based on keywords';
COMMENT ON COLUMN communities.last_discovery_at IS 'Timestamp of last auto-discovery run';
COMMENT ON COLUMN community_papers.source IS 'How this paper was added: manual, auto_discovery, ai_discovery, arxiv_live';

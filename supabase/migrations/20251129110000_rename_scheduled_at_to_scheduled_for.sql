-- Rename scheduled_at to scheduled_for in sessions table
-- This aligns the database column name with the application code

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'scheduled_at'
  ) THEN
    ALTER TABLE sessions RENAME COLUMN scheduled_at TO scheduled_for;
  END IF;
END $$;

COMMENT ON COLUMN sessions.scheduled_for IS 'Date and time when the session is scheduled to occur';

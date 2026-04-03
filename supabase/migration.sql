-- Create the ideas table for App-it
CREATE TABLE IF NOT EXISTS ideas (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  description         TEXT,
  problem_it_solves   TEXT,
  target_audience     TEXT,
  monetization        JSONB    DEFAULT '[]',
  pricing             TEXT,
  complexity          TEXT,
  tech_stack          TEXT,
  dependencies        TEXT,
  impact              INTEGER CHECK (impact BETWEEN 1 AND 5),
  effort              INTEGER CHECK (effort BETWEEN 1 AND 5),
  interest            INTEGER CHECK (interest BETWEEN 1 AND 5),
  tags                JSONB    DEFAULT '[]',
  status              TEXT     DEFAULT '💡 Idea',
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security but allow all operations (single-user, no auth)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON ideas FOR ALL USING (true) WITH CHECK (true);

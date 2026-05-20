-- Add is_builtin column to datasets table
-- This tracks whether a dataset was loaded from the seed script (built-in) or created by a user (custom)

ALTER TABLE datasets ADD COLUMN IF NOT EXISTS is_builtin BOOLEAN DEFAULT false;

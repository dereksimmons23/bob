-- Migration: Enable RLS on test_devices table
-- Date: January 6, 2026
-- Purpose: Secure test_devices table to prevent anonymous access
--
-- Context: The test_devices table stores device_id values used to filter
-- Derek's testing activity from real user analytics. Without RLS, this
-- table was exposed via PostgREST.
--
-- Security model:
--   - Authenticated users: SELECT only (to check if device is test device)
--   - Anonymous users: No access
--   - Service role: Full access (bypasses RLS)
--
-- Note: INSERT/UPDATE/DELETE have no policies, so only service_role can write.

-- Create SELECT policy for authenticated users
CREATE POLICY "authenticated_select" ON public.test_devices
  FOR SELECT
  TO authenticated
  USING (true);

-- Enable Row Level Security on the table
ALTER TABLE public.test_devices ENABLE ROW LEVEL SECURITY;

-- Verification queries (run manually to test):
--
-- As anon (should fail):
--   SELECT * FROM test_devices;
--
-- As authenticated (should succeed):
--   SELECT * FROM test_devices;
--
-- As service_role (should succeed for all operations):
--   INSERT INTO test_devices (device_id) VALUES ('test-123');
--   DELETE FROM test_devices WHERE device_id = 'test-123';

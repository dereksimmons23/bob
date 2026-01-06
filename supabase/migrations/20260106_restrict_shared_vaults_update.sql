-- Migration: Restrict shared_vaults UPDATE to view_count only
-- Date: January 6, 2026
-- Severity: HIGH
--
-- Issue: "Allow view count updates" policy used USING(true) WITH CHECK(true),
-- which allowed anyone to modify ANY field (champions, champion_count, etc.)
--
-- Fix: Replace with policy that only allows view_count to change.
-- All other fields must remain unchanged for the UPDATE to succeed.

DROP POLICY "Allow view count updates" ON public.shared_vaults;

CREATE POLICY "Increment view count only" ON public.shared_vaults
  FOR UPDATE
  USING (true)
  WITH CHECK (
    champions = champions AND
    champion_count = champion_count AND
    device_id = device_id
  );

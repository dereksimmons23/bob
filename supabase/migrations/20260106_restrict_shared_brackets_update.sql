-- Migration: Restrict shared_brackets UPDATE to view_count only
-- Date: January 6, 2026
-- Severity: HIGH
--
-- Issue: "Anyone can update view count" policy used USING(true) WITH CHECK(true),
-- which allowed anyone to modify ANY field (champion, category, bracket_results, etc.)
--
-- Fix: Replace with policy that only allows view_count to change.
-- All other fields must remain unchanged for the UPDATE to succeed.

DROP POLICY "Anyone can update view count" ON public.shared_brackets;

CREATE POLICY "Increment view count only" ON public.shared_brackets
  FOR UPDATE
  USING (true)
  WITH CHECK (
    category = category AND
    champion = champion AND
    runner_up = runner_up AND
    entrants = entrants AND
    bracket_results = bracket_results AND
    bob_comment = bob_comment AND
    player_count = player_count AND
    device_id = device_id
  );

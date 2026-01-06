-- Migration: Remove dangerous DELETE policy on feedback
-- Date: January 6, 2026
-- Severity: HIGH
--
-- Issue: "Anyone can delete feedback" policy allowed any anonymous user
-- to DELETE all feedback records from the database.
--
-- Fix: Remove the policy entirely. Only service_role can delete feedback.

DROP POLICY "Anyone can delete feedback" ON public.feedback;

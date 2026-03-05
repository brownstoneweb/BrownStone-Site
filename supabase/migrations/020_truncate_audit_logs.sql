-- Clear all audit log data (admin audit log + role audit log)
-- Run this migration to empty the audit tables. Safe to run; no schema change.

TRUNCATE TABLE public.admin_audit_log;
TRUNCATE TABLE public.role_audit_log;

-- Snippets / reusable blocks for blog posts (CTA, disclaimer, etc.)
CREATE TABLE IF NOT EXISTS public.snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_snippets_name ON public.snippets(name);
ALTER TABLE public.snippets ENABLE ROW LEVEL SECURITY;

-- Authors and above can read
CREATE POLICY "Authors can read snippets"
  ON public.snippets FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator', 'author'))
  );

-- Only admin and moderator can insert/update/delete
CREATE POLICY "Admins and moderators manage snippets"
  ON public.snippets FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator'))
  );

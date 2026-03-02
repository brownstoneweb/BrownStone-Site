-- Media alt text and captions (key = R2 object key, e.g. media/xxx.jpg)
CREATE TABLE IF NOT EXISTS public.media_meta (
  key TEXT PRIMARY KEY,
  alt TEXT,
  caption TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.media_meta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read media_meta"
  ON public.media_meta FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and moderators manage media_meta"
  ON public.media_meta FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator'))
  );

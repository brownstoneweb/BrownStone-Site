-- Allow moderators to manage categories (INSERT/UPDATE/DELETE), not just admins.
-- App already uses canManageCategories(); RLS was still admin-only.

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;

CREATE POLICY "Admins and moderators can manage categories"
  ON public.categories FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator')))
  WITH CHECK (EXISTS (SELECT 1 FROM public.get_user_roles(auth.uid()) AS r(name) WHERE r.name IN ('admin', 'moderator')));

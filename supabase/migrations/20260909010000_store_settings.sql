CREATE TABLE public.store_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  business_name TEXT NOT NULL DEFAULT 'أبو عمر',
  whatsapp_number TEXT NOT NULL DEFAULT '201274498847',
  map_url TEXT NOT NULL DEFAULT 'https://maps.app.goo.gl/hZVf7MMqG5g5LEMA8',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.store_settings (id, business_name, whatsapp_number, map_url)
VALUES (1, 'أبو عمر', '201274498847', 'https://maps.app.goo.gl/hZVf7MMqG5g5LEMA8')
ON CONFLICT (id) DO NOTHING;

GRANT SELECT ON public.store_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.store_settings TO authenticated;
GRANT ALL ON public.store_settings TO service_role;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "store settings public read" ON public.store_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "store settings admin write" ON public.store_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER store_settings_updated_at BEFORE UPDATE ON public.store_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

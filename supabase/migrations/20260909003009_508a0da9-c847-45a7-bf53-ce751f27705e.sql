
CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.product_status AS ENUM ('AVAILABLE', 'SOLD_OUT');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  username TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile write" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX categories_parent_idx ON public.categories(parent_id);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories public read" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  status public.product_status NOT NULL DEFAULT 'AVAILABLE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX products_created_idx ON public.products(created_at DESC);
CREATE INDEX products_status_idx ON public.products(status);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products public read" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products admin write" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX product_images_product_idx ON public.product_images(product_id);
GRANT SELECT ON public.product_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_images public read" ON public.product_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "product_images admin write" ON public.product_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.product_categories (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);
CREATE INDEX product_categories_category_idx ON public.product_categories(category_id);
GRANT SELECT ON public.product_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_categories TO authenticated;
GRANT ALL ON public.product_categories TO service_role;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_categories public read" ON public.product_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "product_categories admin write" ON public.product_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed categories
INSERT INTO public.categories (id, name, slug, parent_id, sort_order) VALUES
 ('11111111-1111-1111-1111-111111111101', 'هوجان', 'hojan', NULL, 1),
 ('11111111-1111-1111-1111-111111111102', 'F50', 'hojan-f50', '11111111-1111-1111-1111-111111111101', 1),
 ('11111111-1111-1111-1111-111111111103', 'H250', 'hojan-h250', '11111111-1111-1111-1111-111111111101', 2),
 ('11111111-1111-1111-1111-111111111104', 'F250', 'hojan-f250', '11111111-1111-1111-1111-111111111101', 3),
 ('11111111-1111-1111-1111-111111111105', 'جاكي', 'jacky', NULL, 2),
 ('11111111-1111-1111-1111-111111111106', 'R50', 'jacky-r50', '11111111-1111-1111-1111-111111111105', 1),
 ('11111111-1111-1111-1111-111111111107', 'J200', 'jacky-j200', '11111111-1111-1111-1111-111111111105', 2);

-- Seed products
INSERT INTO public.products (id, name, slug, description, price, status) VALUES
 ('22222222-2222-2222-2222-222222222201', 'تيل فرامل أمامي', 'front-brake-pads', 'تيل فرامل أمامي عالي الجودة مقاوم للحرارة، يعطي كفاءة فرملة ممتازة وعمر تشغيلي طويل. مناسب لموديلات هوجان المختلفة.', 250.00, 'AVAILABLE'),
 ('22222222-2222-2222-2222-222222222202', 'طقم جنزير وترس', 'chain-sprocket-kit', 'طقم جنزير وترس أصلي بخامة صلب مقواة، نقل حركة سلس وصوت هادئ أثناء القيادة.', 780.00, 'AVAILABLE'),
 ('22222222-2222-2222-2222-222222222203', 'فلتر زيت وبوجيه', 'oil-filter-spark-plug', 'طقم صيانة دورية يشمل فلتر زيت وبوجيه، يحافظ على أداء الموتور ويقلل استهلاك الوقود.', 180.00, 'SOLD_OUT'),
 ('22222222-2222-2222-2222-222222222204', 'مراية كروم (طقم)', 'chrome-mirrors', 'طقم مرايات كروم لامعة برؤية واسعة وتركيب سهل، تعطي شكل مميز للموتوسيكل.', 320.00, 'AVAILABLE');

INSERT INTO public.product_images (product_id, image_url, is_primary, sort_order) VALUES
 ('22222222-2222-2222-2222-222222222201', '/__l5e/assets-v1/056d3ca7-9f93-4a2b-8f6a-58a13666b0ab/p1.jpg', true, 0),
 ('22222222-2222-2222-2222-222222222201', '/__l5e/assets-v1/7e687915-6d4b-4857-b0df-248eeac6dfbc/p2.jpg', false, 1),
 ('22222222-2222-2222-2222-222222222202', '/__l5e/assets-v1/7e687915-6d4b-4857-b0df-248eeac6dfbc/p2.jpg', true, 0),
 ('22222222-2222-2222-2222-222222222203', '/__l5e/assets-v1/00819a8a-5365-46ad-8c04-44ca8d5d0838/p3.jpg', true, 0),
 ('22222222-2222-2222-2222-222222222204', '/__l5e/assets-v1/d025c578-a5fc-4a75-a27c-3b56a901a10d/p4.jpg', true, 0),
 ('22222222-2222-2222-2222-222222222204', '/__l5e/assets-v1/056d3ca7-9f93-4a2b-8f6a-58a13666b0ab/p1.jpg', false, 1);

INSERT INTO public.product_categories (product_id, category_id) VALUES
 ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111102'),
 ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111103'),
 ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111104'),
 ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111103'),
 ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111106'),
 ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111102'),
 ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111107');

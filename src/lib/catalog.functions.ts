import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type ProductStatus = "AVAILABLE" | "SOLD_OUT";

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  status: ProductStatus;
  created_at: string;
  images: ProductImage[];
  categories: { id: string; name: string; slug: string }[];
}

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

const BUCKET = "product-images";

async function resolveUrls(
  client: ReturnType<typeof publicClient>,
  raw: string[],
): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  const needSigning: string[] = [];
  for (const value of raw) {
    if (!value) continue;
    if (value.startsWith("http") || value.startsWith("/")) map[value] = value;
    else needSigning.push(value);
  }
  if (needSigning.length) {
    const { data } = await client.storage.from(BUCKET).createSignedUrls(needSigning, 60 * 60 * 24 * 7);
    for (const item of data ?? []) {
      if (item.path && item.signedUrl) map[item.path] = item.signedUrl;
    }
  }
  return map;
}

const listSchema = z.object({
  q: z.string().trim().max(120).optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "name"]).optional(),
  limit: z.number().int().min(1).max(60).optional(),
  offset: z.number().int().min(0).optional(),
});

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const client = publicClient();
  const { data, error } = await client
    .from("categories")
    .select("id,name,slug,parent_id,sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as CategoryNode[];
});

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => listSchema.parse(data ?? {}))
  .handler(async ({ data }) => {
    const client = publicClient();
    const limit = data.limit ?? 24;
    const offset = data.offset ?? 0;

    let ids: string[] | null = null;
    if (data.categoryIds?.length) {
      const { data: links, error: linkError } = await client
        .from("product_categories")
        .select("product_id")
        .in("category_id", data.categoryIds);
      if (linkError) throw new Error(linkError.message);
      ids = Array.from(new Set((links ?? []).map((l) => l.product_id)));
      if (ids.length === 0) return { items: [] as ProductSummary[], total: 0 };
    }

    let query = client
      .from("products")
      .select(
        "id,name,slug,description,price,status,created_at,product_images(id,image_url,is_primary,sort_order),product_categories(categories(id,name,slug))",
        { count: "exact" },
      );

    if (ids) query = query.in("id", ids);
    if (data.q) {
      const term = data.q.replace(/[%,]/g, " ");
      query = query.or(`name.ilike.%${term}%,description.ilike.%${term}%`);
    }

    switch (data.sort) {
      case "price_asc":
        query = query.order("price", { ascending: true });
        break;
      case "price_desc":
        query = query.order("price", { ascending: false });
        break;
      case "name":
        query = query.order("name", { ascending: true });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    const { data: rows, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw new Error(error.message);

    const urlMap = await resolveUrls(
      client,
      (rows ?? []).flatMap((r) => (r.product_images ?? []).map((i) => i.image_url)),
    );

    const items: ProductSummary[] = (rows ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description,
      price: Number(r.price),
      status: r.status as ProductStatus,
      created_at: r.created_at,
      images: (r.product_images ?? [])
        .map((i) => ({
          id: i.id,
          url: urlMap[i.image_url] ?? i.image_url,
          is_primary: i.is_primary,
          sort_order: i.sort_order,
        }))
        .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order),
      categories: (r.product_categories ?? [])
        .map((pc) => pc.categories)
        .filter(Boolean)
        .map((c) => ({ id: c!.id, name: c!.name, slug: c!.slug })),
    }));

    return { items, total: count ?? items.length };
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const client = publicClient();
    const { data: row, error } = await client
      .from("products")
      .select(
        "id,name,slug,description,price,status,created_at,product_images(id,image_url,is_primary,sort_order),product_categories(categories(id,name,slug))",
      )
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;

    const urlMap = await resolveUrls(client, (row.product_images ?? []).map((i) => i.image_url));

    const product: ProductSummary = {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      price: Number(row.price),
      status: row.status as ProductStatus,
      created_at: row.created_at,
      images: (row.product_images ?? [])
        .map((i) => ({
          id: i.id,
          url: urlMap[i.image_url] ?? i.image_url,
          is_primary: i.is_primary,
          sort_order: i.sort_order,
        }))
        .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order),
      categories: (row.product_categories ?? [])
        .map((pc) => pc.categories)
        .filter(Boolean)
        .map((c) => ({ id: c!.id, name: c!.name, slug: c!.slug })),
    };
    return product;
  });

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const client = publicClient();
    const { data: row, error } = await client
      .from("categories")
      .select("id,name,slug,parent_id,sort_order")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as CategoryNode | null) ?? null;
  });

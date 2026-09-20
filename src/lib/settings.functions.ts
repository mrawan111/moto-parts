import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type StoreSettings = {
  business_name: string;
  whatsapp_number: string;
  map_url: string;
  facebook_url: string;
  tiktok_url: string;
  instagram_url: string;
};

export const defaultStoreSettings: StoreSettings = {
  business_name: "on 2 wheels",
  whatsapp_number: "201121363214",
  map_url:
    "https://www.google.com/maps/search/on%202%20wheels/@29.96870231628418,31.100282669067383,17z?hl=en",
  facebook_url:
    "https://www.facebook.com/people/Adrenaline-Moto/61561465321780/",
  tiktok_url:
    "https://www.tiktok.com/@meso_727?_r=1&_t=ZS-99fdLvvaeUU",
  instagram_url:
    "https://www.instagram.com/adrenaline__moto_?stkn=MW56eDc1ZDVudnV6cA%3D%3D&utm_source=qr",
};

function makeClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export const getStoreSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const client = makeClient();
    const { data, error } = await client
      .from("store_settings")
      .select(
        "business_name,whatsapp_number,map_url,facebook_url,tiktok_url,instagram_url",
      )
      .eq("id", 1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ?? defaultStoreSettings;
  },
);

export const updateStoreSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => {
    // Basic runtime validation
    const d = data as StoreSettings;
    if (!d || typeof d !== "object") throw new Error("Invalid payload");
    return d as StoreSettings;
  })
  .handler(async ({ data, context }) => {
    const { data: updatedSettings, error } = await context.supabase
      .from("store_settings")
      .update(data)
      .eq("id", 1)
      .select("id")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!updatedSettings) throw new Error("تعذر حفظ الإعدادات. تأكد من صلاحيات المدير.");
    return { ok: true };
  });

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type StoreSettings = { business_name: string; whatsapp_number: string; map_url: string };
export const defaultStoreSettings: StoreSettings = { business_name: "أبو عمر", whatsapp_number: "201274498847", map_url: "https://maps.app.goo.gl/hZVf7MMqG5g5LEMA8" };

export const getStoreSettings = createServerFn({ method: "GET" }).handler(async () => {
  const client = createClient<Database>(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.from("store_settings").select("business_name,whatsapp_number,map_url").eq("id", 1).maybeSingle();
  if (error) throw new Error(error.message);
  return data ?? defaultStoreSettings;
});

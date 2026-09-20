import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const adminExists = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count, error } = await supabaseAdmin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if (error) throw new Error(error.message);
  return { exists: (count ?? 0) > 0 };
});

const schema = z.object({
  email: z.string().trim().email("البريد الإلكتروني غير صحيح").max(255),
  password: z.string().min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف").max(72),
  username: z.string().trim().min(2, "اسم المستخدم قصير جداً").max(60),
});

export const createFirstAdmin = createServerFn({ method: "POST" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) {
      throw new Error("يوجد حساب مدير بالفعل. برجاء تسجيل الدخول.");
    }

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error || !created.user) throw new Error(error?.message ?? "تعذر إنشاء الحساب");

    await supabaseAdmin.from("profiles").insert({ id: created.user.id, username: data.username });
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleError) throw new Error(roleError.message);

    return { ok: true };
  });

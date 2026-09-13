import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  // `location` tells us where the user is navigating TO.
  // We must skip the auth guard when the destination is /admin/login,
  // otherwise the parent beforeLoad redirects to /admin/login which
  // triggers this beforeLoad again → ERR_TOO_MANY_REDIRECTS.
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/login") return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/admin/login" });

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!data) {
      await supabase.auth.signOut();
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

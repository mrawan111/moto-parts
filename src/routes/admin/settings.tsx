import { createFileRoute } from "@tanstack/react-router";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "إعدادات المتجر | on 2 wheels" }] }),
  component: () => (
    <>
      <h1 className="mb-6 text-2xl font-black">إعدادات المتجر</h1>
      <SettingsForm />
    </>
  ),
});

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Store,
  Phone,
  MapPin,
  Link2,
  Camera,
  ExternalLink,
  Save,
  Loader2,
} from "lucide-react";

import { updateStoreSettings, defaultStoreSettings } from "@/lib/settings.functions";
import type { StoreSettings } from "@/lib/settings.functions";
import { useStoreSettings } from "@/hooks/use-store-settings";

// TikTok icon (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.84 4.84 0 0 1-1.01-.07z" />
    </svg>
  );
}

interface Field {
  key: keyof StoreSettings;
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  hint?: string;
}

const FIELDS: Field[] = [
  {
    key: "business_name",
    label: "اسم المتجر",
    icon: Store,
    placeholder: "on 2 wheels",
    hint: "يظهر في الشعار والعنوان",
  },
  {
    key: "whatsapp_number",
    label: "رقم الواتساب / الهاتف",
    icon: Phone,
    placeholder: "201121363214",
    hint: "أدخل الرقم بصيغة دولية بدون + (مثال: 201121363214)",
  },
  {
    key: "map_url",
    label: "رابط Google Maps",
    icon: MapPin,
    type: "url",
    placeholder: "https://maps.google.com/...",
    hint: "رابط موقعك على خريطة جوجل",
  },
  {
    key: "facebook_url",
    label: "رابط Facebook",
    icon: Link2,
    type: "url",
    placeholder: "https://www.facebook.com/...",
  },
  {
    key: "tiktok_url",
    label: "رابط TikTok",
    icon: TikTokIcon,
    type: "url",
    placeholder: "https://www.tiktok.com/@...",
  },
  {
    key: "instagram_url",
    label: "رابط Instagram",
    icon: Camera,
    type: "url",
    placeholder: "https://www.instagram.com/...",
  },
];

export function SettingsForm() {
  const settings = useStoreSettings();
  const queryClient = useQueryClient();
  const doUpdate = useServerFn(updateStoreSettings);

  const [form, setForm] = useState<StoreSettings>(defaultStoreSettings);
  const [saving, setSaving] = useState(false);

  // Sync form when settings load from DB
  useEffect(() => {
    if (settings) {
      setForm({
        business_name: settings.business_name ?? defaultStoreSettings.business_name,
        whatsapp_number: settings.whatsapp_number ?? defaultStoreSettings.whatsapp_number,
        map_url: settings.map_url ?? defaultStoreSettings.map_url,
        facebook_url: settings.facebook_url ?? defaultStoreSettings.facebook_url,
        tiktok_url: settings.tiktok_url ?? defaultStoreSettings.tiktok_url,
        instagram_url: settings.instagram_url ?? defaultStoreSettings.instagram_url,
      });
    }
  }, [settings]);

  const handleChange = (key: keyof StoreSettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await doUpdate({ data: form });
      await queryClient.invalidateQueries({ queryKey: ["store-settings"] });
      toast.success("تم حفظ الإعدادات بنجاح ✓");
    } catch (err) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      toast.error(`فشل الحفظ: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Store info */}
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card">
        <div className="border-b border-border/80 px-6 py-4">
          <h2 className="font-black">معلومات المتجر</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            البيانات الأساسية للمتجر — تظهر في كل صفحات الموقع
          </p>
        </div>
        <div className="divide-y divide-border/60">
          {FIELDS.slice(0, 2).map((field) => (
            <FormField
              key={field.key}
              field={field}
              value={form[field.key]}
              onChange={handleChange}
            />
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card">
        <div className="border-b border-border/80 px-6 py-4">
          <h2 className="font-black">الموقع الجغرافي</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            رابط موقعك على Google Maps
          </p>
        </div>
        <div className="divide-y divide-border/60">
          <FormField
            field={FIELDS[2]}
            value={form.map_url}
            onChange={handleChange}
          />
        </div>
        {form.map_url && (
          <div className="border-t border-border/60 px-6 py-3">
            <a
              href={form.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              معاينة الرابط
            </a>
          </div>
        )}
      </section>

      {/* Social Media */}
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card">
        <div className="border-b border-border/80 px-6 py-4">
          <h2 className="font-black">وسائل التواصل الاجتماعي</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            روابط صفحات المتجر على منصات التواصل
          </p>
        </div>
        <div className="divide-y divide-border/60">
          {FIELDS.slice(3).map((field) => (
            <FormField
              key={field.key}
              field={field}
              value={form[field.key]}
              onChange={handleChange}
            />
          ))}
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
        </button>
      </div>
    </form>
  );
}

function FormField({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (key: keyof StoreSettings, value: string) => void;
}) {
  const Icon = field.icon;
  return (
    <div className="grid gap-3 px-6 py-4 sm:grid-cols-[200px_1fr]">
      <div className="flex items-start gap-2.5 pt-1">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-black">{field.label}</p>
          {field.hint && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {field.hint}
            </p>
          )}
        </div>
      </div>
      <input
        type={field.type ?? "text"}
        value={value}
        onChange={(e) => onChange(field.key, e.target.value)}
        placeholder={field.placeholder}
        className="admin-input"
        dir={field.type === "url" ? "ltr" : undefined}
      />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useStoreSettings } from "@/hooks/use-store-settings";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا | Adrenaline Moto" },
      {
        name: "description",
        content:
          "تواصل مع Adrenaline Moto — قطع غيار موتوسيكلات. هاتف، موقع، فيسبوك، تيك توك، إنستغرام.",
      },
    ],
  }),
  component: ContactPage,
});

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

// Facebook icon (lucide doesn't have a branded Facebook icon)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Instagram icon (lucide has one — we'll use it via lucide but re-export as inline for clarity)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ContactPage() {
  const settings = useStoreSettings();

  // Format the phone number for display (01121363214 style)
  const displayPhone = settings.whatsapp_number.startsWith("20")
    ? `0${settings.whatsapp_number.slice(2)}`
    : settings.whatsapp_number;

  // tel: link — always use international format for tel:
  const telLink = settings.whatsapp_number.startsWith("0")
    ? `+2${settings.whatsapp_number}`
    : `+${settings.whatsapp_number}`;

  const socialLinks = [
    {
      key: "facebook",
      label: "Facebook",
      labelAr: "فيسبوك",
      href: settings.facebook_url,
      icon: FacebookIcon,
      color: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20 hover:bg-[#1877F2]/15",
      iconBg: "bg-[#1877F2]",
    },
    {
      key: "tiktok",
      label: "TikTok",
      labelAr: "تيك توك",
      href: settings.tiktok_url,
      icon: TikTokIcon,
      color: "bg-foreground/8 text-foreground border-border hover:bg-foreground/12",
      iconBg: "bg-foreground",
    },
    {
      key: "instagram",
      label: "Instagram",
      labelAr: "إنستغرام",
      href: settings.instagram_url,
      icon: InstagramIcon,
      color: "bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/20 hover:bg-[#E1306C]/15",
      iconBg: "bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]",
    },
  ];

  return (
    <SiteLayout>
      {/* Hero strip */}
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center md:py-20">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-accent-foreground">
            Adrenaline Moto
          </span>
          <h1 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
            اتصل بنا
          </h1>
          <p className="mt-4 text-base opacity-90">
            نحن هنا للإجابة على استفساراتك وتوفير قطعة الغيار التي تحتاجها
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Phone */}
          <a
            href={`tel:${telLink}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sign-gradient text-primary-foreground shadow-card">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold text-muted-foreground">هاتف / واتساب</p>
              <p className="mt-1 text-xl font-black tracking-wider text-foreground" dir="ltr">
                {displayPhone}
              </p>
              <p className="mt-1 text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition">
                اضغط للاتصال ←
              </p>
            </div>
          </a>

          {/* Google Maps */}
          <a
            href={settings.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sign-gradient text-primary-foreground shadow-card">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold text-muted-foreground">الموقع</p>
              <p className="mt-1 text-lg font-black text-foreground">
                عرض على الخريطة
              </p>
              <p className="mt-1 text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition">
                فتح Google Maps ←
              </p>
            </div>
          </a>
        </div>

        {/* Social media */}
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-black text-muted-foreground">
            تابعنا على وسائل التواصل الاجتماعي
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {socialLinks.map(({ key, label, labelAr, href, icon: Icon, color }) => (
              <a
                key={key}
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 rounded-2xl border px-5 py-4 font-bold transition hover:-translate-y-0.5 hover:shadow-card ${color}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>
                  <span className="block text-sm font-black">{label}</span>
                  <span className="block text-xs opacity-75">{labelAr}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-secondary/50 px-6 py-5 text-center">
          <p className="text-sm text-muted-foreground leading-7">
            يمكنك التواصل معنا عبر الهاتف أو الواتساب يومياً.
            <br />
            نسعى للرد في أسرع وقت ممكن.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

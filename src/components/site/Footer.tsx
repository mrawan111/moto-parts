import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useStoreSettings } from "@/hooks/use-store-settings";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.84 4.84 0 0 1-1.01-.07z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const settings = useStoreSettings();
  const displayNumber = settings.whatsapp_number.startsWith("20")
    ? `0${settings.whatsapp_number.slice(2)}`
    : settings.whatsapp_number;

  const socialLinks = [
    { href: settings.facebook_url, icon: FacebookIcon, label: "Facebook" },
    { href: settings.tiktok_url, icon: TikTokIcon, label: "TikTok" },
    { href: settings.instagram_url, icon: InstagramIcon, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <footer className="mt-16 border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-3 text-sm opacity-80">
            قطع غيار موتوسيكلات أصلية ومضمونة، خدمة سريعة وأسعار مناسبة.
          </p>
          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-ink-foreground opacity-75 transition hover:bg-white/20 hover:opacity-100"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="text-sm">
          <p className="mb-3 font-bold">روابط سريعة</p>
          <ul className="grid gap-2 opacity-85">
            <li>
              <Link to="/" className="hover:opacity-100 hover:underline">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:opacity-100 hover:underline">
                كل المنتجات
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:opacity-100 hover:underline">
                اتصل بنا
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:opacity-100 hover:underline">
                البحث
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-sm">
          <p className="mb-3 font-bold">تواصل معنا</p>
          <a
            href={`https://wa.me/${settings.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-success px-4 py-2 font-bold text-success-foreground"
          >
            واتساب: {displayNumber}
          </a>
          <a
            href={settings.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block font-bold text-accent hover:underline"
          >
            موقعنا على الخريطة ←
          </a>
          <Link
            to="/contact"
            className="mt-3 block font-bold opacity-80 hover:opacity-100 hover:underline"
          >
            صفحة التواصل ←
          </Link>
        </div>
      </div>

      <div className="border-t border-sidebar-border py-4 text-center text-xs opacity-70">
        جميع الحقوق محفوظة © {new Date().getFullYear()} on 2 wheels
      </div>
    </footer>
  );
}

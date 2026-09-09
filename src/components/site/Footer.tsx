import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useStoreSettings } from "@/hooks/use-store-settings";

export function Footer() {
  const settings = useStoreSettings();
  const displayNumber = settings.whatsapp_number.startsWith("20") ? `0${settings.whatsapp_number.slice(2)}` : settings.whatsapp_number;
  return (
    <footer className="mt-16 border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm opacity-80">
            قطع غيار موتوسيكلات أصلية ومضمونة، خدمة سريعة وأسعار مناسبة.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-bold">روابط سريعة</p>
          <ul className="grid gap-2 opacity-85">
            <li>
              <Link to="/">الرئيسية</Link>
            </li>
            <li>
              <Link to="/products">كل المنتجات</Link>
            </li>
            <li>
              <Link to="/search">البحث</Link>
            </li>
          </ul>
        </div>
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
          <a href={settings.map_url} target="_blank" rel="noopener noreferrer" className="mt-3 block font-bold text-accent hover:underline">موقعنا على الخريطة ←</a>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-4 text-center text-xs opacity-70">
        جميع الحقوق محفوظة © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

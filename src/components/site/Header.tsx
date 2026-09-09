import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";

import { Logo } from "./Logo";
import { listCategories } from "@/lib/catalog.functions";
import { useStoreSettings } from "@/hooks/use-store-settings";

export function Header() {
  const settings = useStoreSettings();
  const navigate = useNavigate();
  const fetchCategories = useServerFn(listCategories);
  const [term, setTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 5 * 60 * 1000,
  });

  const parents = categories.filter((c) => !c.parent_id);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = term.trim();
    navigate({ to: "/search", search: q ? { q } : {} });
    setOpenMenu(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="h-1 w-full bg-sign-gradient" />
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <form onSubmit={submitSearch} className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="ابحث عن قطعة غيار..."
            aria-label="البحث عن منتج"
            className="w-full rounded-lg border border-input bg-card py-2.5 pe-10 ps-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </form>

        <nav className="hidden items-center gap-1 text-sm font-bold md:flex">
          <Link to="/" className="rounded-lg px-3 py-2 transition-colors hover:bg-muted">
            الرئيسية
          </Link>
          <Link to="/products" className="rounded-lg px-3 py-2 transition-colors hover:bg-muted">
            كل المنتجات
          </Link>
          <a
            href={`https://wa.me/${settings.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-success px-3 py-2 text-success-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            واتساب
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpenMenu((v) => !v)}
          aria-label="القائمة"
          className="ms-auto grid h-10 w-10 place-items-center rounded-lg border border-input md:hidden"
        >
          {openMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {openMenu && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="ابحث عن قطعة غيار..."
              aria-label="البحث عن منتج"
              className="w-full rounded-lg border border-input bg-background py-3 pe-10 ps-4 text-sm outline-none focus:border-primary"
            />
          </form>
          <div className="mt-4 grid gap-1 text-sm font-bold">
            <Link to="/" onClick={() => setOpenMenu(false)} className="rounded-lg px-3 py-3 hover:bg-muted">
              الرئيسية
            </Link>
            <Link
              to="/products"
              onClick={() => setOpenMenu(false)}
              className="rounded-lg px-3 py-3 hover:bg-muted"
            >
              كل المنتجات
            </Link>
            {parents.map((c) => (
              <Link
                key={c.id}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpenMenu(false)}
                className="rounded-lg px-3 py-3 hover:bg-muted"
              >
                {c.name}
              </Link>
            ))}
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-success px-3 py-3 text-center text-success-foreground"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

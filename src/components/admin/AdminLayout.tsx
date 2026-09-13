import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Boxes,
  ChevronLeft,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  Settings,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";

const NAV_LINKS = [
  { to: "/admin" as const, label: "نظرة عامة", icon: LayoutDashboard, exact: true },
  { to: "/admin/products" as const, label: "المنتجات", icon: Boxes, exact: false },
  { to: "/admin/categories" as const, label: "التصنيفات", icon: FolderTree, exact: false },
  { to: "/admin/settings" as const, label: "الإعدادات", icon: Settings, exact: false },
] as const;

function getPageTitle(pathname: string): string {
  if (pathname === "/admin" || pathname === "/admin/") return "نظرة عامة";
  if (pathname.includes("/admin/products/new")) return "إضافة منتج";
  if (pathname.match(/\/admin\/products\/.+/)) return "تعديل منتج";
  if (pathname.includes("/admin/products")) return "المنتجات";
  if (pathname.includes("/admin/categories/new")) return "إضافة تصنيف";
  if (pathname.match(/\/admin\/categories\/.+/)) return "تعديل تصنيف";
  if (pathname.includes("/admin/categories")) return "التصنيفات";
  if (pathname.includes("/admin/settings")) return "الإعدادات";
  return "لوحة التحكم";
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <aside className="flex h-full w-72 flex-col border-l border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground">
      {/* Logo + admin badge */}
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 px-2"
      >
        <Logo compact />
        <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-black tracking-wide">
          الإدارة
        </span>
      </Link>

      {/* Section label */}
      <div className="mt-9 px-3 text-[11px] font-bold tracking-wider text-sidebar-foreground/45">
        إدارة المتجر
      </div>

      {/* Nav links */}
      <nav className="mt-3 grid gap-1">
        {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => {
          const isActive = exact
            ? location.pathname === to || location.pathname === `${to}/`
            : location.pathname.startsWith(to) && to !== "/admin";
          const activeClass = isActive
            ? "bg-white/12 text-white shadow-sm"
            : "text-sidebar-foreground/70 hover:bg-white/8 hover:text-white";
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${activeClass}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Quick action */}
      <div className="mt-8 border-t border-sidebar-border pt-5">
        <Link
          to="/admin/products/new"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-black text-primary-foreground transition hover:bg-primary/90"
        >
          <PackagePlus className="h-4 w-4" />
          إضافة منتج
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-auto border-t border-sidebar-border pt-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-sidebar-foreground/70 transition hover:bg-white/8 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-foreground md:flex">
      {/* Desktop sidebar */}
      <div className="hidden shrink-0 md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="إغلاق القائمة"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <div className="relative h-full w-72 shadow-2xl">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/90 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground">
                Adrenaline Moto
              </p>
              <h1 className="text-sm font-black">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/categories"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-bold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <FolderTree className="h-4 w-4" />
              <span className="hidden sm:inline">التصنيفات</span>
            </Link>
            <Link
              to="/admin/settings"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-bold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">الإعدادات</span>
            </Link>
            <Link
              to="/"
              className="hidden items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary sm:flex"
            >
              عرض المتجر
              <ChevronLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-7xl p-4 pb-24 md:p-8">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-3 bottom-3 z-40 flex gap-1 overflow-x-auto rounded-2xl border border-border/80 bg-card/95 p-2 shadow-lift backdrop-blur md:hidden">
          {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              className="flex min-w-16 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold text-muted-foreground"
              activeProps={{ className: "bg-primary/10 text-primary" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

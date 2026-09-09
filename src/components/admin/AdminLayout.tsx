import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Boxes, ChevronLeft, FolderTree, LayoutDashboard, LogOut, Menu, PackagePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";

const links = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { to: "/admin/products", label: "المنتجات", icon: Boxes },
  { to: "/admin/categories", label: "التصنيفات", icon: FolderTree },
] as const;

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const logout = async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); };
  return <aside className="flex h-full w-72 flex-col border-l border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground">
    <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2"><Logo /><span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-black tracking-wide">الإدارة</span></Link>
    <div className="mt-9 px-3 text-[11px] font-bold tracking-wider text-sidebar-foreground/45">إدارة المتجر</div>
    <nav className="mt-3 grid gap-1">{links.map(({ to, label, icon: Icon }) => <Link key={to} to={to} onClick={onNavigate} activeOptions={{ exact: to === "/admin" }} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-sidebar-foreground/70 transition hover:bg-white/8 hover:text-white" activeProps={{ className: "bg-white/12 text-white shadow-sm" }}><Icon className="h-4 w-4" />{label}</Link>)}</nav>
    <div className="mt-8 border-t border-sidebar-border pt-5"><Link to="/admin/products/new" onClick={onNavigate} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-black text-primary-foreground transition hover:bg-primary/90"><PackagePlus className="h-4 w-4" />إضافة منتج</Link></div>
    <div className="mt-auto border-t border-sidebar-border pt-4"><button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-sidebar-foreground/70 transition hover:bg-white/8 hover:text-white"><LogOut className="h-4 w-4" />تسجيل الخروج</button></div>
  </aside>;
}

export function AdminLayout() {
  const [open, setOpen] = useState(false); const location = useLocation();
  const title = location.pathname.includes("categories") ? "التصنيفات" : location.pathname.includes("products") ? "المنتجات" : "نظرة عامة";
  return <div className="min-h-screen bg-[#f8f8f7] text-foreground md:flex">
    <div className="hidden shrink-0 md:block"><Sidebar /></div>
    {open && <div className="fixed inset-0 z-50 md:hidden"><button aria-label="إغلاق القائمة" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/35"/><div className="relative h-full w-72 shadow-2xl"><Sidebar onNavigate={() => setOpen(false)} /></div></div>}
    <div className="min-w-0 flex-1"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/90 px-4 backdrop-blur md:px-8"><div className="flex items-center gap-3"><button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg border border-border md:hidden"><Menu className="h-5 w-5" /></button><div><p className="text-[11px] font-bold text-muted-foreground">إدارة المتجر</p><h1 className="text-sm font-black">{title}</h1></div></div><Link to="/" className="hidden items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary sm:flex">عرض المتجر <ChevronLeft className="h-3.5 w-3.5"/></Link></header><main className="mx-auto max-w-7xl p-4 md:p-8"><Outlet /></main></div>
  </div>;
}

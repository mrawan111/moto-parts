import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { listCategories, listProducts } from "@/lib/catalog.functions";
import { ProductCard } from "@/components/catalog/ProductCard";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() { const getCategories=useServerFn(listCategories), getProducts=useServerFn(listProducts); const cats=useQuery({queryKey:["categories"],queryFn:()=>getCategories(),staleTime:300000}); const products=useQuery({queryKey:["featured-products"],queryFn:()=>getProducts({data:{limit:8}}),staleTime:30000}); const parents=(cats.data??[]).filter(c=>!c.parent_id);
 return <SiteLayout><section className="bg-hero-gradient text-primary-foreground"><div className="mx-auto grid max-w-6xl gap-9 px-4 py-16 md:grid-cols-[1.15fr_.85fr] md:py-24"><div><span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-accent-foreground">قطع غيار موتوسيكلات</span><h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">قطع غيار موتوسيكلات<br/>بجودة تثق فيها</h1><p className="mt-5 max-w-xl text-base leading-8 opacity-90">اكتشف مجموعة كبيرة من قطع غيار الموتوسيكلات واطلبها بسهولة عبر واتساب.</p><Link to="/products" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-black text-accent-foreground">تصفح المنتجات <ArrowLeft className="h-5 w-5"/></Link></div><div className="grid place-items-center"><div className="grid h-52 w-52 place-items-center rounded-full border-[14px] border-accent/90 bg-ink/30 shadow-2xl"><Wrench className="h-24 w-24 text-accent"/></div></div></div></section><section className="mx-auto max-w-6xl px-4 py-12"><div className="flex items-end justify-between"><div><p className="text-sm font-bold text-primary">اختَر موتوسيكلك</p><h2 className="text-2xl font-black">التصنيفات</h2></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{parents.map(c=><Link key={c.id} to="/category/$slug" params={{slug:c.slug}} className="rounded-2xl border border-border bg-card p-5 font-black shadow-card transition hover:border-primary hover:text-primary">{c.name}<span className="mt-1 block text-xs font-normal text-muted-foreground">عرض قطع الغيار المتاحة</span></Link>)}</div></section><section className="bg-secondary/60 py-12"><div className="mx-auto max-w-6xl px-4"><div className="flex items-end justify-between"><div><p className="text-sm font-bold text-primary">وصل حديثاً</p><h2 className="text-2xl font-black">أحدث المنتجات</h2></div><Link to="/products" className="text-sm font-bold text-primary">عرض الكل</Link></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.data?.items.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></section></SiteLayout>; }

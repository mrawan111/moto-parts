import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Loader2, Search, X } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/components/site/EmptyState";
import { listCategories, listProducts, type CategoryNode } from "@/lib/catalog.functions";
import { ProductCard } from "./ProductCard";

type Sort = "newest" | "name" | "price_asc" | "price_desc";
export function ProductBrowser({ initialCategory, title, query }: { initialCategory?: CategoryNode; title?: string; query?: string }) {
  const getCategories = useServerFn(listCategories); const getProducts = useServerFn(listProducts);
  const [selected, setSelected] = useState<string[]>(initialCategory ? [initialCategory.id] : []);
  const [sort, setSort] = useState<Sort>("newest"); const [term, setTerm] = useState(query ?? "");
  const categoriesQ = useQuery({ queryKey:["categories"], queryFn:()=>getCategories(), staleTime:300000 });
  const categories = categoriesQ.data ?? [];
  const expanded = Array.from(new Set(selected.flatMap(id => { const cat=categories.find(c=>c.id===id); return cat ? [id, ...categories.filter(c=>c.parent_id===id).map(c=>c.id)] : [id] })));
  const productsQ = useQuery({ queryKey:["products", expanded, sort, term], queryFn:()=>getProducts({ data:{ categoryIds:expanded, sort, q:term || undefined } }), staleTime:30000 });
  const parents = categories.filter(c=>!c.parent_id);
  const toggle=(id:string)=>setSelected(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  return <section className="mx-auto max-w-6xl px-4 py-9">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold text-primary">كتالوج أبو عمر</p><h1 className="text-2xl font-black text-foreground">{title ?? "كل المنتجات"}</h1></div><p className="text-sm text-muted-foreground">{productsQ.data?.total ?? 0} منتج</p></div>
    <div className="mb-6 grid gap-3 rounded-2xl border border-border bg-card p-3 md:grid-cols-[1fr_auto]"><div className="relative"><Search className="absolute end-3 top-3 h-5 w-5 text-muted-foreground"/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="ابحث بالاسم أو الوصف..." className="w-full rounded-xl border border-input bg-background py-2.5 pe-10 ps-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"/></div><select value={sort} onChange={e=>setSort(e.target.value as Sort)} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-bold"><option value="newest">الأحدث</option><option value="name">الاسم</option><option value="price_asc">السعر من الأقل للأعلى</option><option value="price_desc">السعر من الأعلى للأقل</option></select>
      <div className="flex flex-wrap gap-2 md:col-span-2">{parents.map(parent=><div key={parent.id} className="contents"><button onClick={()=>toggle(parent.id)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${selected.includes(parent.id)?"border-primary bg-primary text-primary-foreground":"border-input bg-background"}`}>{parent.name}</button>{categories.filter(c=>c.parent_id===parent.id).map(child=><button key={child.id} onClick={()=>toggle(child.id)} className={`rounded-full border px-3 py-1.5 text-xs ${selected.includes(child.id)?"border-primary bg-primary text-primary-foreground":"border-input bg-background"}`}>{child.name}</button>)}</div>)}{selected.length>0&&<button onClick={()=>setSelected([])} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-primary"><X className="h-3 w-3"/>مسح الفلاتر</button>}</div>
    </div>
    {productsQ.isLoading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div> : productsQ.isError ? <EmptyState title="تعذر تحميل المنتجات" hint="برجاء المحاولة مرة أخرى."/> : productsQ.data?.items.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{productsQ.data.items.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <EmptyState title={term ? "لم يتم العثور على منتجات مطابقة للبحث" : "لا توجد منتجات في هذا القسم"} hint="جرّب تغيير البحث أو الفلاتر."/>}
    {initialCategory && <Link to="/products" className="mt-8 inline-block text-sm font-bold text-primary">عرض كل المنتجات ←</Link>}
  </section>;
}

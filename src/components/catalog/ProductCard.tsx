import { Link } from "@tanstack/react-router";
import { MessageCircle, Package } from "lucide-react";
import type { ProductSummary } from "@/lib/catalog.functions";
import { formatPrice, productUrl, whatsappOrderUrl } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: ProductSummary }) {
  const soldOut = product.status === "SOLD_OUT";
  const image = product.images[0]?.url;
  return <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift">
    <Link to="/products/$slug" params={{ slug: product.slug }} className="relative block aspect-[4/3] overflow-hidden bg-muted">
      {image ? <img src={image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /> : <Package className="absolute inset-0 m-auto h-12 w-12 text-muted-foreground" />}
      {soldOut && <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">نفد</span>}
    </Link>
    <div className="p-4">
      <div className="flex flex-wrap gap-1">{product.categories.slice(0, 2).map(c => <span key={c.id} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-secondary-foreground">{c.name}</span>)}</div>
      <Link to="/products/$slug" params={{ slug: product.slug }} className="mt-2 block text-base font-black text-foreground hover:text-primary">{product.name}</Link>
      <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground">{product.description || "قطع غيار بجودة موثوقة."}</p>
      <div className="mt-4 flex items-center justify-between gap-2"><span className="font-black text-primary">{formatPrice(product.price)}</span>
        {soldOut ? <span className="rounded-lg bg-muted px-3 py-2 text-xs font-bold text-muted-foreground">غير متوفر</span> : <a href={whatsappOrderUrl({ name: product.name, price: product.price, url: productUrl(product.slug) })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-success px-3 py-2 text-xs font-bold text-success-foreground"><MessageCircle className="h-4 w-4" />اطلب عبر واتساب</a>}
      </div>
    </div>
  </article>;
}

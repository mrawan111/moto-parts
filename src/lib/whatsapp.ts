export const WHATSAPP_NUMBER = "201274498847";
export const WHATSAPP_DISPLAY = "01274498847";

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 }).format(price)} جنيه`;
}

export function whatsappOrderUrl(opts: { name: string; price: number; url?: string; number?: string }) {
  const lines = [
    "السلام عليكم،",
    "أريد الاستفسار عن المنتج التالي:",
    `اسم المنتج: ${opts.name}`,
    `السعر: ${formatPrice(opts.price)}`,
  ];
  if (opts.url) {
    lines.push("رابط المنتج:", opts.url);
  }
  return `https://wa.me/${opts.number ?? WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function productUrl(slug: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/products/${encodeURIComponent(slug)}`;
}

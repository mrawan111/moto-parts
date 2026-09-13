import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/admin/products/$id")({
  head: () => ({ meta: [{ title: "تعديل المنتج | إدارة أبو عمر" }] }),
  component: Edit,
});

function Edit() {
  const { id } = Route.useParams();
  const q = useQuery({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,description,price,status,slug,product_categories(category_id),product_images(id,image_url,is_primary,sort_order)"
        )
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });
  return (
    <>
      <h1 className="mb-6 text-2xl font-black">تعديل منتج</h1>
      {q.data ? <ProductForm product={q.data} /> : <p>جاري التحميل...</p>}
    </>
  );
}

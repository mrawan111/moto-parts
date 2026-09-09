import { createFileRoute } from "@tanstack/react-router"; import { SiteLayout } from "@/components/site/SiteLayout"; import { ProductBrowser } from "@/components/catalog/ProductBrowser";
export const Route=createFileRoute("/products/")({component:()=> <SiteLayout><ProductBrowser/></SiteLayout>});

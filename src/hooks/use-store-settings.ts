import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { defaultStoreSettings, getStoreSettings } from "@/lib/settings.functions";

export function useStoreSettings() {
  const fetchSettings = useServerFn(getStoreSettings);
  const query = useQuery({ queryKey: ["store-settings"], queryFn: () => fetchSettings(), staleTime: 5 * 60 * 1000 });
  return query.data ?? defaultStoreSettings;
}

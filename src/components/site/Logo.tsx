import { useStoreSettings } from "@/hooks/use-store-settings";

export function Logo({ compact = false }: { compact?: boolean }) {
  const settings = useStoreSettings();
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sign-gradient text-lg font-black text-primary-foreground shadow-card">
        ع
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-base font-black text-foreground">{settings.business_name}</span>
          <span className="block text-[11px] font-bold text-muted-foreground">
            قطع غيار موتوسيكلات
          </span>
        </span>
      )}
    </span>
  );
}

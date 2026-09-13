import logoUrl from "@/assets/adrenaline-moto-logo.png?url";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <img
        src={logoUrl}
        alt="Adrenaline Moto"
        className={
          compact
            ? "h-8 w-auto object-contain"
            : "h-12 w-auto max-w-[160px] object-contain"
        }
        draggable={false}
      />
    </span>
  );
}

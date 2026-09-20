import logoUrl from "@/assets/logo.png?url";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <img
        src={logoUrl}
        alt="on 2 wheels"
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

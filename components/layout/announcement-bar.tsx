interface AnnouncementBarProps {
  label: string;
  message: string;
  secondary: string;
  isRtl?: boolean;
}

export function AnnouncementBar({
  label,
  message,
  secondary,
  isRtl = false,
}: AnnouncementBarProps) {
  return (
    <div className="border-b border-white/8 bg-black/70">
      <div
        className={`section-frame flex min-h-10 flex-col justify-center gap-1 py-2 text-center text-[0.72rem] uppercase tracking-[0.26em] text-white/55 sm:flex-row sm:items-center sm:justify-between ${isRtl ? "sm:text-right" : "sm:text-left"}`}
      >
        <span>{label}</span>
        <span className="hidden h-3 w-px bg-white/12 sm:block" />
        <span>{message}</span>
        <span className="hidden h-3 w-px bg-white/12 lg:block" />
        <span className="hidden lg:inline">{secondary}</span>
      </div>
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="border-b border-white/8 bg-black/70">
      <div className="section-frame flex min-h-10 flex-col justify-center gap-1 py-2 text-center text-[0.72rem] uppercase tracking-[0.26em] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <span>Ramadan Atelier preview now live</span>
        <span className="hidden h-3 w-px bg-white/12 sm:block" />
        <span>Complimentary global delivery on launch orders</span>
      </div>
    </div>
  );
}

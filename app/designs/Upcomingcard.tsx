export default function UpcomingCard() {
  return (
    <div className="relative bg-[#1C2536] text-[#FAF9F4] rounded-2xl px-6 py-5 flex flex-col justify-center gap-1.5 overflow-hidden">
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#E2A340]/15" />

      <span className="font-mono text-[11px] uppercase tracking-wide text-[#E2A340]">
        Next up · in 2 days
      </span>
      <h3 className="font-serif font-semibold text-xl">
        Notion — Interview
      </h3>
      <p className="text-sm text-[#B9C0D0]">
        Thursday, Sep 4 · 10:00 AM · Product Engineer role
      </p>
    </div>
  );
}


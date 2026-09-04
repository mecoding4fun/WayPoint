export default function FloatingCard({
  company,
  role,
  tagText,
  tagColorClass,
  positionClass,
}: {
  company: string;
  role: string;
  tagText: string;
  tagColorClass: string;
  positionClass: string;
}) {
  return (
    <div className={`absolute w-64 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-lg ${positionClass}`}>
      <p className="font-semibold text-sm text-[#1E2430]">{company}</p>
      <p className="text-sm text-gray-500 mb-3">{role}</p>
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full ${tagColorClass}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {tagText}
      </span>
    </div>
  );
}


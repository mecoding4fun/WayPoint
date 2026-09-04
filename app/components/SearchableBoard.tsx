// app/components/SearchableBoard.tsx
"use client";

import { useState } from "react";
import ApplicationCardButton from "./ApplicationCardButton";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  jobUrl: string | null;
  notes: string | null;
  interviewDate: Date | null;
  appliedDate: Date;
};

const STATUS_CONFIG: Record<string, { dot: string; tag: string }> = {
  Applied: { dot: "bg-[#4A5C7A]", tag: "bg-[#4A5C7A]/10 text-[#4A5C7A]" },
  Interview: { dot: "bg-[#E2A340]", tag: "bg-[#E2A340]/15 text-[#C9862A]" },
  Offer: { dot: "bg-[#6B9080]", tag: "bg-[#6B9080]/15 text-[#4C6B5D]" },
  Closed: { dot: "bg-[#C97064]", tag: "bg-[#C97064]/15 text-[#A85A4E]" },
};

export default function SearchableBoard({ applications }: { applications: Application[] }) {
  const [query, setQuery] = useState("");

  const filtered = applications.filter(
    (a) =>
      a.company.toLowerCase().includes(query.toLowerCase()) ||
      a.role.toLowerCase().includes(query.toLowerCase())
  );

  const columns = ["Applied", "Interview", "Offer", "Closed"] as const;

  return (
    <div>
      <div className="hidden md:flex items-center gap-2 bg-[#FAF9F4] border border-[#E4E0D6] rounded-lg px-3.5 py-2 text-sm text-[#4A5C7A] w-[280px] mb-6">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search applications…"
          className="bg-transparent outline-none w-full placeholder:text-[#4A5C7A]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((status) => {
          const apps = filtered.filter((a) => a.status === status);
          const config = STATUS_CONFIG[status];
          return (
            <div key={status}>
              <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  {status}
                </div>
                <span className="font-mono text-xs text-[#4A5C7A] bg-white border border-[#E4E0D6] rounded-full px-2.5 py-0.5">
                  {apps.length}
                </span>
              </div>
              <div className="bg-[#F1EEE4] rounded-xl p-2.5 min-h-[420px] flex flex-col gap-2.5">
                {apps.map((app) => (
                  <ApplicationCardButton
                    key={app.id}
                    app={app}
                    date={
                      app.status === "Interview" && app.interviewDate
                        ? new Date(app.interviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : new Date(app.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                    location="—"
                    tagClass={config.tag}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
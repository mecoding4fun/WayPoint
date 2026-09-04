// app/components/ApplicationCardButton.tsx
"use client";

import { useState } from "react";
import ViewApplicationModal from "./ViewApplicationModal";

type Application = {
  id: string;
  company: string;
  role: string;
  jobUrl: string | null;
  status: string;
  notes: string | null;
  interviewDate: Date | null;
  appliedDate: Date;
};

export default function ApplicationCardButton({
  app,
  date,
  location,
  tagClass,
}: {
  app: Application;
  date: string;
  location: string;
  tagClass: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white border border-[#E4E0D6] rounded-lg px-4 py-3.5 cursor-pointer hover:shadow-md hover:-translate-y-px transition"
      >
        <p className="font-semibold text-sm text-[#1C2536] mb-0.5">{app.company}</p>
        <p className="text-sm text-[#4A5C7A] mb-3">{app.role}</p>
        <div className="flex items-center justify-between font-mono text-xs text-[#4A5C7A]">
          <span className={`px-2 py-0.5 rounded-full ${tagClass}`}>{date}</span>
          <span>{location}</span>
        </div>
      </div>

      {isOpen && <ViewApplicationModal application={app} onClose={() => setIsOpen(false)} />}
    </>
  );
}
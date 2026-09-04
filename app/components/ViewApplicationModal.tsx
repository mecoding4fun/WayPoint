// app/components/ViewApplicationModal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default function ViewApplicationModal({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"view" | "edit">("view");

  const [company, setCompany] = useState(application.company);
  const [role, setRole] = useState(application.role);
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.notes ?? "");
  const [interviewDate, setInterviewDate] = useState(
    application.interviewDate
      ? new Date(application.interviewDate).toISOString().slice(0, 16)
      : ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company, role, status, notes,
          interviewDate: status === "Interview" ? interviewDate : null,
        }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this application? This can't be undone.")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/applications/${application.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
      onClose();
    } catch {
      setError("Something went wrong deleting this application.");
      setIsDeleting(false);
    }
  }

  const STATUS_TAG: Record<string, string> = {
    Applied: "bg-[#4A5C7A]/10 text-[#4A5C7A]",
    Interview: "bg-[#E2A340]/15 text-[#C9862A]",
    Offer: "bg-[#6B9080]/15 text-[#4C6B5D]",
    Closed: "bg-[#C97064]/15 text-[#A85A4E]",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg p-8" onClick={(e) => e.stopPropagation()}>

        {mode === "view" ? (
          <>
            {/* ---------- VIEW MODE ---------- */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display font-semibold text-2xl text-[#1C2536]">{application.company}</h2>
                <p className="text-[#4A5C7A] text-sm mt-1">{application.role}</p>
              </div>
              <button onClick={onClose} className="text-[#4A5C7A] hover:text-[#1C2536] text-lg">✕</button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className={`font-mono text-xs px-2.5 py-1 rounded-full ${STATUS_TAG[application.status]}`}>
                {application.status}
              </span>
              <span className="text-xs text-[#4A5C7A] font-mono">
                Applied {application.appliedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            {application.status === "Interview" && application.interviewDate && (
              <div className="bg-[#FAF9F4] border border-[#E4E0D6] rounded-lg px-4 py-3 mb-5">
                <p className="text-xs font-mono uppercase tracking-wide text-[#C9862A] mb-1">Interview scheduled</p>
                <p className="text-sm text-[#1C2536] font-medium">
                  {new Date(application.interviewDate).toLocaleString("en-US", {
                    weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit",
                  })}
                </p>
              </div>
            )}

            <div className="mb-7">
              <p className="text-xs font-mono uppercase tracking-wide text-[#4A5C7A] mb-2">Notes</p>
              <p className="text-sm text-[#1C2536] leading-relaxed">
                {application.notes || <span className="text-[#4A5C7A] italic">No notes added yet.</span>}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 border border-[#C97064] text-[#C97064] font-semibold text-sm py-3 rounded-lg hover:bg-[#C97064]/5 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setMode("edit")}
                className="flex-1 bg-[#1C2536] hover:bg-[#2B3650] text-white font-semibold text-sm py-3 rounded-lg transition-colors"
              >
                Edit
              </button>
            </div>

            {error && <p className="text-sm text-[#C97064] mt-3">{error}</p>}
          </>
        ) : (
          <>
            {/* ---------- EDIT MODE ---------- */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-xl text-[#1C2536]">Edit application</h2>
              <button onClick={() => setMode("view")} className="text-[#4A5C7A] hover:text-[#1C2536] text-sm">
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1C2536] mb-1.5">Company</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required
                  className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C2536] mb-1.5">Role</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required
                  className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C2536] mb-1.5">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]">
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {status === "Interview" && (
                <div>
                  <label className="block text-sm font-medium text-[#1C2536] mb-1.5">Interview date & time</label>
                  <input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} required
                    className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1C2536] mb-1.5">Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                  className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]" />
              </div>

              {error && <p className="text-sm text-[#C97064]">{error}</p>}

              <button type="submit" disabled={isSaving}
                className="bg-[#1C2536] hover:bg-[#2B3650] text-white font-semibold text-sm py-3 rounded-lg transition-colors disabled:opacity-50 mt-2">
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
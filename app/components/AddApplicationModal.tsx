// app/components/AddApplicationModal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddApplicationModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [interviewDate, setInterviewDate] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, status, notes, interviewDate: status === "Interview" ? interviewDate : null }),
      });

      if (!res.ok) {
        throw new Error("Failed to save application");
      }

      router.refresh(); // re-fetches the Server Component's data
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-xl text-[#1C2536]">
            Add application
          </h2>
          <button onClick={onClose} className="text-[#4A5C7A] hover:text-[#1C2536]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C2536] mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]"
              placeholder="e.g. Notion"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2536] mb-1.5">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]"
              placeholder="e.g. Product Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2536] mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Closed">Closed</option>
            </select>
            
          </div>
          {status === "Interview" && (
            <div>
              <label className="block text-sm font-medium text-[#1C2536] mb-1.5">
                Interview date & time
              </label>
              <input
                type="datetime-local"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#1C2536] mb-1.5">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 border border-[#E4E0D6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A340]"
              placeholder="Recruiter name, salary range, prep notes…"
            />
          </div>

          {error && <p className="text-sm text-[#C97064]">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1C2536] hover:bg-[#2B3650] text-white font-semibold text-sm py-3 rounded-lg transition-colors disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "Saving..." : "Add application"}
          </button>
        </form>
      </div>
    </div>
  );
}
// app/components/ResetDataButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetDataButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleReset() {
    if (!confirm("Delete all your applications? This can't be undone.")) return;
    setIsLoading(true);
    const res = await fetch("/api/user/reset-data", { method: "DELETE" });
    if (res.ok) router.refresh();
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleReset}
      disabled={isLoading}
      className="border border-[#E4E0D6] text-[#1C2536] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#FAF9F4] transition-colors disabled:opacity-50 whitespace-nowrap"
    >
      {isLoading ? "Resetting..." : "Reset data"}
    </button>
  );
}
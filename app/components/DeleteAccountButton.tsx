// app/components/DeleteAccountButton.tsx
"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function DeleteAccountButton() {
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Permanently delete your account and all data? This can't be undone.")) return;
    setIsLoading(true);
    const res = await fetch("/api/user/delete-account", { method: "DELETE" });
    if (res.ok) {
      await signOut({ redirectUrl: "/" });
    }
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="border border-[#C97064] text-[#C97064] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#C97064]/5 transition-colors disabled:opacity-50 whitespace-nowrap"
    >
      {isLoading ? "Deleting..." : "Delete account"}
    </button>
  );
}
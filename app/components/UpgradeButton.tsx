// app/components/UpgradeButton.tsx
"use client";

import { useState } from "react";

export default function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpgrade() {
    setIsLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // redirect to Stripe's hosted checkout
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={isLoading}
      className="bg-[#1C2536] hover:bg-[#2B3650] text-white font-semibold px-6 py-3.5 rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoading ? "Redirecting..." : "Upgrade to Pro"}
    </button>
  );
}
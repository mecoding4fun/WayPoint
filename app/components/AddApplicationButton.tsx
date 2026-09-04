// app/components/AddApplicationButton.tsx
"use client";

import { useState } from "react";
import AddApplicationModal from "./AddApplicationModal";

export default function AddApplicationButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#1C2536] hover:bg-[#2B3650] text-white px-[18px] py-[11px] rounded-lg text-sm font-semibold transition-colors"
      >
        <span>+</span> Add application
      </button>

      {isOpen && <AddApplicationModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
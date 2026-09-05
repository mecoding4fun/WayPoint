"use client";

import { useState } from "react";
import Link from "next/link";
import LogoMark from "../designs/Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-300 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-bold text-lg font-serif text-[#4e5b77]">
            Waypoint
          </span>
        </div>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-10 text-[#4e5b77]">
          <Link href="#features" className="hover:text-[#1E2430] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-[#1E2430] transition-colors">
            Pricing
          </Link>
        </div>

        {/* Desktop auth buttons — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 text-[#4e5b77]">
          <Link href="/sign-in" className="hover:text-[#1E2430] transition-colors">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="bg-black text-white rounded px-4 py-2.5 hover:bg-[#2B3650] transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger button — only visible on mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-[#4e5b77]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 flex flex-col gap-4 bg-white">
          <Link
            href="#features"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#4e5b77] hover:text-[#1E2430] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#4e5b77] hover:text-[#1E2430] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/sign-in"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#4e5b77] hover:text-[#1E2430] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            onClick={() => setIsMenuOpen(false)}
            className="bg-black text-white rounded px-4 py-2.5 text-center hover:bg-[#2B3650] transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
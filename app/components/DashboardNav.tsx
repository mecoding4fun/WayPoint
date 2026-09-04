import LogoMark from "../designs/Logo";
import Link from "next/link";
import UserMenu from "./UserMenu";


export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E4E0D6]">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

        <div>
          <Link href={"/"} className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display font-semibold text-xl text-[#1C2536]">
              Waypoint
            </span>
          </Link>
        </div>

       

        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-lg border border-[#E4E0D6] flex items-center justify-center text-[#4A5C7A] hover:bg-[#FAF9F4] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
        <UserMenu/>
        </div>

      </div>
    </header>
  );
}
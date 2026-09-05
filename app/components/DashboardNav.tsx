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
        <UserMenu/>
        </div>

      </div>
    </header>
  );
}
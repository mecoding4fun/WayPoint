import Link from "next/link";
import LogoMark from "../designs/Logo";

export default function Navbar(){
    return(
        <nav className="flex items-center border-b border-gray-300 rounded justify-between">
            <div className="p-4  flex items-center max-w-6xl ml-35 mb:ml-10">
                <div>
                    <LogoMark/>
                </div>
                <div className="px-3 py-1.5 text-[#4e5b77]">
                    <span className="font-bold text-lg font-serif">Waypoint</span>
                </div>
            </div>
            <div className="p-4 text-[#4e5b77] flex items-center justify-between space-x-10">
                <Link href="#features" className="hover:text-[#1E2430] transition-colors">
                    Features
                </Link>
                <Link href="#pricing" className="hover:text-[#1E2430] transition-colors">
                    Pricing
                </Link>
            </div>
            <div className="p-4 text-[#4e5b77] flex items-center justify-between space-x-6 max-w mr-35">
                <Link href="/sign-in">
                    Sign in
                </Link>
               <div className="bg-black rounded p-3">
                    <Link className="text-white m-3" href="/sign-up">
                        Get Started
                    </Link>
               </div>
                
            </div>
        </nav>
    )
}
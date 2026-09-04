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
                <a href="#features">
                    Feature
                </a>
                <a href="#products">
                    Product
                </a>
                <a href="#pricing">
                    Pricing
                </a>
            </div>
            <div className="p-4 text-[#4e5b77] flex items-center justify-between space-x-6 max-w mr-35">
                <a href="sign-in">
                    Sign in
                </a>
               <div className="bg-black rounded p-3">
                    <a className="text-white m-3" href="sign-up">
                        Get Started
                    </a>
               </div>
                
            </div>
        </nav>
    )
}
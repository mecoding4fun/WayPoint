 import FloatingCard from "../designs/Floatingcard";
    
    export default function Hero() {
        return (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center px-4 sm:px-6 lg:px-8 mt-16 lg:mt-30">          
                
                <div className="grid rounded items-center gap-y-6 sm:gap-y-7 lg:ml-10">
                    <div className="flex items-center gap-3">
                        <span className="w-7 sm:w-9 h-[1.5px] bg-[#C58B39]" aria-hidden="true" />
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.05em] text-[#C58B39]">
                            FOR PEOPLE JOB HUNTING RIGHT NOW
                        </span>
                    </div>
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#1E2430]">
                            Every application,<br/> on <span className="text-[#C58B39] font-family:var(--font-display) italic font-normal">one</span> honest map.
                        </h1>
                    </div>
                    <div>
                        <p className="font-serif text-[#14213D] text-lg sm:text-xl max-w-xl">
                            Waypoint turns your scattered job search — tabs, spreadsheets, half-remembered follow-ups — into one visible pipeline you can actually trust.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pt-2">
                        <a href="#register" className="bg-[#14213D] hover:bg-[#2B3448] text-white font-medium text-base px-6 py-3.5 rounded-lg transition-colors shadow-sm text-center">
                            Start Tracking ⸺
                        </a>
                        <a href="#demo" className="inline-flex items-center justify-center gap-1.5 text-[#14213D] font-semibold text-base hover:opacity-80 transition-opacity">
                            See how it works →
                        </a>
                    </div>
                    <div className="text-sm text-[#14213D] max-w-md pt-2 opacity-80">
                        <span>Every application sits somewhere on this line. No more wondering where things stand.</span>
                    </div>
                </div>
                
                {/* Right Side: Floating Cards */}
                <div className="relative h-[400px] sm:h-[440px] w-full max-w-[400px] mx-auto lg:max-w-none mt-10 lg:mt-0">
                     <FloatingCard
                        company="Linear"
                        role="Senior Frontend Engineer"
                        tagText="Applied · Aug 12"
                        tagColorClass="bg-gray-100 text-gray-600"
                        positionClass="top-0 left-2 sm:left-10 -rotate-3"
                    />
                    <FloatingCard
                        company="Notion"
                        role="Product Engineer"
                        tagText="Interview · Aug 22"
                        tagColorClass="bg-amber-50 text-amber-700"
                        positionClass="top-28 sm:top-32 left-12 sm:left-40 rotate-2 z-10"
                    />
                    <FloatingCard
                        company="Vercel"
                        role="Full Stack Engineer"
                        tagText="Offer · Aug 27"
                        tagColorClass="bg-emerald-50 text-emerald-700"
                        positionClass="top-56 sm:top-64 left-0 sm:left-5 -rotate-1"
                    />
                </div>

            </div>
        );
    }
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.05em] text-gray-500 mb-3">
            Why it's different
          </p>
          <h2 className="text-3xl font-serif font-semibold text-[#1E2430] leading-tight">
            Built for the anxious middle of a job search, not the highlight reel.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-9">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-amber-50">
              <span className="text-[#C58B39] text-lg">◧</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E2430]">One pipeline, not five tabs</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every application lives on the same rail — applied, interviewing, offer, or closed.
              No more digging through email to remember where things stand.
            </p>
          </div>

          <div className="bg-white p-9">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-emerald-50">
              <span className="text-emerald-700 text-lg">◔</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E2430]">Follow-ups that don't slip</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Set a reminder the moment you apply. Waypoint nudges you before a lead goes cold,
              so momentum doesn't depend on memory.
            </p>
          </div>

          <div className="bg-white p-9">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-slate-50">
              <span className="text-slate-600 text-lg">☰</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E2430]">Notes stay with the role</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Interview prep, recruiter names, salary notes — attached to the application itself,
              not scattered across sticky notes and old emails.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.05em] text-gray-500 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl font-serif font-semibold text-[#1E2430] leading-tight">
            Free while you're getting started.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div className="border border-gray-200 rounded-2xl p-9 bg-white">
            <h3 className="font-serif text-xl font-semibold mb-1 text-[#1E2430]">Free</h3>
            <div className="font-serif text-4xl font-semibold my-5 text-[#1E2430]">
              $0<span className="text-base font-sans font-normal text-gray-500">/month</span>
            </div>
            <ul className="mb-7 space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-[#1E2430] pb-3 border-b border-gray-100">
                <span className="text-emerald-600">✓</span>Unlimited applications
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#1E2430] pb-3 border-b border-gray-100">
                <span className="text-emerald-600">✓</span>Kanban pipeline view
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#1E2430] pb-3 border-b border-gray-100">
                <span className="text-emerald-600">✓</span>Notes on every application
              </li>
            </ul>
            <a href="/sign-up" className="block text-center border border-gray-300 rounded-lg py-3 font-medium text-sm text-[#1E2430] hover:bg-gray-50 transition-colors">
              Get started
            </a>
          </div>

          <div className="rounded-2xl p-9 bg-[#1E2430] text-white relative">
            <span className="absolute top-9 right-9 text-xs font-mono uppercase tracking-wide text-[#E8B563]">
              Optional
            </span>
            <h3 className="font-serif text-xl font-semibold mb-1">Pro</h3>
            <div className="font-serif text-4xl font-semibold my-5">
              $6<span className="text-base font-sans font-normal text-gray-400">/month</span>
            </div>
            <ul className="mb-7 space-y-3">
              <li className="flex items-center gap-2.5 text-sm pb-3 border-b border-white/10">
                <span className="text-[#E8B563]">✓</span>Follow-up email reminders
              </li>
              <li className="flex items-center gap-2.5 text-sm pb-3 border-b border-white/10">
                <span className="text-[#E8B563]">✓</span>Export to CSV / resume summary
              </li>
              <li className="flex items-center gap-2.5 text-sm pb-3 border-b border-white/10">
                <span className="text-[#E8B563]">✓</span>Shareable search page
              </li>
            </ul>
            <a href="/dashboard/upgrade" className="block text-center rounded-lg py-3 font-medium text-sm bg-[#E8B563] text-[#1E2430] hover:opacity-90 transition-opacity">
              See Pro plans
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">Built as a learning project — not a real product.</p>
          <div className="flex gap-7 text-sm text-gray-500">
            <a href="#" className="hover:text-[#1E2430]">GitHub</a>
            <a href="#" className="hover:text-[#1E2430]">Features</a>
            <a href="#" className="hover:text-[#1E2430]">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
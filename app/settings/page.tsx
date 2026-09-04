import Link from "next/link";
import DashboardNavbar from "../components/DashboardNav";
import ResetDataButton from "../components/ResetDataButton";
import DeleteAccountButton from "../components/DeleteAccountButton";

export default function SettingsPage() {
  return (
    <div>
      <DashboardNavbar />
      <main className="max-w-2xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-[#4A5C7A] mb-2">
            Preferences
          </p>
          <h1 className="font-display font-semibold text-3xl text-[#1C2536]">
            Settings
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <section className="bg-white border border-[#E4E0D6] rounded-xl px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#1C2536] mb-1">Waypoint Pro</h3>
              <p className="text-sm text-[#4A5C7A]">Follow-up reminders, CSV export, and more.</p>
            </div>
            <Link
              href="/dashboard/upgrade"
              className="bg-[#1C2536] hover:bg-[#2B3650] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              See Pro plans
            </Link>
          </section>

          <section className="bg-white border border-[#E4E0D6] rounded-xl px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#1C2536] mb-1">Reset your data</h3>
              <p className="text-sm text-[#4A5C7A]">Delete all your tracked applications. Your account stays active.</p>
            </div>
            <ResetDataButton />
          </section>

          <section className="bg-white border border-[#C97064]/30 rounded-xl px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#C97064] mb-1">Delete account</h3>
              <p className="text-sm text-[#4A5C7A]">Permanently delete your account and all your data.</p>
            </div>
            <DeleteAccountButton />
          </section>
        </div>
      </main>
    </div>
  );
}
// app/dashboard/upgrade/page.tsx
import DashboardNavbar from "../../components/DashboardNav";
import UpgradeButton from "../../components/UpgradeButton";

export default function UpgradePage() {
  return (
    <div>
      <DashboardNavbar />
      <main className="max-w-xl mx-auto px-6 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-[#4A5C7A] mb-2">
          Waypoint Pro
        </p>
        <h1 className="font-display font-semibold text-3xl text-[#1C2536] mb-4">
          A little extra, if you want it.
        </h1>
        <p className="text-[#4A5C7A] mb-10">
          Follow-up email reminders and CSV export — for $6/month.
        </p>
        <UpgradeButton />
      </main>
    </div>
  );
}
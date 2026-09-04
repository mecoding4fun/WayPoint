import { currentUser, auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import DashboardNavbar from "../components/DashboardNav";
import AddApplicationButton from "../components/AddApplicationButton";
import ApplicationCardButton from "../components/ApplicationCardButton";
import SearchableBoard from "../components/SearchableBoard";  


function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function StatCard({ label, value, delta, colorClass = "text-[#1C2536]" }: {
  label: string; value: string; delta: string; colorClass?: string;
}) {
  return (
    <div className="bg-white border border-[#E4E0D6] rounded-xl px-5 py-5">
      <p className="text-sm text-[#4A5C7A] mb-2.5">{label}</p>
      <p className={`font-mono text-3xl font-medium ${colorClass}`}>{value}</p>
      <p className="text-xs text-[#4A5C7A] mt-1">{delta}</p>
    </div>
  );
}

function Rail({ stops }: { stops: { label: string; state?: "done" | "active" | "offer" }[] }) {
  const dotColor = {
    done: "bg-[#4A5C7A] border-[#4A5C7A]",
    active: "bg-[#E2A340] border-[#C9862A] shadow-[0_0_0_4px_rgba(226,163,64,0.18)]",
    offer: "bg-[#6B9080] border-[#6B9080]",
  };
  return (
    <div className="relative flex items-center">
      <div className="absolute top-[6px] left-[6px] right-[6px] h-[2px] bg-[#D4CFC0] z-0" />
      {stops.map((s, i) => (
        <div key={i} className="relative z-10 flex-1 flex flex-col items-center gap-2.5">
          <div className={`w-[13px] h-[13px] rounded-full border-2 bg-white ${s.state ? dotColor[s.state] : "border-[#D4CFC0]"}`} />
          <span className="font-mono text-xs text-[#4A5C7A]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const STATUS_CONFIG = {
  Applied: { dot: "bg-[#4A5C7A]", tag: "bg-[#4A5C7A]/10 text-[#4A5C7A]" },
  Interview: { dot: "bg-[#E2A340]", tag: "bg-[#E2A340]/15 text-[#C9862A]" },
  Offer: { dot: "bg-[#6B9080]", tag: "bg-[#6B9080]/15 text-[#4C6B5D]" },
  Closed: { dot: "bg-[#C97064]", tag: "bg-[#C97064]/15 text-[#A85A4E]" },
};

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const firstName = user?.firstName ?? "there";
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
  const isPro = user?.publicMetadata?.plan === "pro";
  

  const applications = await prisma.application.findMany({
    where: { userId: userId! },
    orderBy: { createdAt: "desc" },
  });
  const respondedCount = applications.filter((a) => a.status !== "Applied").length;
  const responseRate = applications.length > 0
    ? Math.round((respondedCount / applications.length) * 100)
    : 0;
  const upcomingInterview = applications
    .filter((a) => a.status === "Interview" && a.interviewDate)
    .sort((a, b) => a.interviewDate!.getTime() - b.interviewDate!.getTime())[0];

  const columns = ["Applied", "Interview", "Offer", "Closed"] as const;

  return (
    <div>
      <DashboardNavbar />

      <main className="max-w-6xl mx-auto px-6">

        {/* Greeting + upcoming interview */}
        <section className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-7 items-stretch py-11">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-wide text-[#4A5C7A] mb-2.5">
              {today}
            </p>
            <h1 className="font-display font-semibold text-3xl text-[#1C2536] mb-2">
              {greeting}, {firstName}.
            </h1>
            <p className="text-[#4A5C7A] text-sm">
              You've got {applications.length} applications in motion.
            </p>
          </div>

          <div className="relative bg-[#1C2536] text-[#FAF9F4] rounded-2xl px-6 py-5 flex flex-col justify-center gap-1.5 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#E2A340]/15" />
            {upcomingInterview ? (
              <>
                <span className="font-mono text-[11px] uppercase tracking-wide text-[#E2A340]">
                  Next up
                </span>
                <h3 className="font-display font-semibold text-xl">{upcomingInterview.company} — Interview</h3>
                <p className="text-sm text-[#B9C0D0]">
                  {upcomingInterview.interviewDate!.toLocaleString("en-US", {
                    weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                  })} · {upcomingInterview.role}
                </p>
              </>
            ) : (
              <p className="text-sm text-[#B9C0D0]">No interviews scheduled yet.</p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10">
          <StatCard label="Total applications" value={String(applications.length)} delta="" />
          <StatCard
            label="Active interviews"
            value={String(applications.filter(a => a.status === "Interview").length)}
            delta=""
            colorClass="text-[#C9862A]"
          />
          <StatCard
            label="Offers"
            value={String(applications.filter(a => a.status === "Offer").length)}
            delta=""
            colorClass="text-[#4C6B5D]"
          />
          <StatCard label="Response rate" value={`${responseRate}%`} delta="" />
        </section>

        {/* Rail overview */}
        <section className="pb-6">
          <Rail
            stops={[
              { label: `Applied · ${applications.filter(a => a.status === "Applied").length}`, state: "done" },
              { label: `Interview · ${applications.filter(a => a.status === "Interview").length}`, state: "active" },
              { label: `Offer · ${applications.filter(a => a.status === "Offer").length}`, state: "offer" },
              { label: `Closed · ${applications.filter(a => a.status === "Closed").length}` },
            ]}
          />
        </section>

        {/* Board */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-xl text-[#1C2536]">Your pipeline</h2>
            <div className="flex items-center gap-3">
              {isPro ? (
                <a  
                  href="/api/export"
                  className="flex items-center gap-2 border border-[#E4E0D6] text-[#1C2536] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#FAF9F4] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                  Export CSV
                </a>
              ) : (
                <a
                  href="/dashboard/upgrade"
                  className="flex items-center gap-2 border border-[#E4E0D6] text-[#4A5C7A] text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#FAF9F4] hover:text-[#1C2536] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Export CSV
                </a>
              )}
              <AddApplicationButton />
            </div>
          </div>

          <SearchableBoard applications={applications} />
          
        </section>

      </main>
    </div>
  );
}
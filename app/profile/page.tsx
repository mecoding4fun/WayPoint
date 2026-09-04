import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import DashboardNavbar from "../components/DashboardNav";
import ClerkProfileCard from "../components/ClerkProfileCard";

export default async function ProfilePage() {
  const { userId } = await auth();

  const applications = await prisma.application.findMany({
    where: { userId: userId! },
  });

  const stats = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === "Interview").length,
    offers: applications.filter((a) => a.status === "Offer").length,
    closed: applications.filter((a) => a.status === "Closed").length,
  };

  return (
    <div>
      <DashboardNavbar />
      <main className="max-w-4xl mx-auto px-6 py-14 overflow-x-hidden">
        <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-wide text-[#4A5C7A] mb-2">
            Account
            </p>
            <h1 className="font-display font-semibold text-3xl text-[#1C2536]">
            Your profile
            </h1>
        </div>

        <ClerkProfileCard />

        <section className="mt-14">
            <p className="font-mono text-xs uppercase tracking-wide text-[#4A5C7A] mb-2">
            Overview
            </p>
            <h2 className="font-display font-semibold text-xl text-[#1C2536] mb-5">
            Your job search, so far
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E4E0D6] rounded-xl px-5 py-5">
                <p className="text-sm text-[#4A5C7A] mb-2">Total applications</p>
                <p className="font-mono text-2xl font-medium text-[#1C2536]">{stats.total}</p>
                </div>
                <div className="bg-white border border-[#E4E0D6] rounded-xl px-5 py-5">
                <p className="text-sm text-[#4A5C7A] mb-2">Interviews</p>
                <p className="font-mono text-2xl font-medium text-[#C9862A]">{stats.interviews}</p>
                </div>
                <div className="bg-white border border-[#E4E0D6] rounded-xl px-5 py-5">
                <p className="text-sm text-[#4A5C7A] mb-2">Offers</p>
                <p className="font-mono text-2xl font-medium text-[#4C6B5D]">{stats.offers}</p>
                </div>
                <div className="bg-white border border-[#E4E0D6] rounded-xl px-5 py-5">
                <p className="text-sm text-[#4A5C7A] mb-2">Closed</p>
                <p className="font-mono text-2xl font-medium text-[#A85A4E]">{stats.closed}</p>
                </div>
            </div>
        </section>
        </main>
    </div>
  );
}
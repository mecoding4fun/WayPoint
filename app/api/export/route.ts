// app/api/export/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || user?.publicMetadata?.plan !== "pro") {
    return NextResponse.json({ error: "Pro plan required" }, { status: 403 });
  }

  const applications = await prisma.application.findMany({ where: { userId } });

  const rows = applications.map((a) =>
    [a.company, a.role, a.status, a.appliedDate.toISOString()].join(",")
  );
  const csv = ["Company,Role,Status,Applied Date", ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=applications.csv",
    },
  });
}
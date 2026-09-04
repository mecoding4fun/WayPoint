import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// app/api/applications/route.ts
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json();
  const { company, role, jobUrl, status, notes, interviewDate } = body;

  if (!company || !role) {
    return NextResponse.json({ error: "Company and role are required" }, { status: 400 });
  }

  const application = await prisma.application.create({
    data: {
      userId,
      company,
      role,
      jobUrl: jobUrl || null,
      status: status || "Applied",
      notes: notes || null,
      interviewDate: interviewDate ? new Date(interviewDate) : null,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
// app/api/applications/[id]/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { company, role, jobUrl, status, notes, interviewDate } = body;

  // Make sure this application actually belongs to the logged-in user
  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.application.update({
    where: { id },
    data: {
      company,
      role,
      jobUrl: jobUrl || null,
      status,
      notes: notes || null,
      interviewDate: interviewDate ? new Date(interviewDate) : null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.application.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
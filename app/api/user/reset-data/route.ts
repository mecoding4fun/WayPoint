// app/api/user/reset-data/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  await prisma.application.deleteMany({ where: { userId } });
  return NextResponse.json({ success: true });
}
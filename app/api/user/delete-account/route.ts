// app/api/user/delete-account/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Delete their data first
  await prisma.application.deleteMany({ where: { userId } });

  // Then delete the actual Clerk account
  const client = await clerkClient();
  await client.users.deleteUser(userId);

  return NextResponse.json({ success: true });
}
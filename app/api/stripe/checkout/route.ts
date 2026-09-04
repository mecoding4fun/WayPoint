// app/api/stripe/checkout/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const origin = request.headers.get("origin") || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID!,
        quantity: 1,
      },
    ],
    customer_email: email,
    client_reference_id: userId, // links this checkout session back to the Clerk user
    success_url: `${origin}/dashboard?upgraded=true`,
    cancel_url: `${origin}/dashboard/upgrade`,
  });

  return NextResponse.json({ url: session.url });
}
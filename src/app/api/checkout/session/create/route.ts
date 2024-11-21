import { createCheckoutSession } from "../../../../stripe/stripe-helper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { priceId, mode } = await request.json();

  if (!priceId) {
    return NextResponse.json({ error: "priceId is required" }, { status: 400 });
  }

  if (!mode || (mode !== "payment" && mode !== "subscription")) {
    return NextResponse.json(
      { error: "mode is required and must be 'payment' or 'subscription'" },
      { status: 400 }
    );
  }

  const { client_secret, id } = await createCheckoutSession(priceId, mode);
  return NextResponse.json({ client_secret, id });
}

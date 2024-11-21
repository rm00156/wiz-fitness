import { getCheckoutSession } from "../../../../stripe/stripe-helper";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json(
      { error: "session_id is required" },
      { status: 400 }
    );
  }

  const { status, payment_status } = await getCheckoutSession(session_id);
  return NextResponse.json({ status, payment_status });
}

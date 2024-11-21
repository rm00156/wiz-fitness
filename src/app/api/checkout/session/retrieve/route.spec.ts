import { GET } from "./route";
import { getCheckoutSession } from "../../../../stripe/stripe-helper";
import Stripe from "stripe";

jest.mock("../../../../stripe/stripe-helper", () => ({
  getCheckoutSession: jest.fn(),
}));

describe("api/checkout/session/retrieve", () => {
  it("should return 400 error if sessionId is not provided", async () => {
    const mockRequest = {
      url: "http://localhost:3000/api/checkout/session/retrieve",
    } as unknown as Request;

    const response = await GET(mockRequest);

    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBe("session_id is required");
  });

  it("should return 200 response if sessionId is provided", async () => {
    const mockRequest = {
      url: "http://localhost:3000/api/checkout/session/retrieve?session_id=5",
    } as unknown as Request;

    jest.mocked(getCheckoutSession).mockResolvedValue({
      status: "status" as Stripe.Checkout.Session.Status,
      payment_status: "unpaid",
    });
    const response = await GET(mockRequest);

    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.status).toBe("status");
    expect(json.payment_status).toBe("unpaid");
  });
});

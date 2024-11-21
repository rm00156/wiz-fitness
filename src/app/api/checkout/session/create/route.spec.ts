import { POST } from "./route";
import { createCheckoutSession } from "../../../../stripe/stripe-helper";

jest.mock("../../../../stripe/stripe-helper", () => ({
  createCheckoutSession: jest.fn(),
}));

describe("api/checkout/session/create", () => {
  it("should return 400 error if priceId is not provided", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ mode: "payment" }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBe("priceId is required");
  });

  it("should return 400 error if priceId provided, but mode is not provided", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ priceId: "priceId" }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBe(
      "mode is required and must be 'payment' or 'subscription'"
    );
  });

  it("should return 400 error if priceId provided, but mode is not payment or subscription", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ priceId: "priceId", mode: "mode" }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBe(
      "mode is required and must be 'payment' or 'subscription'"
    );
  });

  it("should return 200 response if priceId provided, and correct mode is provided", async () => {
    const mockRequest = {
      json: jest
        .fn()
        .mockResolvedValue({ priceId: "priceId", mode: "payment" }),
    } as unknown as Request;

    jest.mocked(createCheckoutSession).mockResolvedValue({
      client_secret: "secret",
      id: "id",
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.client_secret).toBe("secret");
    expect(json.id).toBe("id");
  });
});

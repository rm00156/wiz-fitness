import Page from "./page";
import { act, render, screen, waitFor } from "@testing-library/react";
import { WizardProvider, useWizard } from "../../context/wizard-context";
import { useRouter, useSearchParams } from "next/navigation";
import { testRouterFactory } from "../../test-factory/test-router";
import fetchMock from "jest-fetch-mock";
import { testSearchParamsFactory } from "../../test-factory/test-searchParams";
import { Stripe, loadStripe } from "@stripe/stripe-js";

jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn(),
}));

jest.mock("@stripe/react-stripe-js", () => ({
  EmbeddedCheckoutProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ), // Mock implementation
  EmbeddedCheckout: () => <div>Embedded Checkout Mock</div>,
}));

fetchMock.enableMocks();

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), useSearchParams: jest.fn() };
});

jest.mock("../../context/wizard-context", () => {
  return {
    ...jest.requireActual("../../context/wizard-context"),
    useWizard: jest.fn(),
  };
});

process.env.stripe_private_key = "test";

describe("page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it("should render page when membership type is not Daily Pass", async () => {
    jest.doMock("../../data/progress-sections.json", () => [
      {
        step: 1,
        name: "Your Plan",
        href: "/join-now",
      },
      {
        step: 2,
        name: "Your Details",
        href: "/join-now/your-details",
      },
      {
        step: 3,
        name: "Payment",
        href: "/join-now/payment",
      },
    ]);

    // const mockStripe = {
    //   elements: jest.fn().mockReturnValue({
    //     create: jest.fn(),
    //     update: jest.fn(),
    //     mount: jest.fn(),
    //     unmount: jest.fn(),
    //     destroy: jest.fn(),
    //   }),
    //   createToken: jest.fn(),
    //   createSource: jest.fn(),
    //   createPaymentMethod: jest.fn(),
    //   confirmCardPayment: jest.fn(),
    //   confirmCardSetup: jest.fn(),
    //   paymentRequest: jest.fn(),
    //   _registerWrapper: jest.fn(),
    //   version: "1.0.0",
    // } as unknown as Stripe;
    // jest.mocked(loadStripe).mockResolvedValue(mockStripe);

    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build());
    jest.mocked(useWizard).mockReturnValue({
      formData: {},
      updateFormData: jest.fn(),
    });

    jest.mocked(useSearchParams).mockReturnValue(
      testSearchParamsFactory.build({
        get: () => "get",
      })
    );

    fetchMock.mockResponseOnce(
      JSON.stringify({ client_secret: "test_secret" })
    );

    const page = await Page();

    act(() => {
      render(<WizardProvider>{page}</WizardProvider>);
    });

    await waitFor(() => {
      expect(screen.getByText("Your Plan")).toBeInTheDocument();
    });
  });

  it("should render page when membership type is Daily Pass", async () => {
    jest.doMock("../../data/progress-sections.json", () => [
      {
        step: 1,
        name: "Your Plan",
        href: "/join-now",
      },
      {
        step: 2,
        name: "Your Details",
        href: "/join-now/your-details",
      },
      {
        step: 3,
        name: "Payment",
        href: "/join-now/payment",
      },
    ]);

    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build());
    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membershipType: "Daily Pass",
      },
      updateFormData: jest.fn(),
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({ client_secret: "test_secret" })
    );

    const page = await Page();

    act(() => {
      render(<WizardProvider>{page}</WizardProvider>);
    });

    await waitFor(() => {
      expect(screen.getByText("Your Plan")).toBeInTheDocument();
    });
  });

  it("should set stripePromise state after loadStripe is called", async () => {
    const mockStripeInstance = { ready: true };
    jest
      .mocked(loadStripe)
      .mockResolvedValue(mockStripeInstance as unknown as Stripe);
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build());
    jest.mocked(useWizard).mockReturnValue({
      formData: {},
      updateFormData: jest.fn(),
    });

    jest.mocked(useSearchParams).mockReturnValue(
      testSearchParamsFactory.build({
        get: () => "get",
      })
    );
    fetchMock.mockResponseOnce(
      JSON.stringify({ client_secret: "test_secret" })
    );
    // Act: Render the component
    const page = await Page();

    act(() => {
      render(<WizardProvider>{page}</WizardProvider>);
    });

    // Wait for the async operation (useEffect) to complete
    await waitFor(() => {
      // Assert: Verify that the stripePromise state has been set correctly
      expect(loadStripe).toHaveBeenCalled();
      expect(loadStripe).toHaveBeenCalledTimes(1);
    });
  });
});

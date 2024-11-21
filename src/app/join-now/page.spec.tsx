import Page from "./page";
import { render, screen } from "@testing-library/react";
import { WizardProvider, useWizard } from "../context/wizard-context";
import { useRouter } from "next/navigation";
import { testRouterFactory } from "../test-factory/test-router";
import { getProductsList } from "../stripe/stripe-helper";
import { membershipFactory } from "../components/memberships/test-factory/membership-factory";

jest.mock("../stripe/stripe-helper", () => {
  return {
    getProductsList: jest.fn(),
  };
});

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

jest.mock("../context/wizard-context", () => {
  return {
    ...jest.requireActual("../context/wizard-context"),
    useWizard: jest.fn(),
  };
});

describe("page", () => {
  it("should render page", async () => {
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build());
    jest.mocked(useWizard).mockReturnValue({
      formData: {},
      updateFormData: jest.fn(),
    });

    jest.mocked(getProductsList).mockResolvedValue({
      dailyProducts: [membershipFactory.build()],
      membershipProducts: [membershipFactory.build()],
    });
    const page = await Page();

    render(<WizardProvider>{page}</WizardProvider>);

    expect(screen.getByText("Your Plan")).toBeInTheDocument();
  });
});

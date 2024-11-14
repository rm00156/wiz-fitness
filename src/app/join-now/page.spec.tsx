import Page from "./page";
import { render, screen } from "@testing-library/react";
import { WizardProvider, useWizard } from "../context/wizard-context";
import { useRouter } from "next/navigation";
import { testRouterFactory } from "../test-factory/test-router";

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
    const page = await Page();

    render(<WizardProvider>{page}</WizardProvider>);

    expect(screen.getByText("Your Plan")).toBeInTheDocument();
  });
});

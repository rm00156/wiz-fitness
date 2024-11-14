import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

import {
  FormData,
  WizardProvider,
  useWizard,
} from "../../../context/wizard-context";
import ProgressSummary from "./progress-summary";
import { testRouterFactory } from "../../../test-factory/test-router";

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

jest.mock("../../../context/wizard-context", () => {
  return {
    ...jest.requireActual("../../../context/wizard-context"),
    useWizard: jest.fn(),
  };
});

describe("progress summary", () => {
  it("should go to /join-now when membership type edit link clicked", () => {
    const mockFormData = {
      membershipType: "Monthly",
    } as FormData;

    const mockUpdateFormData = jest.fn();
    jest.mocked(useWizard).mockReturnValue({
      formData: mockFormData,
      updateFormData: mockUpdateFormData,
    });

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );

    render(
      <WizardProvider>
        <ProgressSummary />
      </WizardProvider>
    );

    const link = screen.getByRole("link", { name: "Edit" });
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      ...mockFormData,
      membership: undefined,
      membershipType: undefined,
    });

    expect(push).toHaveBeenCalledWith("/join-now");
  });

  it("should go to /join-now when the membership edit link clicked and membership type is monthly rolling", () => {
    const mockFormData = {
      membershipType: "Monthly - Rolling",
      membership: "membership",
    } as FormData;

    const mockUpdateFormData = jest.fn();
    jest.mocked(useWizard).mockReturnValue({
      formData: mockFormData,
      updateFormData: mockUpdateFormData,
    });

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );

    render(
      <WizardProvider>
        <ProgressSummary />
      </WizardProvider>
    );

    const links = screen.getAllByRole("link", { name: "Edit" });
    const link = links[1];
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      ...mockFormData,
      total: undefined,
      membership: undefined,
      membershipType: "Monthly",
    });

    expect(push).toHaveBeenCalledWith("/join-now");
  });

  it("should go to /join-now when the membership edit link clicked and membership type is not monthly rolling", () => {
    const mockFormData = {
      membershipType: "Daily Passes",
      membership: "membership",
    } as FormData;

    const mockUpdateFormData = jest.fn();
    jest.mocked(useWizard).mockReturnValue({
      formData: mockFormData,
      updateFormData: mockUpdateFormData,
    });

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );

    render(
      <WizardProvider>
        <ProgressSummary />
      </WizardProvider>
    );

    const links = screen.getAllByRole("link", { name: "Edit" });
    const link = links[1];
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      ...mockFormData,
      total: undefined,
      membership: undefined,
      membershipType: "Daily Passes",
    });

    expect(push).toHaveBeenCalledWith("/join-now");
  });

  it("should go to /join-now/your-details when the start date edit link clicked", () => {
    const mockFormData = {
      startDate: "startDate",
    } as FormData;

    jest.mocked(useWizard).mockReturnValue({
      formData: mockFormData,
      updateFormData: jest.fn(),
    });

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );

    render(
      <WizardProvider>
        <ProgressSummary />
      </WizardProvider>
    );

    const link = screen.getByRole("link", { name: "Edit" });
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(push).toHaveBeenCalledWith("/join-now/your-details");
  });
});

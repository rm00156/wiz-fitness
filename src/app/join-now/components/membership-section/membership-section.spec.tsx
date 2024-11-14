import { render, screen, fireEvent } from "@testing-library/react";
import { WizardProvider, useWizard } from "../../../context/wizard-context";
import MembershipSection from "./membership-section";
import { membershipFactory } from "../../../components/memberships/test-factory/membership-factory";

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

jest.mock("../../../context/wizard-context", () => {
  return {
    ...jest.requireActual("../../../context/wizard-context"),
    useWizard: jest.fn(),
  };
});

describe("membership section", () => {
  it("should render daily passes correctly when form data membership type is set to Daily Passes", () => {
    const dailyPasses = [membershipFactory.build()];
    const monthlies = [membershipFactory.build({ membershipType: "Monthly" })];

    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membershipType: "Daily Passes",
      },
      updateFormData: jest.fn(),
    });
    render(
      <WizardProvider>
        <MembershipSection dailyPasses={dailyPasses} monthlies={monthlies} />
      </WizardProvider>
    );

    expect(
      screen.getByText("Select the pass that suits you best")
    ).toBeInTheDocument();
  });

  it("should render monthlies correctly when form data membership type is set to Monthly", () => {
    const dailyPasses = [membershipFactory.build()];
    const monthlies = [membershipFactory.build({ membershipType: "Monthly" })];

    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membershipType: "Monthly",
      },
      updateFormData: jest.fn(),
    });
    render(
      <WizardProvider>
        <MembershipSection dailyPasses={dailyPasses} monthlies={monthlies} />
      </WizardProvider>
    );

    expect(
      screen.getByText("Get the membership that suits you best")
    ).toBeInTheDocument();
  });

  it("should render initial view correctly when form data membership type is not set", () => {
    const dailyPasses = [membershipFactory.build()];
    const monthlies = [membershipFactory.build({ membershipType: "Monthly" })];

    jest.mocked(useWizard).mockReturnValue({
      formData: {},
      updateFormData: jest.fn(),
    });
    render(
      <WizardProvider>
        <MembershipSection dailyPasses={dailyPasses} monthlies={monthlies} />
      </WizardProvider>
    );

    expect(
      screen.getByText(
        "Select a day pass or explore our flexible monthly memberships."
      )
    ).toBeInTheDocument();
  });

  it("should update view correctly when membership type option selected", () => {
    const dailyPasses = [membershipFactory.build()];
    const monthlies = [membershipFactory.build({ membershipType: "Monthly" })];

    const mockUpdateFormData = jest.fn();
    jest.mocked(useWizard).mockReturnValue({
      formData: {},
      updateFormData: mockUpdateFormData,
    });
    render(
      <WizardProvider>
        <MembershipSection dailyPasses={dailyPasses} monthlies={monthlies} />
      </WizardProvider>
    );

    const buttonElements = screen.getAllByRole("button", { name: "Select" });
    const buttonElement = buttonElements[0];
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(mockUpdateFormData).toHaveBeenCalled();
  });
});

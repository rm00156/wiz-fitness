import { render, screen, fireEvent } from "@testing-library/react";
import ProgressSection, { ProgressSteps } from "./progress-section";
import { WizardProvider, useWizard } from "../../../context/wizard-context";
import { useRouter } from "next/navigation";
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

const testProgressSections = [
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
] as ProgressSteps[];

describe("progress section", () => {
  it("should render progress section step 1 correctly", () => {
    const title = "title";
    const step = 1;

    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membership: "membership",
        membershipType: "Monthly",
        total: "total",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        dateOfBirth: "dateOfBirth",
        startDate: "startDate",
        password: "password",
        telephone: "telephone",
        postCode: "postCode",
        gender: "Male",
        disabledAccess: "No",
      },
      updateFormData: jest.fn(),
    });
    render(
      <WizardProvider>
        <ProgressSection
          progressSections={testProgressSections}
          title={title}
          step={step}
        />
      </WizardProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should redirect to step 1 when step 2 rendered missing valid form data", () => {
    const title = "title";

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );

    jest.mocked(useWizard).mockReturnValue({
      formData: {},
      updateFormData: jest.fn(),
    });
    render(
      <WizardProvider>
        <ProgressSection
          progressSections={testProgressSections}
          title={title}
          step={2}
        />
      </WizardProvider>
    );

    expect(push).toHaveBeenCalledWith("/join-now");
  });

  it("should only go to steps small or equal to the current step when clicking the step icons", () => {
    const title = "title";
    const step = 3;

    const mockedUpdateFormData = jest.fn();
    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membership: "membership",
        membershipType: "Monthly",
        total: "total",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        dateOfBirth: "dateOfBirth",
        startDate: "startDate",
        password: "password",
        telephone: "telephone",
        postCode: "postCode",
        gender: "Male",
        disabledAccess: "No",
      },
      updateFormData: mockedUpdateFormData,
    });

    render(
      <WizardProvider>
        <ProgressSection
          progressSections={testProgressSections}
          title={title}
          step={step}
        />
      </WizardProvider>
    );

    const step1Span = screen.getByText("2");
    expect(step1Span).toBeInTheDocument();

    const parentDiv = step1Span.parentElement as HTMLElement;
    fireEvent.click(parentDiv);

    expect(mockedUpdateFormData).not.toHaveBeenCalled();
  });
});

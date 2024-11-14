import { testRouterFactory } from "../../test-factory/test-router";
import { WizardProvider, useWizard } from "../../context/wizard-context";
import { ProgressSteps } from "../components/progress-section/progress-section";
import YourDetails from "./your-details-page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

jest.mock("../../context/wizard-context", () => {
  return {
    ...jest.requireActual("../../context/wizard-context"),
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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("your details page", () => {
  it("should submit form if all values entered are valid and go to payment page", async () => {
    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build({ push }));

    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membership: "membership",
        membershipType: "Daily Passes",
        total: "total",
      },
      updateFormData: jest.fn(),
    });

    render(
      <WizardProvider>
        <YourDetails progressSections={testProgressSections} />
      </WizardProvider>
    );

    const firstNameInput = screen.getByRole("textbox", { name: "firstName" });
    expect(firstNameInput).toBeInTheDocument();

    await userEvent.type(firstNameInput, "John");

    const lastNameInput = screen.getByRole("textbox", { name: "lastName" });
    expect(lastNameInput).toBeInTheDocument();

    await userEvent.type(lastNameInput, "Doe");

    const emailInput = screen.getByRole("textbox", { name: "email" });
    expect(emailInput).toBeInTheDocument();

    await userEvent.type(emailInput, "johndoe@hotmail.com");

    const passwordInput = screen.getByLabelText("Password *");
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(passwordInput, "password");

    const telephoneInput = screen.getByRole("textbox", { name: "telephone" });
    expect(telephoneInput).toBeInTheDocument();

    await userEvent.type(telephoneInput, "00000000000");

    const postCodeInput = screen.getByRole("textbox", { name: "postCode" });
    expect(postCodeInput).toBeInTheDocument();

    await userEvent.type(postCodeInput, "AB12 2DF");

    const maleRadio = screen.getByLabelText("Male");

    await userEvent.click(maleRadio);

    const noRadio = screen.getByLabelText("No");

    await userEvent.click(noRadio);

    const dateOfBirthInput = screen.getByLabelText("Date of Birth *");
    expect(dateOfBirthInput).toBeInTheDocument();

    await userEvent.type(dateOfBirthInput, "1980-01-01");

    const startDateInput = screen.getByLabelText("Start Date *");
    expect(startDateInput).toBeInTheDocument();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = String(tomorrow.getDate()).padStart(2, "0");
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const year = tomorrow.getFullYear();

    await userEvent.type(startDateInput, `${year}-${month}-${day}`);

    const buttonElement = screen.getByRole("button", {
      name: "Continue to Payment",
    });

    expect(buttonElement).toBeInTheDocument();

    await userEvent.click(buttonElement);
    expect(push).toHaveBeenCalledWith("/join-now/payment");
  });

  it("should display error messages when form submitted with no valid inputs", async () => {
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build());

    render(
      <WizardProvider>
        <YourDetails progressSections={testProgressSections} />
      </WizardProvider>
    );

    const buttonElement = screen.getByRole("button", {
      name: "Continue to Payment",
    });
    await userEvent.click(buttonElement);

    expect(screen.getByText("First Name is required")).toBeInTheDocument();
    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
    expect(screen.getByText("Gender is required")).toBeInTheDocument();
    expect(screen.getByText("This option is required")).toBeInTheDocument();
    expect(
      screen.getByText("Telephone must contain only numbers")
    ).toBeInTheDocument();
    expect(screen.getByText("Invalid postcode format")).toBeInTheDocument();
    expect(
      screen.getByText("Date of birth must be in YYYY-MM-DD format")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Start Date must be in YYYY-MM-DD format")
    ).toBeInTheDocument();
  });

  it("should display error message when date is in future for date of birth", async () => {
    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build({ push }));

    jest.mocked(useWizard).mockReturnValue({
      formData: {
        membership: "membership",
        membershipType: "Daily Passes",
        total: "total",
      },
      updateFormData: jest.fn(),
    });

    render(
      <WizardProvider>
        <YourDetails progressSections={testProgressSections} />
      </WizardProvider>
    );

    const dateOfBirthInput = screen.getByLabelText("Date of Birth *");
    expect(dateOfBirthInput).toBeInTheDocument();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = String(tomorrow.getDate()).padStart(2, "0");
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const year = tomorrow.getFullYear();

    await userEvent.type(dateOfBirthInput, `${year}-${month}-${day}`);

    const buttonElement = screen.getByRole("button", {
      name: "Continue to Payment",
    });

    expect(buttonElement).toBeInTheDocument();

    await userEvent.click(buttonElement);
    expect(
      screen.getByText("Date of birth must be in the past")
    ).toBeInTheDocument();
  });
});

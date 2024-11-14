import { render, screen } from "@testing-library/react";
import { membershipFactory } from "./test-factory/membership-factory";
import { WizardProvider } from "../../context/wizard-context";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import MembershipItem from "./membership-item";
import { testRouterFactory } from "../../test-factory/test-router";

jest.mock("next/navigation");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUpdateFormData = jest.fn();
jest.mock("../../context/wizard-context", () => {
  return {
    ...jest.requireActual("../../context/wizard-context"),
    useWizard: () => {
      return {
        formData: mockUpdateFormData,
        updateFormData: mockUpdateFormData,
      };
    },
  };
});

describe("membership item", () => {
  it("should go to your details step in the join now wizard and set correct fields when not rolling", async () => {
    const testMembership = membershipFactory.build();

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );
    // Mock the return value of useRouter
    render(
      <WizardProvider>
        <MembershipItem membership={testMembership} />
      </WizardProvider>
    );

    const linkElement = screen.getByRole("button", { name: "Select" });
    expect(linkElement).toBeInTheDocument();
    await userEvent.click(linkElement);
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      ...mockUpdateFormData,
      membership: testMembership.name,
      membershipType: testMembership.membershipType,
      total: testMembership.price1,
    });
    expect(push).toHaveBeenCalledWith("/join-now/your-details");
  });

  it("should go to your details step in the join now wizard and set correct fields when rolling", async () => {
    const testMembership = membershipFactory.build();

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(
      testRouterFactory.build({
        push,
      })
    );
    // Mock the return value of useRouter
    render(
      <WizardProvider>
        <MembershipItem membership={testMembership} isChecked={true} />
      </WizardProvider>
    );

    const linkElement = screen.getByRole("button", { name: "Select" });
    expect(linkElement).toBeInTheDocument();
    await userEvent.click(linkElement);
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      ...mockUpdateFormData,
      membership: testMembership.name,
      membershipType: "Monthly - Rolling",
      total: testMembership.price2,
    });
    expect(push).toHaveBeenCalledWith("/join-now/your-details");
  });
});

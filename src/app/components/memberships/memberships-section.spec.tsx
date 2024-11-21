import { render, screen } from "@testing-library/react";
import MembershipsSection from "./memberships-section";
import {
  membershipFactory,
  stripePriceFactory,
} from "./test-factory/membership-factory";
import userEvent from "@testing-library/user-event";
import { WizardProvider } from "../../context/wizard-context";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("memberships section", () => {
  it("should render memberships section when not most popular correctly", () => {
    const testMemberships = [membershipFactory.build()];
    const title = "Title";
    const { container } = render(
      <WizardProvider>
        <MembershipsSection memberships={testMemberships} title={title} />
      </WizardProvider>
    );

    const testMembership = testMemberships[0];
    expect(screen.getByText(testMembership.name)).toBeInTheDocument();
    expect(container.querySelector(".text-gray-600")).toBeInTheDocument();
    expect(container.querySelector(".text-gray-400")).not.toBeInTheDocument();

    expect(screen.getByText("£200")).toBeInTheDocument();
    expect(container.querySelector(".bg-black")).toBeInTheDocument();
    expect(container.querySelector(".bg-amber-500")).not.toBeInTheDocument();
  });

  it("should render memberships section when most popular correctly", async () => {
    const testMemberships = [membershipFactory.build({ isMostPopular: true })];

    const title = "title";
    const { container } = render(
      <WizardProvider>
        <MembershipsSection memberships={testMemberships} title={title} />
      </WizardProvider>
    );

    const testMembership = testMemberships[0];
    expect(screen.getByText(testMembership.name)).toBeInTheDocument();
    expect(container.querySelector(".text-gray-600")).not.toBeInTheDocument();
    expect(container.querySelector(".text-gray-400")).toBeInTheDocument();
    expect(screen.getByText("£200")).toBeInTheDocument();
    expect(container.querySelector(".bg-black")).not.toBeInTheDocument();
    expect(container.querySelector(".bg-amber-500")).toBeInTheDocument();
  });

  it("should switch to flexible price view when switch clicked", async () => {
    const testMemberships = [
      membershipFactory.build({
        secondary_price: stripePriceFactory.build({ unit_amount: 15000 }),
      }),
    ];
    const title = "title";
    render(
      <WizardProvider>
        <MembershipsSection
          memberships={testMemberships}
          title={title}
          isDisplayCheckBox={true}
        />
      </WizardProvider>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    expect(screen.getByText("£150")).toBeInTheDocument();
  });
});

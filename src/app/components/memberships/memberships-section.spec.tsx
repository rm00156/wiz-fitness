import { render, screen } from "@testing-library/react";
import MembershipsSection from "./memberships-section";
import { membershipsFactory } from "./test-factory/membership-factory";
import userEvent from "@testing-library/user-event";

describe("memberships section", () => {
  it("should render memberships section when not most popular correctly", () => {
    const testMemberships = membershipsFactory.make();
    const { container } = render(
      <MembershipsSection memberships={testMemberships} />
    );

    const testMembership = testMemberships[0];
    expect(screen.getByText(testMembership.name)).toBeInTheDocument();
    expect(container.querySelector(".text-gray-600")).toBeInTheDocument();
    expect(container.querySelector(".text-gray-400")).not.toBeInTheDocument();

    expect(screen.getByText("£100")).toBeInTheDocument();
    expect(container.querySelector(".bg-black")).toBeInTheDocument();
    expect(container.querySelector(".bg-amber-500")).not.toBeInTheDocument();
  });

  it("should render memberships section when most popular correctly", async () => {
    const testMemberships = await membershipsFactory.create([
      {
        id: "1",
        name: "name",
        href: "href",
        contractPrice: 100,
        rollingPrice: 150,
        isMostPopular: true,
        features: [
          { name: "Gym", access: true },
          { name: "Fitness Classes", access: true },
          { name: "Unrestricted Access", access: true },
          { name: "Sauna Access", access: true },
          { name: "Monthly Guest Pass", access: true },
          { name: "Free Towel on every visit", access: true },
          { name: "10% discount in shop", access: true },
          { name: "10% discount on Kids sessions", access: true },
          { name: "Access to exclusive digital content", access: true },
        ],
      },
    ]);
    const { container } = render(
      <MembershipsSection memberships={testMemberships} />
    );

    const testMembership = testMemberships[0];
    expect(screen.getByText(testMembership.name)).toBeInTheDocument();
    expect(container.querySelector(".text-gray-600")).not.toBeInTheDocument();
    expect(container.querySelector(".text-gray-400")).toBeInTheDocument();
    expect(screen.getByText("£100")).toBeInTheDocument();
    expect(container.querySelector(".bg-black")).not.toBeInTheDocument();
    expect(container.querySelector(".bg-amber-500")).toBeInTheDocument();
  });

  it("should switch to rolling price view when switch clicked", async () => {
    const testMemberships = membershipsFactory.make();
    render(<MembershipsSection memberships={testMemberships} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    expect(screen.getByText("£150")).toBeInTheDocument();
  });

  it("should display x mark i red-400 if a feature is not available and is most popular", async () => {
    const testMemberships = await membershipsFactory.create([
      {
        id: "1",
        name: "name",
        href: "href",
        contractPrice: 100,
        rollingPrice: 150,
        description: "description",
        isMostPopular: true,
        features: [
          { name: "Gym", access: false },
          { name: "Fitness Classes", access: true },
          { name: "Unrestricted Access", access: true },
          { name: "Sauna Access", access: true },
          { name: "Monthly Guest Pass", access: true },
          { name: "Free Towel on every visit", access: true },
          { name: "10% discount in shop", access: true },
          { name: "10% discount on Kids sessions", access: true },
          { name: "Access to exclusive digital content", access: true },
        ],
      },
    ]);
    render(<MembershipsSection memberships={testMemberships} />);

    const listItem = screen.getByText("Gym");
    expect(listItem).toBeInTheDocument();

    expect(listItem.querySelector(".text-red-400")).toBeInTheDocument();
  });

  it("should display x mark i red-600 if a feature is not available and is not most popular", async () => {
    const testMemberships = await membershipsFactory.create([
      {
        id: "1",
        name: "name",
        href: "href",
        contractPrice: 100,
        rollingPrice: 150,
        description: "description",
        isMostPopular: false,
        features: [
          { name: "Gym", access: false },
          { name: "Fitness Classes", access: true },
          { name: "Unrestricted Access", access: true },
          { name: "Sauna Access", access: true },
          { name: "Monthly Guest Pass", access: true },
          { name: "Free Towel on every visit", access: true },
          { name: "10% discount in shop", access: true },
          { name: "10% discount on Kids sessions", access: true },
          { name: "Access to exclusive digital content", access: true },
        ],
      },
    ]);
    render(<MembershipsSection memberships={testMemberships} />);

    const listItem = screen.getByText("Gym");
    expect(listItem).toBeInTheDocument();

    expect(listItem.querySelector(".text-red-600")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import FooterSection from "./footer-section";

describe("footer section", () => {
  it("should render footer section correctly", async () => {
    render(<FooterSection />);

    expect(screen.getByText("Membership")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Key Information")).toBeInTheDocument();
  });
});

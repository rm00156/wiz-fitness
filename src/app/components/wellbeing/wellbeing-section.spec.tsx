import { render, screen } from "@testing-library/react";
import WellbeingSection from "./wellbeing-section";

describe("wellbeing section", () => {
  it("should render wellbeing section correctly", () => {
    render(<WellbeingSection />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/wellbeing");
    expect(linkElement).toHaveTextContent("Time to relax");
  });
});

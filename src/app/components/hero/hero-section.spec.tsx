import { render, screen } from "@testing-library/react";
import HeroSection from "./hero-section";

describe("hero section", () => {
  it("should render hero section correctly", () => {
    render(<HeroSection />);

    const videoElement = screen.getByTitle("hero-video"); // This may not work directly since 'video' role is not standardized.
    expect(videoElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: "Join Now" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/join-now");
  });
});

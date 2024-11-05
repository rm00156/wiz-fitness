import { render, screen } from "@testing-library/react";
import TestimonialCardItem from "./testimonial-card-item";

describe("testimonial card item", () => {
  it("should render testimonial card item correctly", () => {
    const testContent = {
      imagePath: "/imagePath",
      quote: "quote",
      by: "by",
    };

    render(<TestimonialCardItem content={testContent} />);

    expect(screen.getByText(testContent.quote)).toBeInTheDocument();
    expect(screen.getByText(testContent.by)).toBeInTheDocument();
    const imageElement = screen.getByRole("img");

    expect(imageElement).toBeInTheDocument();
  });
});

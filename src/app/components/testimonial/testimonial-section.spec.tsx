import { render, screen } from "@testing-library/react";
import TestimonialSection from "./testimonial-section";
import { testimonialsFactory } from "./test-factory/testimonial-factory";

describe("testimonial section", () => {
  it("should render testimonial card item correctly", () => {
    const testimonials = testimonialsFactory.make();
    const testimonial = testimonials[0];

    render(<TestimonialSection testimonials={testimonials} />);

    expect(screen.getByText("Member experiences")).toBeInTheDocument();
    expect(
      screen.getByText("Hear what our members love about WizFit")
    ).toBeInTheDocument();

    expect(screen.getByText(testimonial.quote)).toBeInTheDocument();
    expect(screen.getByText(testimonial.by)).toBeInTheDocument();

    const imageElement = screen.getByAltText("testimonial");
    expect(imageElement).toBeInTheDocument();
  });
});

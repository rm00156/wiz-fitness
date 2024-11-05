import { render } from "@testing-library/react";
import Home from "./page";
import { ClassesAndTrainingSectionProps } from "./components/classes-and-training/classes-and-training-section";
import { MemebershipsSectionProps } from "./components/memberships/memberships-section";
import { TestimonialProps } from "./components/testimonial/testimonial-section";
// Mock the data imports
jest.mock("./data/membership.json", () => [
  {
    id: 1,
    title: "Basic Plan",
    price: "£29.99",
    description: "Great for beginners",
    features: ["Feature 1", "Feature 2"],
  },
  {
    id: 2,
    title: "Premium Plan",
    price: "£49.99",
    description: "For serious fitness enthusiasts",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
]);

jest.mock("./data/home-membership.json", () => [
  {
    id: 1,
    title: "Personal Training",
    description: "One-on-one training sessions",
    imageUrl: "/training1.jpg",
  },
  {
    id: 2,
    title: "Group Classes",
    description: "Join our energetic group sessions",
    imageUrl: "/training2.jpg",
  },
]);

jest.mock("./data/testimonials.json", () => [
  {
    id: 1,
    name: "John Doe",
    text: "Great experience!",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "Amazing results!",
    rating: 5,
  },
]);

// Mock all child components
jest.mock("./components/hero/hero-section", () => ({
  __esModule: true,
  default: () => <div data-testid="hero">Hero Section</div>,
}));

jest.mock(
  "./components/classes-and-training/classes-and-training-section",
  () => ({
    __esModule: true,
    default: ({ memberships }: ClassesAndTrainingSectionProps) => (
      <div data-testid="classes-training">
        Classes and Training Section
        {/* Add a hidden div with stringified props for testing */}
        <div data-testid="classes-training-props" style={{ display: "none" }}>
          {JSON.stringify(memberships)}
        </div>
      </div>
    ),
  })
);

jest.mock("./components/wellbeing/wellbeing-section", () => ({
  __esModule: true,
  default: () => <div data-testid="wellbeing">Wellbeing Section</div>,
}));

jest.mock("./components/memberships/memberships-section", () => ({
  __esModule: true,
  default: ({ memberships }: MemebershipsSectionProps) => (
    <div data-testid="memberships">
      Memberships Section
      <div data-testid="memberships-props" style={{ display: "none" }}>
        {JSON.stringify(memberships)}
      </div>
    </div>
  ),
}));

jest.mock("./components/testimonial/testimonial-section", () => ({
  __esModule: true,
  default: ({ testimonials }: TestimonialProps) => (
    <div data-testid="testimonials">
      Testimonials Section
      <div data-testid="testimonials-props" style={{ display: "none" }}>
        {JSON.stringify(testimonials)}
      </div>
    </div>
  ),
}));

describe("Home Page", () => {
  it("renders all sections with correct props", async () => {
    const { getByTestId } = render(await Home());

    // Verify all sections are rendered
    expect(getByTestId("hero")).toBeInTheDocument();
    expect(getByTestId("classes-training")).toBeInTheDocument();
    expect(getByTestId("wellbeing")).toBeInTheDocument();
    expect(getByTestId("memberships")).toBeInTheDocument();
    expect(getByTestId("testimonials")).toBeInTheDocument();

    // Verify props passed to components
    const classesTrainingProps = JSON.parse(
      getByTestId("classes-training-props").textContent || "[]"
    );
    expect(classesTrainingProps).toHaveLength(2);
    expect(classesTrainingProps[0]).toHaveProperty(
      "title",
      "Personal Training"
    );

    const membershipsProps = JSON.parse(
      getByTestId("memberships-props").textContent || "[]"
    );
    expect(membershipsProps).toHaveLength(2);
    expect(membershipsProps[0]).toHaveProperty("title", "Basic Plan");

    const testimonialsProps = JSON.parse(
      getByTestId("testimonials-props").textContent || "[]"
    );
    expect(testimonialsProps).toHaveLength(2);
    expect(testimonialsProps[0]).toHaveProperty("name", "John Doe");
  });

  it("handles missing data gracefully", async () => {
    // Temporarily mock data to return empty arrays
    jest.resetModules();
    jest.mock("./data/membership.json", () => []);
    jest.mock("./data/home-membership.json", () => []);
    jest.mock("./data/testimonials.json", () => []);

    const { getByTestId } = render(await Home());

    // Verify sections still render even with empty data
    expect(getByTestId("hero")).toBeInTheDocument();
    expect(getByTestId("classes-training")).toBeInTheDocument();
    expect(getByTestId("wellbeing")).toBeInTheDocument();
    expect(getByTestId("memberships")).toBeInTheDocument();
    expect(getByTestId("testimonials")).toBeInTheDocument();

    // Verify empty arrays are passed as props
    const classesTrainingProps = JSON.parse(
      getByTestId("classes-training-props").textContent || "[]"
    );
    expect(classesTrainingProps).toHaveLength(0);

    const membershipsProps = JSON.parse(
      getByTestId("memberships-props").textContent || "[]"
    );
    expect(membershipsProps).toHaveLength(0);

    const testimonialsProps = JSON.parse(
      getByTestId("testimonials-props").textContent || "[]"
    );
    expect(testimonialsProps).toHaveLength(0);
  });
});

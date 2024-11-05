import { render, screen } from "@testing-library/react";
import ClassesAndTrainingSection from "./classes-and-training-section";
import { classesAndTrainingFactory } from "./test-factory/clasess-and-training-factory";

describe("classing and training section", () => {
  it("should render classing and training section correctly", async () => {
    const testContent = await classesAndTrainingFactory.create([
      {
        src: "/photo.jpg",
        title: "Studio Classes",
        href: "/studio",
      },
    ]);

    render(<ClassesAndTrainingSection memberships={testContent} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/studio");

    const imgElement = screen.getByAltText("Description");
    expect(imgElement).toBeInTheDocument();

    expect(screen.getByText("Studio Classes")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import Banner from "./banner";

describe("banner", () => {
  it("should render banner correctly", async () => {
    render(<Banner />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import TextBox from "./textBox";
import { Button } from "@headlessui/react";

describe("text box", () => {
  it("should render text box with no button correctly", async () => {
    const sectionItems = [
      {
        text: "text",
        id: "1",
      },
    ];
    render(<TextBox items={sectionItems} />);

    expect(screen.getByText("text")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("should render text box with button correctly", async () => {
    const sectionItems = [
      {
        text: "text",
        id: "1",
      },
    ];
    render(<TextBox items={sectionItems} button={<Button>Button</Button>} />);

    expect(screen.getByText("text")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});

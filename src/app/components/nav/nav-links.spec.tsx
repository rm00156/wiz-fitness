import { render, screen } from "@testing-library/react";
import { NavLinks } from "./nav-links";
import userEvent from "@testing-library/user-event";

describe("nav links", () => {
  it("should render nav links correctly", () => {
    render(<NavLinks />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/classes-and-training");
    expect(links[1]).toHaveTextContent("Classes and Training");

    expect(links[2]).toHaveAttribute("href", "/wellness");
    expect(links[2]).toHaveTextContent("Wellness");

    expect(links[3]).toHaveAttribute("href", "/memberships");
    expect(links[3]).toHaveTextContent("Memberships");

    expect(links[4]).toHaveAttribute("href", "/about");
    expect(links[4]).toHaveTextContent("About");

    expect(links[5]).toHaveAttribute("href", "/contact-us");
    expect(links[5]).toHaveTextContent("Contact us");

    expect(links[6]).toHaveAttribute("href", "/shop");
    expect(links[6]).toHaveTextContent("Shop");

    expect(links[7]).toHaveAttribute("href", "/login");
    expect(links[7]).toHaveTextContent("Log in");

    expect(links[8]).toHaveAttribute("href", "/join-now");
    expect(links[8]).toHaveTextContent("Join Now");
  });

  it("should check if the dialog is open or closed", async () => {
    render(<NavLinks />);

    const buttons = screen.getAllByRole("button");
    const openButton = buttons[0];

    await userEvent.click(openButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const span = screen.getByText("Close menu");
    const closeButton = span.parentElement as HTMLElement;

    await userEvent.click(closeButton);

    // Verify the dialog is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

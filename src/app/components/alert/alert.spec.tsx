import { render, screen, fireEvent } from "@testing-library/react";
import Alert from "./alert"; // Adjust the import path as needed

describe("Alert Component", () => {
  test("dismisses alert when button is clicked", () => {
    // Render the Alert component with the necessary props
    render(<Alert title="Test Title" message="Test message" />);

    // Check if the alert is rendered initially
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();

    // Simulate a click on the dismiss button (the "X" button)
    fireEvent.click(screen.getByRole("button"));

    // After clicking, the alert should no longer be in the document
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });
});

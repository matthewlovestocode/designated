import { render, screen } from "@testing-library/react";
import AuthMessage from "./auth-message";

describe("AuthMessage", () => {
  it("renders nothing when no message is provided", () => {
    const { container } = render(<AuthMessage />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the message inside an alert when a message is provided", () => {
    render(<AuthMessage message="Please sign in." />);

    expect(screen.getByRole("alert")).toHaveTextContent("Please sign in.");
  });
});

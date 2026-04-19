import { fireEvent, render, screen } from "@testing-library/react";
import ClickCounter from "./click-counter";

describe("ClickCounter", () => {
  it("increments the click count when the button is pressed", () => {
    render(<ClickCounter />);

    expect(screen.getByText("Clicks: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Click Me" }));

    expect(screen.getByText("Clicks: 1")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import PageHeader from "./page-header";

describe("PageHeader", () => {
  it("renders the provided heading as a level-one heading", () => {
    render(<PageHeader heading="Driver Dashboard" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Driver Dashboard" })
    ).toBeInTheDocument();
  });
});

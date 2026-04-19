import { render, screen } from "@testing-library/react";
import DeathClock from "./death-clock";

const CLOCK_EPOCH_MS = Date.UTC(2025, 0, 1, 0, 0, 0);

describe("DeathClock", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(CLOCK_EPOCH_MS + 10_000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the countdown and supporting copy", () => {
    render(<DeathClock />);

    expect(screen.getByText("41:50")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Until the next statistically expected alcohol-impaired-driving death."
      )
    ).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import LinearStatClock from "./linear-stat-clock";

const CLOCK_EPOCH_MS = Date.UTC(2025, 0, 1, 0, 0, 0);

describe("LinearStatClock", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(CLOCK_EPOCH_MS + 10_000);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the provided labels and updates the countdown after mount", async () => {
    render(
      <LinearStatClock
        description="A test statistic."
        endpointCopy="Police make the stop."
        endpointTitle="Arrest"
        endpointVariant="police"
        intervalMs={60_000}
        leftCopy="An impaired driver is out there."
        leftTitle="Road"
        overline="About every minute"
      />
    );

    expect(screen.getByText("About every minute")).toBeInTheDocument();
    expect(screen.getByText("A test statistic.")).toBeInTheDocument();
    expect(screen.getByText("Road")).toBeInTheDocument();
    expect(screen.getByText("Arrest")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("00:50")).toBeInTheDocument();
    });
    expect(screen.getByTestId("LocalPoliceIcon")).toBeInTheDocument();
  });

  it("renders the person endpoint variant", () => {
    render(
      <LinearStatClock
        description="A second test statistic."
        endpointCopy="A life is in the way."
        endpointTitle="Person"
        endpointVariant="person"
        intervalMs={60_000}
        leftCopy="A drunk driver leaves."
        leftTitle="Bar"
        overline="Every minute"
      />
    );

    expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();
  });
});

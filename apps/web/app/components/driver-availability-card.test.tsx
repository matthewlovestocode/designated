import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DriverAvailabilityCard from "./driver-availability-card";

const mockRefreshDriverAvailability = vi.fn();
const mockSetDriverAvailability = vi.fn();
const mockSetDriverUnavailable = vi.fn();

vi.mock("./availability-map", () => ({
  default: () => <div>Availability Map</div>
}));

vi.mock("../driver/actions", () => ({
  refreshDriverAvailability: (...args: unknown[]) =>
    mockRefreshDriverAvailability(...args),
  setDriverAvailability: (...args: unknown[]) => mockSetDriverAvailability(...args),
  setDriverUnavailable: (...args: unknown[]) => mockSetDriverUnavailable(...args)
}));

describe("DriverAvailabilityCard", () => {
  beforeEach(() => {
    mockRefreshDriverAvailability.mockReset();
    mockSetDriverAvailability.mockReset();
    mockSetDriverUnavailable.mockReset();

    Object.defineProperty(window.navigator, "geolocation", {
      configurable: true,
      value: {
        getCurrentPosition: (success: (position: GeolocationPosition) => void) => {
          success({
            coords: {
              accuracy: 5,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              latitude: 47.61,
              longitude: -122.33,
              speed: null
            },
            timestamp: Date.now()
          } as GeolocationPosition);
        }
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the unavailable state by default", () => {
    render(
      <DriverAvailabilityCard
        initialAvailability={{
          availableUntil: null,
          isAvailable: false,
          lastLocationAt: null,
          latitude: null,
          longitude: null,
          radiusMiles: 10
        }}
      />
    );

    expect(screen.getByText("Driver Availability")).toBeInTheDocument();
    expect(
      screen.getByText("You are currently unavailable for ride requests.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Available" })).toBeInTheDocument();
    expect(screen.getByText("Availability Map")).toBeInTheDocument();
  });

  it("marks the driver available with the current location", async () => {
    mockSetDriverAvailability.mockResolvedValue({
      availableUntil: "2026-04-18T20:30:00.000Z",
      isAvailable: true,
      lastLocationAt: "2026-04-18T20:15:00.000Z",
      latitude: 47.61,
      longitude: -122.33,
      radiusMiles: 10
    });

    render(
      <DriverAvailabilityCard
        initialAvailability={{
          availableUntil: null,
          isAvailable: false,
          lastLocationAt: null,
          latitude: null,
          longitude: null,
          radiusMiles: 10
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Go Available" }));

    await waitFor(() => {
      expect(mockSetDriverAvailability).toHaveBeenCalledWith({
        latitude: 47.61,
        longitude: -122.33,
        radiusMiles: 10
      });
    });

    expect(
      screen.getByText("You are available within 10 miles.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Unavailable" })).toBeInTheDocument();
  });

  it("marks the driver unavailable", async () => {
    mockSetDriverUnavailable.mockResolvedValue({
      isAvailable: false,
      updatedAt: "2026-04-18T20:16:00.000Z"
    });

    render(
      <DriverAvailabilityCard
        initialAvailability={{
          availableUntil: "2026-04-18T20:30:00.000Z",
          isAvailable: true,
          lastLocationAt: "2026-04-18T20:15:00.000Z",
          latitude: 47.61,
          longitude: -122.33,
          radiusMiles: 15
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Go Unavailable" }));

    await waitFor(() => {
      expect(mockSetDriverUnavailable).toHaveBeenCalled();
    });

    expect(
      screen.getByText("You are currently unavailable for ride requests.")
    ).toBeInTheDocument();
  });

  it("shows an error when location services are unavailable", async () => {
    Object.defineProperty(window.navigator, "geolocation", {
      configurable: true,
      value: undefined
    });

    render(
      <DriverAvailabilityCard
        initialAvailability={{
          availableUntil: null,
          isAvailable: false,
          lastLocationAt: null,
          latitude: null,
          longitude: null,
          radiusMiles: 10
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Go Available" }));

    await waitFor(() => {
      expect(
        screen.getByText("Location services are not available in this browser.")
      ).toBeInTheDocument();
    });
  });
});

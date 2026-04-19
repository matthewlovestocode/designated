import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NearbyDriversCard from "./nearby-drivers-card";

const mockLookupNearbyDrivers = vi.fn();

vi.mock("../availability/actions", () => ({
  lookupNearbyDrivers: (...args: unknown[]) => mockLookupNearbyDrivers(...args)
}));

describe("NearbyDriversCard", () => {
  beforeEach(() => {
    mockLookupNearbyDrivers.mockReset();

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

  it("loads nearby drivers for the current location", async () => {
    mockLookupNearbyDrivers.mockResolvedValue({
      drivers: [
        {
          availableUntil: "2026-04-18T20:30:00.000Z",
          distanceMiles: 1.8,
          driverUserId: "driver-1",
          lastLocationAt: "2026-04-18T20:15:00.000Z",
          radiusMiles: 5
        }
      ],
      lookedUpAt: "2026-04-18T20:16:00.000Z"
    });

    render(
      <NearbyDriversCard
        description="Find a nearby driver."
        emptyMessage="No drivers found."
        heading="Nearby Drivers"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Use My Location" }));

    await waitFor(() => {
      expect(mockLookupNearbyDrivers).toHaveBeenCalledWith({
        latitude: 47.61,
        longitude: -122.33
      });
    });

    expect(screen.getByText("Available Driver 1")).toBeInTheDocument();
    expect(screen.getByText("1.8 miles away")).toBeInTheDocument();
  });

  it("shows an empty state after a successful lookup with no results", async () => {
    mockLookupNearbyDrivers.mockResolvedValue({
      drivers: [],
      lookedUpAt: "2026-04-18T20:16:00.000Z"
    });

    render(
      <NearbyDriversCard
        description="Find a nearby driver."
        emptyMessage="No drivers found."
        heading="Nearby Drivers"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Use My Location" }));

    await waitFor(() => {
      expect(screen.getByText("No drivers found.")).toBeInTheDocument();
    });
  });

  it("shows an error when location services are unavailable", async () => {
    Object.defineProperty(window.navigator, "geolocation", {
      configurable: true,
      value: undefined
    });

    render(
      <NearbyDriversCard
        description="Find a nearby driver."
        emptyMessage="No drivers found."
        heading="Nearby Drivers"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Use My Location" }));

    await waitFor(() => {
      expect(
        screen.getByText("Location services are not available in this browser.")
      ).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import OpportunitiesMap from "./opportunities-map";

vi.mock("./opportunities-map-scene", () => ({
  default: () => <div>Opportunities Map Scene</div>
}));

describe("OpportunitiesMap", () => {
  it("shows a placeholder when driver location is unavailable", () => {
    render(
      <OpportunitiesMap
        driverLatitude={null}
        driverLongitude={null}
        driverRadiusMiles={10}
        opportunities={[]}
      />
    );

    expect(screen.getByText("Opportunity Map")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Share your location on the Driver page to compare opportunities against your active coverage radius."
      )
    ).toBeInTheDocument();
  });

  it("renders the scene when location and opportunities are available", () => {
    render(
      <OpportunitiesMap
        driverLatitude={47.61}
        driverLongitude={-122.33}
        driverRadiusMiles={10}
        opportunities={[
          {
            id: "request-1",
            pickup_label: "The Lantern",
            pickup_latitude: 47.615,
            pickup_longitude: -122.31,
            status: "open"
          }
        ]}
      />
    );

    expect(screen.getByText("Opportunity Map")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The teal marker is your current location. Brown markers are open requests. Amber markers are requests you have already claimed."
      )
    ).toBeInTheDocument();
  });
});

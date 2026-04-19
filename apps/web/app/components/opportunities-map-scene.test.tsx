import { render, screen } from "@testing-library/react";
import OpportunitiesMapScene from "./opportunities-map-scene";

const fitBounds = vi.fn();

vi.mock("leaflet", () => ({
  latLngBounds: vi.fn((points) => ({ points }))
}));

vi.mock("react-leaflet", () => ({
  Circle: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CircleMarker: () => <div>Circle Marker</div>,
  MapContainer: ({ children }: { children?: React.ReactNode }) => (
    <div>Map Container{children}</div>
  ),
  Polyline: () => <div>Polyline</div>,
  TileLayer: () => <div>Tile Layer</div>,
  useMap: () => ({
    fitBounds
  })
}));

describe("OpportunitiesMapScene", () => {
  it("renders the driver and opportunity markers", () => {
    render(
      <OpportunitiesMapScene
        driverLatitude={47.61}
        driverLongitude={-122.33}
        driverRadiusMiles={10}
        opportunities={[
          {
            id: "request-1",
            pickup_latitude: 47.615,
            pickup_longitude: -122.31,
            status: "open"
          }
        ]}
      />
    );

    expect(screen.getByText("Map Container")).toBeInTheDocument();
    expect(screen.getAllByText("Circle Marker")).toHaveLength(2);
    expect(screen.getByText("Polyline")).toBeInTheDocument();
    expect(fitBounds).toHaveBeenCalled();
  });
});

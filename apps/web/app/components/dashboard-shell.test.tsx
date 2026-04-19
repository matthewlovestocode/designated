import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DashboardShell from "./dashboard-shell";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname()
}));

function renderWithTheme(ui: React.ReactNode) {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);
}

describe("DashboardShell", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/admin/users");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders its children and the nested app navigation", () => {
    renderWithTheme(
      <DashboardShell>
        <div>Dashboard content</div>
      </DashboardShell>
    );

    expect(screen.getByText("Dashboard content")).toBeInTheDocument();
    expect(screen.getAllByText("Patron").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Concierge").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Driver").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Users").length).toBeGreaterThan(0);
  });

  it("opens the mobile drawer when the dashboard-nav event is dispatched", () => {
    mockUsePathname.mockReturnValue("/driver/opportunities");

    renderWithTheme(
      <DashboardShell>
        <div>More content</div>
      </DashboardShell>
    );

    fireEvent(
      window,
      new CustomEvent("dashboard-nav:open")
    );

    expect(screen.getAllByText("Opportunities").length).toBeGreaterThan(0);
  });
});

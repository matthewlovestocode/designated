import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopNav from "./top-nav";

const mockUsePathname = vi.fn();
const mockToggleColorMode = vi.fn();
const mockUseColorMode = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname()
}));

vi.mock("../theme-provider", () => ({
  useColorMode: () => mockUseColorMode()
}));

function renderWithTheme(ui: React.ReactNode) {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);
}

describe("TopNav", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    mockUseColorMode.mockReturnValue({
      mode: "light",
      toggleColorMode: mockToggleColorMode
    });
    mockToggleColorMode.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("opens the page menu and toggles the color mode", () => {
    renderWithTheme(<TopNav />);

    fireEvent.click(screen.getByLabelText("Open navigation menu"));

    expect(screen.getByRole("menuitem", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Admin" })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Switch to dark mode"));

    expect(mockToggleColorMode).toHaveBeenCalledTimes(1);
  });

  it("shows the dashboard drawer trigger on dashboard routes and dispatches the open event", () => {
    mockUsePathname.mockReturnValue("/dashboard");
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    renderWithTheme(<TopNav />);

    fireEvent.click(screen.getByLabelText("Open app navigation"));

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("shows the dark-mode label when the current mode is dark", () => {
    mockUseColorMode.mockReturnValue({
      mode: "dark",
      toggleColorMode: mockToggleColorMode
    });

    renderWithTheme(<TopNav />);

    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
  });
});

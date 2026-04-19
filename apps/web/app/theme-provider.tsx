"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  type PaletteMode
} from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f766e"
    },
    secondary: {
      main: "#b45309"
    },
    background: {
      default: "#f3f4f6",
      paper: "#ffffff"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5eead4"
    },
    secondary: {
      main: "#fbbf24"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  }
});

type ColorModeContextValue = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined
);

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used within AppThemeProvider.");
  }

  return context;
}

export default function AppThemeProvider({
  children
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedMode = window.localStorage.getItem("color-mode");

    if (storedMode === "light" || storedMode === "dark") {
      return storedMode;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const toggleColorMode = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";

      window.localStorage.setItem("color-mode", nextMode);

      return nextMode;
    });
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

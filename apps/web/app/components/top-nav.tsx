"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useColorMode } from "../theme-provider";

export default function TopNav() {
  const { mode, toggleColorMode } = useColorMode();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
        <Typography variant="h6">Designated</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          aria-controls={menuAnchor ? "page-links-menu" : undefined}
          aria-expanded={menuAnchor ? "true" : undefined}
          aria-haspopup="true"
          aria-label="Open navigation menu"
          onClick={openMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="page-links-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          <MenuItem component={Link} href="/" onClick={closeMenu}>
            Home
          </MenuItem>
          <MenuItem component={Link} href="/about" onClick={closeMenu}>
            About
          </MenuItem>
          <MenuItem component={Link} href="/contact" onClick={closeMenu}>
            Contact
          </MenuItem>
          <MenuItem component={Link} href="/sign-up" onClick={closeMenu}>
            Sign Up
          </MenuItem>
          <MenuItem component={Link} href="/sign-in" onClick={closeMenu}>
            Sign In
          </MenuItem>
          <MenuItem component={Link} href="/dashboard" onClick={closeMenu}>
            Dashboard
          </MenuItem>
          <MenuItem component={Link} href="/admin" onClick={closeMenu}>
            Admin
          </MenuItem>
        </Menu>
        <IconButton
          aria-label={
            mode === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          onClick={toggleColorMode}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

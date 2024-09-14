// Navbar.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import SlideMenu from "./menu.slides";
import SetupMenu from "./menu.setup";
import UserMenu from "./menu.users";

import "./nav.css";
import { Slide } from "react-toastify";

const Navbar = () => {
  const [anchorSetupEl, setAnchorSetupEl] = useState(null);
  const [anchorSlidesgEl, setAnchorSlidesEl] = useState(null);
  const [anchorUserEl, setAnchorUserEl] = useState(null);

  const handleSetupMenuClick = (event) => {
    setAnchorSetupEl(event.currentTarget);
  };

  const handleSlideMenuClick = (event) => {
    setAnchorSlidesEl(event.currentTarget);
  };

  const handleUserMenuClick = (event) => {
    setAnchorUserEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorSetupEl(null);
    setAnchorSlidesEl(null);
    setAnchorUserEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 3 }}>
          Navbar
        </Typography>
        <Button color="inherit" onClick={handleSlideMenuClick}>
          Slides
        </Button>
        <Button color="inherit" onClick={handleSetupMenuClick}>
          Setup
        </Button>
        <Button color="inherit" onClick={handleUserMenuClick}>
          User
        </Button>

        <SlideMenu anchorEl={anchorSlidesgEl} handleMenuClose={handleMenuClose}/>
        <SetupMenu anchorEl={anchorSetupEl} handleMenuClose={handleMenuClose} />
        <UserMenu anchorEl={anchorUserEl} handleMenuClose={handleMenuClose} />

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

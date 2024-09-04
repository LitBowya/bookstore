// src/components/ResponsiveNavbar.jsx

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import NavbarCss from "./Navbar.module.css";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={NavbarCss.navbar}>
      <Toolbar className={NavbarCss.toolbar}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/about">
                About
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/contact"
              >
                <FaUser />
              </MenuItem>
              {userInfo ? (
                <>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/profile"
                  >
                    <FaUser />
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/login"
                >
                  <FaUser />
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            {userInfo ? (
              <Button color="inherit" component={Link} to="/profile">
                <FaUser />
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                <FaUser />
              </Button>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

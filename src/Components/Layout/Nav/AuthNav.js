import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, Menu, IconButton, Button } from "@material-ui/core";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import MenuIcon from "@material-ui/icons/Menu";

const AuthNav = ({
  breadcrumbs,
  addBreadcrumb,
  handleClose,
  classes,
  open,
  anchorEl,
  logout,
  admin,
  width,
  handleMenu
}) => {
  if (isWidthDown("sm", width)) {
    return (
      <>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <Link to="/" className={classes.link}>
            <MenuItem
              onClick={() => {
                handleClose();
                addBreadcrumb({
                  name: "Home",
                  url: "/"
                });
              }}
            >
              Home
            </MenuItem>
          </Link>
          <Link to="/profile" className={classes.link}>
            <MenuItem
              onClick={() => {
                handleClose();
                addBreadcrumb({
                  name: "Profile",
                  url: "/"
                });
              }}
            >
              Profile
            </MenuItem>
          </Link>
          {admin && (
            <Link to="/createleague" className={classes.link}>
              <MenuItem
                onClick={() => {
                  handleClose();
                  addBreadcrumb({
                    name: "Create League",
                    url: "/createleague"
                  });
                }}
              >
                Create League
              </MenuItem>
            </Link>
          )}

          <Link to="/" className={classes.link}>
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
                addBreadcrumb({
                  name: "Home",
                  url: "/"
                });
              }}
            >
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </>
    );
  } else {
    return (
      <div>
        <Link to="/" className={classes.link}>
          <Button
            size="large"
            className={classes.navLinkDesktop}
            onClick={() => {
              addBreadcrumb({
                name: "Home",
                url: "/"
              });
            }}
          >
            Home
          </Button>
        </Link>
        <Link to="/profile" className={classes.link}>
          <Button
            size="large"
            className={classes.navLinkDesktop}
            onClick={() => {
              addBreadcrumb({
                name: "Profile",
                url: "/profile"
              });
            }}
          >
            Profile
          </Button>
        </Link>
        {admin && (
          <Link to="/createLeague" className={classes.link}>
            <Button
              size="large"
              className={classes.navLinkDesktop}
              onClick={() => {
                addBreadcrumb({
                  name: "Create League",
                  url: "/createleague"
                });
              }}
            >
              Create League
            </Button>
          </Link>
        )}

        <Button
          size="large"
          className={classes.navLinkDesktop}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    );
  }
};

export default withWidth()(AuthNav);

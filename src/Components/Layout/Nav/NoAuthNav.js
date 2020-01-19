import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, Menu, IconButton, Button } from "@material-ui/core";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import MenuIcon from "@material-ui/icons/Menu";

const NoAuthNav = ({
  breadcrumbs,
  addBreadcrumb,
  handleClose,
  classes,
  open,
  anchorEl,
  handleMenu,
  width,
  admin
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
          <Link to="/signUp" className={classes.link}>
            <MenuItem
              onClick={() => {
                handleClose();
                addBreadcrumb({
                  name: "Sign Up",
                  url: "/signUp"
                });
              }}
            >
              Sign Up
            </MenuItem>
          </Link>
          <Link to="/signIn" className={classes.link}>
            <MenuItem
              onClick={() => {
                handleClose();
                addBreadcrumb({
                  name: "Sign In",
                  url: "/signIn"
                });
              }}
            >
              Sign In
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
        <Link to="/signup" className={classes.link}>
          <Button
            size="large"
            className={classes.navLinkDesktop}
            onClick={() => {
              addBreadcrumb({
                name: "Sign Up",
                url: "/signup"
              });
            }}
          >
            Sign Up
          </Button>
        </Link>
        <Link to="/signin" className={classes.link}>
          <Button
            size="large"
            className={classes.navLinkDesktop}
            onClick={() => {
              addBreadcrumb({
                name: "Sign In",
                url: "/signin"
              });
            }}
          >
            Sign In
          </Button>
        </Link>
      </div>
    );
  }
};

export default withWidth()(NoAuthNav);

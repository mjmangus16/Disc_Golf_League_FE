import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, Menu } from "@material-ui/core";

const NoAuthNav = ({
  breadcrumbs,
  addBreadcrumb,
  handleClose,
  classes,
  open,
  anchorEl
}) => {
  return (
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
            addBreadcrumb(breadcrumbs, {
              name: "Home",
              url: "/"
            });
          }}
        >
          Home
        </MenuItem>
      </Link>
      <Link to="/signup" className={classes.link}>
        <MenuItem
          onClick={() => {
            handleClose();
            addBreadcrumb(breadcrumbs, {
              name: "Sign Up",
              url: "/signup"
            });
          }}
        >
          Sign Up
        </MenuItem>
      </Link>
      <Link to="/signin" className={classes.link}>
        <MenuItem
          onClick={() => {
            handleClose();
            addBreadcrumb(breadcrumbs, {
              name: "Sign In",
              url: "/signin"
            });
          }}
        >
          Sign In
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default NoAuthNav;

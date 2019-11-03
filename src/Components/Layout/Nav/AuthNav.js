import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, Menu } from "@material-ui/core";
import { logoutUser } from "../../../Redux/actions/authActions";

const AuthNav = ({
  breadcrumbs,
  addBreadcrumb,
  handleClose,
  classes,
  open,
  anchorEl,
  logout
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
      <Link to="/profile" className={classes.link}>
        <MenuItem
          onClick={() => {
            handleClose();
            addBreadcrumb(breadcrumbs, {
              name: "Profile",
              url: "/"
            });
          }}
        >
          Profile
        </MenuItem>
      </Link>
      <Link to="/" className={classes.link}>
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
            addBreadcrumb(breadcrumbs, {
              name: "Home",
              url: "/"
            });
          }}
        >
          Logout
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default AuthNav;

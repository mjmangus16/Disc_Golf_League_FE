import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { logoutUser } from "../../Redux/actions/authActions";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import MenuIcon from "@material-ui/icons/Menu";
import NoAuthNav from "./Nav/NoAuthNav";
import AuthNav from "./Nav/AuthNav";

import { useStyles } from "./AppBarStyles";

const AppBar_ = ({
  breadcrumbs,
  addBreadcrumb,
  isAuthenticated,
  admin,
  logoutUser,
  width
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayMenu = width => {
    if (isWidthDown("sm", width)) {
      return (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          {!isAuthenticated ? (
            <NoAuthNav
              breadcrumbs={breadcrumbs}
              addBreadcrumb={addBreadcrumb}
              handleClose={handleClose}
              classes={classes}
              open={open}
              anchorEl={anchorEl}
            />
          ) : (
            <AuthNav
              breadcrumbs={breadcrumbs}
              addBreadcrumb={addBreadcrumb}
              handleClose={handleClose}
              classes={classes}
              open={open}
              anchorEl={anchorEl}
              logout={logoutUser}
              admin={admin}
            />
          )}
        </div>
      );
    } else {
      return (
        <div>
          {isAuthenticated ? (
            <div>
              <Button size="large" className={classes.navLinkDesktop} href="/">
                Home
              </Button>
              <Button
                size="large"
                className={classes.navLinkDesktop}
                href="/profile"
              >
                Profile
              </Button>
              <Button
                size="large"
                className={classes.navLinkDesktop}
                href="/createLeague"
              >
                Create League
              </Button>
              <Button
                size="large"
                className={classes.navLinkDesktop}
                onClick={logoutUser}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button size="large" className={classes.navLinkDesktop} href="/">
                Home
              </Button>
              <Button
                size="large"
                className={classes.navLinkDesktop}
                href="/signup"
              >
                Sign Up
              </Button>
              <Button
                size="large"
                className={classes.navLinkDesktop}
                href="/signin"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Disc Golf Leagues
          </Typography>
          {displayMenu(width)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppBar_.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin
});

export default connect(mapStateToProps, { addBreadcrumb, logoutUser })(
  withWidth()(AppBar_)
);

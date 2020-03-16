import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { logoutUser } from "../../Redux/actions/authActions";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

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
    return (
      <div>
        {!isAuthenticated ? (
          <NoAuthNav
            breadcrumbs={breadcrumbs}
            addBreadcrumb={addBreadcrumb}
            handleClose={handleClose}
            classes={classes}
            open={open}
            anchorEl={anchorEl}
            handleMenu={handleMenu}
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
            handleMenu={handleMenu}
          />
        )}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          style={{
            maxWidth: 1000,
            width: "95%",
            margin: "auto",
            padding: "0px 0px 0px 16px"
          }}
        >
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
  isAuthenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin
});

export default connect(mapStateToProps, { addBreadcrumb, logoutUser })(AppBar_);

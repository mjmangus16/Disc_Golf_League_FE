import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { logoutUser } from "../../Redux/actions/authActions";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NoAuthNav from "./Nav/NoAuthNav";
import AuthNav from "./Nav/AuthNav";

import { useStyles } from "./AppBarStyles";

const AppBar_ = ({
  breadcrumbs,
  addBreadcrumb,
  isAuthenticated,
  logoutUser
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Disc Golf Leagues
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
              />
            )}
          </div>
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addBreadcrumb, logoutUser }
)(AppBar_);

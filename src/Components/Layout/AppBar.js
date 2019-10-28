import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/actions";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { useStyles } from "./AppBarStyles";

const AppBar_ = ({ breadcrumbs, addBreadcrumb }) => {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
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
          {!auth ? (
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
            </div>
          ) : (
            <Button>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppBar_.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs
});

export default connect(
  mapStateToProps,
  { addBreadcrumb }
)(AppBar_);

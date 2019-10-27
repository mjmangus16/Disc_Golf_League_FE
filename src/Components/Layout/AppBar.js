import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export default () => {
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
                  <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                </Link>
                <Link to="/signin" className={classes.link}>
                  <MenuItem onClick={handleClose}>Sign In</MenuItem>
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

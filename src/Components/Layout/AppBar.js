import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { useStyles } from "./AppBarStyles";

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Disc Golf Leagues
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Grid, IconButton, Icon } from "@material-ui/core";
import useStyles from "./HeaderStyles";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import EditIcon from "@material-ui/icons/Edit";

const LeagueHeader = ({ league, handler, admin, width, user_id }) => {
  const classes = useStyles();

  const displayEdit = width => {
    if (admin && league.owner_id === user_id) {
      if (isWidthDown("sm", width)) {
        return (
          <Link
            to={`/league/${league.league_id}/editLeague`}
            className={classes.link}
          >
            <IconButton color="secondary" size="medium">
              <EditIcon />
            </IconButton>
          </Link>
        );
      } else {
        return (
          <Link
            to={`/league/${league.league_id}/editLeague`}
            className={classes.link}
          >
            <Button variant="contained" color="secondary" size="small">
              Edit
            </Button>
          </Link>
        );
      }
    }
  };

  return (
    <div style={{ borderBottom: "1px solid lightgrey" }}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant="h5" className={classes.leagueName}>
            {league.name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {displayEdit(width)}
        </Grid>
      </Grid>

      <div className={classes.headerContainer}>
        <Grid container>
          <Grid item xs={12} sm={6} className={classes.headerSection}>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typo}
            >
              <span className={classes.spanStyle}>Type:</span> {league.type}
            </Typography>

            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typo}
            >
              <span className={classes.spanStyle}>Location:</span>{" "}
              {league.location}
            </Typography>

            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typo}
            >
              <span className={classes.spanStyle}>Days:</span> {league.days}
            </Typography>

            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typo}
            >
              <span className={classes.spanStyle}>Length:</span>{" "}
              {league["length"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.headerSection}>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typo}
            >
              <span className={classes.spanStyle}>Description:</span>{" "}
              {league.description}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Typography
        variant="subtitle1"
        align="left"
        className={classes.typo}
        style={{ padding: 10 }}
      >
        <span className={classes.spanStyle}>Contact:</span> {league.contact}
      </Typography>
      {league.additional && (
        <Typography
          variant="subtitle1"
          align="left"
          className={classes.typo}
          style={{ padding: 10 }}
        >
          <span className={classes.spanStyle}>Additional Info:</span>{" "}
          {league.additional}
        </Typography>
      )}
    </div>
  );
};

export default withWidth()(LeagueHeader);

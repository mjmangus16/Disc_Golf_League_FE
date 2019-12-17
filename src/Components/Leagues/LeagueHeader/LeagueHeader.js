import React, { useState, useEffect } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import useStyles from "../LeagueStyles";

const LeagueHeader = ({ league, handler, admin }) => {
  const classes = useStyles();

  return (
    <div style={{ borderBottom: "1px solid lightgrey" }}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Typography variant="h5" gutterBottom>
            {league.name}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {admin && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handler(true)}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>

      <div className={classes.headerContainer}>
        <Grid container>
          <Grid item xs={6} className={classes.headerSection}>
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
          <Grid item xs={6} className={classes.headerSection}>
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

export default LeagueHeader;

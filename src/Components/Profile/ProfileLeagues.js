import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getManagerLeagues,
  getUserLeagues
} from "../../Redux/actions/leaguesActions";

import LeagueCard from "../Leagues/LeagueCard";

import useStyles from "./ProfileStyles";

const ProfileLeagues = ({
  getManagerLeagues,
  getUserLeagues,
  getManagerLeaguesLoading,
  getUserLeaguesLoading,
  leagues,
  admin
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (admin) {
      getManagerLeagues();
    } else {
      getUserLeagues();
    }
  }, []);

  return (
    <div className={classes.profileLeaguesContainer}>
      <Paper elevation={0} style={{ borderBottom: "1px solid lightgrey" }}>
        <div className={classes.headingContainer}>
          <Typography variant="h6">My Leagues</Typography>
        </div>
        <Grid container className={classes.headerContainer}>
          <Grid item xs={4}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Type</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Location</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Days</Typography>
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.gridContainer}>
        {getManagerLeaguesLoading || getUserLeaguesLoading ? (
          <CircularProgress size={32} className={classes.buttonProgress} />
        ) : leagues.length > 0 ? (
          <Grid container spacing={2}>
            {leagues.map(league => (
              <LeagueCard
                league={league}
                key={`league9231${league.league_id}`}
              />
            ))}
          </Grid>
        ) : (
          <div className={classes.noLeagues}>
            <Typography variant="body1">
              You have no leagues to display.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileLeagues.propTypes = {
  getManagerLeaguesLoading: PropTypes.bool.isRequired,
  getManagerLeaguesFailed: PropTypes.object.isRequired,
  getUserLeaguesLoading: PropTypes.bool.isRequired,
  getUserLeaguesFailed: PropTypes.object.isRequired,
  leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  admin: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  getManagerLeaguesLoading: state.leagues.getManagerLeaguesLoading,
  getManagerLeaguesFailed: state.leagues.getManagerLeaguesFailed,
  getUserLeaguesLoading: state.leagues.getUserLeaguesLoading,
  getUserLeaguesFailed: state.leagues.getUserLeaguesFailed,
  leagues: state.leagues.leagues,
  admin: state.auth.admin
});

export default connect(mapStateToProps, {
  getManagerLeagues,
  getUserLeagues
})(ProfileLeagues);

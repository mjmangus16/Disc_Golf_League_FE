import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getManagerLeagues } from "../../Redux/actions/leaguesActions";

import LeagueCard from "../Leagues/LeagueCard";

import useStyles from "./ProfileStyles";

const ProfileLeagues = ({
  getManagerLeagues,
  getManagerLeaguesLoading,
  leagues
}) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getManagerLeagues();
  }, []);

  // let leaguesDisplay;
  // console.log(leagues);

  // if (leagues.length > 0) {
  //   leaguesDisplay = (

  //   );
  // } else {
  //   leaguesDisplay =
  // }

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
        {getManagerLeaguesLoading ? (
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
              You have no leagues to display. Once you create a league, it will
              show up here.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileLeagues.propTypes = {};

const mapStateToProps = state => ({
  getManagerLeaguesLoading: state.leagues.getManagerLeaguesLoading,
  getManagerLeaguesFailed: state.leagues.getManagerLeaguesFailed,
  leagues: state.leagues.leagues
});

export default connect(mapStateToProps, {
  getManagerLeagues
})(ProfileLeagues);

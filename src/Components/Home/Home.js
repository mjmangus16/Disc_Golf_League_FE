import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllLeagues } from "../../Redux/actions/leaguesActions";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

import LeagueCard from "./LeagueCard";

import useStyles from "../Leagues/LeagueStyles";

const Home = ({ getAllLeagues, allLeagues, loading, failed }) => {
  const classes = useStyles();
  useEffect(() => {
    getAllLeagues();
  }, []);

  const displayData = (loading, failed, allLeagues) => {
    if (loading) {
      return (
        <Grid item xs={12}>
          <CircularProgress size={50} className={classes.loadingCircle} />
        </Grid>
      );
    } else if (failed.error) {
      return (
        <Grid item xs={12}>
          <Typography>{failed.error}</Typography>
        </Grid>
      );
    } else {
      return allLeagues.map((league, index) => (
        <LeagueCard
          key={league.name + index + league.league_id}
          league={league}
        />
      ));
    }
  };

  return (
    <div>
      <Typography variant="h5">All Available Leagues</Typography>
      <Grid container spacing={4} style={{ width: "75%", margin: "auto" }}>
        {displayData(loading, failed, allLeagues)}
      </Grid>
    </div>
  );
};

Home.propTypes = {};

const mapStateToProps = state => ({
  allLeagues: state.leagues.allLeagues,
  loading: state.leagues.getAllLeaguesLoading,
  failed: state.leagues.getAllLeaguesFailed
});

export default connect(mapStateToProps, {
  getAllLeagues
})(Home);

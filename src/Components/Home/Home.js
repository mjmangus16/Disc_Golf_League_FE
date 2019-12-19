import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllLeagues } from "../../Redux/actions/leaguesActions";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

import LeagueCard from "./LeagueCard";

const Home = ({ getAllLeagues, allLeagues }) => {
  useEffect(() => {
    getAllLeagues();
  }, []);
  return (
    <div>
      <Typography variant="h5">All Available Leagues</Typography>
      <Grid container spacing={4} style={{ width: "75%", margin: "auto" }}>
        {allLeagues.length > 0 &&
          allLeagues.map(league => <LeagueCard league={league} />)}
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

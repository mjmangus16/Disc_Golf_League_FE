import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllLeagues } from "../../Redux/actions/leaguesActions";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

import LeagueCard from "./LeagueCard";
import useStyles from "./HomeStyles";

const Home = ({ getAllLeagues, allLeagues, loading, failed, width }) => {
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
    <div style={{ marginBottom: 15 }}>
      <Typography variant="h5" className={classes.pageHeading}>
        All Available Leagues
      </Typography>
      <Grid
        container
        spacing={isWidthDown("sm", width) ? 1 : 4}
        className={classes.gridContainer}
      >
        {displayData(loading, failed, allLeagues)}
      </Grid>
    </div>
  );
};

Home.propTypes = {
  allLeagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  failed: PropTypes.object.isRequired,
  getAllLeagues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allLeagues: state.leagues.allLeagues,
  loading: state.leagues.getAllLeaguesLoading,
  failed: state.leagues.getAllLeaguesFailed
});

export default connect(mapStateToProps, {
  getAllLeagues
})(withWidth()(Home));

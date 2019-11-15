import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { getLeagueById } from "../../Redux/actions/leaguesActions";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";

import useStyles from "./LeagueStyles";

const League = ({
  match,
  getLeagueById,
  getLeagueByIdLoading,
  getLeagueByIdFailed,
  selectedLeague
}) => {
  const classes = useStyles();

  useEffect(() => {
    getLeagueById();
  }, []);

  return (
    <div>
      {getLeagueByIdLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          <Typography variant="h5">MY LEAGUE</Typography>
        </div>
      )}
    </div>
  );
};

League.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  getLeagueByIdLoading: state.leagues.getLeagueByIdLoading,
  getLeagueByIdFailed: state.leagues.getLeagueByIdFailed,
  selectedLeague: state.leagues.selectedLeague
});

export default connect(mapStateToProps, { getLeagueById })(League);

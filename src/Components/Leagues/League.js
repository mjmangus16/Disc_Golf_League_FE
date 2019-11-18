import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { getLeagueById } from "../../Redux/actions/leaguesActions";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";

import LeagueHeader from "./LeagueHeader";
import LeagueTabs from "./leagueTabs/LeagueTabs";
import LeaguePanels from "./leagueTabs/LeaguePanels";

import useStyles from "./LeagueStyles";

const League = ({
  match,
  getLeagueById,
  getLeagueByIdLoading,
  getLeagueByIdFailed,
  selectedLeague
}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    getLeagueById(match.params.league_id);
  }, []);
  console.log(selectedLeague);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div style={{ maxWidth: 750, margin: "auto" }}>
      {getLeagueByIdLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          <LeagueHeader league={selectedLeague} />
          <LeagueTabs handleChange={handleTabChange} value={tabValue} />
          <LeaguePanels
            tabValue={tabValue}
            schedule={selectedLeague.schedule}
            roster={selectedLeague.roster}
            rounds={selectedLeague.rounds}
          />
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

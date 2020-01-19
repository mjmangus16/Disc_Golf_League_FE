import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllLeagues,
  getLeaguesByState,
  getLeaguesByVal
} from "../../Redux/actions/leaguesActions";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

import Search from "./Search";
import StateSelect from "./StateSelect";
import LeagueCard from "./LeagueCard";
import useStyles from "./HomeStyles";

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const Home = ({
  breadcrumbs,
  addBreadcrumb,
  getAllLeagues,
  getLeaguesByState,
  getLeaguesByVal,
  allLeagues,
  loading,
  failed,
  width
}) => {
  const classes = useStyles();
  const [selectedState, setSelectedState] = useState("All");
  useEffect(() => {
    getAllLeagues();
  }, []);

  const selectState = state => {
    setSelectedState(state);
    getLeaguesByState(state);
  };

  const searchByVal = (input, searchType) => {
    getLeaguesByVal(selectedState, searchType, input);
  };

  const selectAll = () => {
    setSelectedState("All");
    getAllLeagues();
  };

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
    <div className={classes.homeContainer}>
      <div className={classes.stateSelectContainer}>
        <StateSelect
          states={states}
          selected={selectedState}
          allLeaguesHandler={selectAll}
          byStateHandler={selectState}
        />
      </div>
      <Search searchHandler={searchByVal} selected={selectedState} />
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
  getAllLeagues: PropTypes.func.isRequired,
  getLeaguesByVal: PropTypes.func.isRequired,
  getLeaguesByState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  allLeagues: state.leagues.allLeagues,
  loading: state.leagues.getAllLeaguesLoading,
  failed: state.leagues.getAllLeaguesFailed
});

export default connect(mapStateToProps, {
  getAllLeagues,
  getLeaguesByState,
  getLeaguesByVal,
  addBreadcrumb
})(withWidth()(Home));

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import {
  getLeagueById,
  editLeague,
  clearLeagueData
} from "../../Redux/actions/leaguesActions";
import {
  getRoundsByLeagueId,
  clearRoundsData
} from "../../Redux/actions/roundsActions";
import {
  getScheduleByLeagueId,
  clearScheduleData
} from "../../Redux/actions/scheduleActions";
import {
  getMembersByLeagueId,
  clearMembersData
} from "../../Redux/actions/membersActions";
import {
  getStandingsResults,
  getStandingsFormats,
  clearStandingsResults
} from "../../Redux/actions/standingsActions";
import { CircularProgress } from "@material-ui/core";

import LeagueHeader from "./LeagueHeader/LeagueHeader";
import LeagueTabs from "./LeagueTabs/LeagueTabs";
import LeaguePanels from "./LeagueTabs/LeaguePanels";

import useStyles from "./LeagueStyles";

const League = ({
  match,
  history,
  getLeagueById,
  clearLeagueData,
  getLeagueByIdLoading,
  selectedLeague,
  getRoundsByLeagueId,
  clearRoundsData,
  getScheduleByLeagueId,
  clearScheduleData,
  getMembersByLeagueId,
  clearMembersData,
  getStandingsResults,
  getStandingsFormats,
  clearStandingsResults,
  admin,
  user_id
}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const league_id = match.params.league_id;
    getLeagueById(league_id);
    getRoundsByLeagueId(league_id);
    getScheduleByLeagueId(league_id);
    getMembersByLeagueId(league_id);
    getStandingsResults(league_id);
    getStandingsFormats();

    return () => {
      clearScheduleData();
      clearLeagueData();
      clearMembersData();
      clearRoundsData();
      clearStandingsResults();
    };
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      {getLeagueByIdLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          <LeagueHeader
            league={selectedLeague}
            admin={admin}
            user_id={user_id}
          />

          <LeagueTabs handleChange={handleTabChange} value={tabValue} />
          <LeaguePanels tabValue={tabValue} history={history} />
        </div>
      )}
    </div>
  );
};

League.propTypes = {
  getLeagueByIdLoading: PropTypes.bool.isRequired,
  getLeagueByIdFailed: PropTypes.object.isRequired,
  selectedLeague: PropTypes.object.isRequired,
  editLeagueFailed: PropTypes.object.isRequired,
  editLeagueLoading: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  user_id: PropTypes.number.isRequired,
  getLeagueById: PropTypes.func.isRequired,
  clearLeagueData: PropTypes.func.isRequired,
  getRoundsByLeagueId: PropTypes.func.isRequired,
  clearRoundsData: PropTypes.func.isRequired,
  getScheduleByLeagueId: PropTypes.func.isRequired,
  clearScheduleData: PropTypes.func.isRequired,
  getMembersByLeagueId: PropTypes.func.isRequired,
  clearMembersData: PropTypes.func.isRequired,
  editLeague: PropTypes.func.isRequired,
  user_id: PropTypes.number,
  owner_id: PropTypes.number
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  getLeagueByIdLoading: state.leagues.getLeagueByIdLoading,
  getLeagueByIdFailed: state.leagues.getLeagueByIdFailed,
  selectedLeague: state.leagues.selectedLeague,
  editLeagueFailed: state.leagues.editLeagueFailed,
  editLeagueLoading: state.leagues.editLeagueLoading,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id
});

export default connect(mapStateToProps, {
  getLeagueById,
  clearLeagueData,
  getRoundsByLeagueId,
  clearRoundsData,
  getScheduleByLeagueId,
  clearScheduleData,
  getMembersByLeagueId,
  clearMembersData,
  getStandingsResults,
  getStandingsFormats,
  clearStandingsResults,
  editLeague
})(League);

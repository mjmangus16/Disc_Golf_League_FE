import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import {
  getLeagueById,
  getMembersByLeagueId,
  getRoundsByLeagueId,
  editLeague
} from "../../Redux/actions/leaguesActions";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";

import LeagueHeaderContainer from "./LeagueHeader/LeagueHeaderContainer";
import LeagueTabs from "./LeagueTabs/LeagueTabs";
import LeaguePanels from "./LeagueTabs/LeaguePanels";

import useStyles from "./LeagueStyles";

const League = ({
  match,
  getLeagueById,
  getLeagueByIdLoading,
  getLeagueByIdFailed,
  selectedLeague,
  getMembersByLeagueId,
  selectedLeagueMembers,
  selectedLeagueMembersLoading,
  selectedLeagueMembersFailed,
  selectedLeagueRounds,
  selectedLeagueRoundsLoading,
  selectedLeagueRoundsFailed,
  getRoundsByLeagueId,
  editLeague,
  editLeagueLoading,
  editLeagueFailed
}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getLeagueById(match.params.league_id);
    getMembersByLeagueId(match.params.league_id);
    getRoundsByLeagueId(match.params.league_id);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div style={{ maxWidth: 750, margin: "auto" }}>
      {getLeagueByIdLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          <LeagueHeaderContainer
            league={selectedLeague}
            edit={edit}
            setEdit={setEdit}
            editLeague={editLeague}
            editLeagueFailed={editLeagueFailed}
            editLeagueLoading={editLeagueLoading}
          />

          {!edit && (
            <>
              <LeagueTabs handleChange={handleTabChange} value={tabValue} />
              <LeaguePanels
                league_id={match.params.league_id}
                tabValue={tabValue}
                schedule={selectedLeague.schedule}
                roster={selectedLeagueMembers}
                rosterLoading={selectedLeagueMembersLoading}
                rosterFailed={selectedLeagueMembersFailed}
                rounds={selectedLeagueRounds}
                roundsLoading={selectedLeagueRoundsLoading}
                roundsFailed={selectedLeagueRoundsFailed}
              />
            </>
          )}
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
  selectedLeague: state.leagues.selectedLeague,
  selectedLeagueMembers: state.leagues.selectedLeagueMembers,
  selectedLeagueMembersLoading: state.leagues.selectedLeagueMembersLoading,
  selectedLeagueMembersFailed: state.leagues.selectedLeagueMembersFailed,
  selectedLeagueRounds: state.leagues.selectedLeagueRounds,
  selectedLeagueRoundsLoading: state.leagues.selectedLeagueRoundsLoading,
  selectedLeagueRoundsFailed: state.leagues.selectedLeagueRoundsFailed,
  editLeagueFailed: state.leagues.editLeagueFailed,
  editLeagueLoading: state.leagues.editLeagueLoading
});

export default connect(mapStateToProps, {
  getLeagueById,
  getMembersByLeagueId,
  getRoundsByLeagueId,
  editLeague
})(League);

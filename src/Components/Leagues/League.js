import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { getLeagueById, editLeague } from "../../Redux/actions/leaguesActions";
import { getRoundsByLeagueId } from "../../Redux/actions/roundsActions";
import { getScheduleByLeagueId } from "../../Redux/actions/scheduleActions";
import { getMembersByLeagueId } from "../../Redux/actions/membersActions";
import { CircularProgress } from "@material-ui/core";

import LeagueHeaderContainer from "./LeagueHeader/LeagueHeaderContainer";
import LeagueTabs from "./LeagueTabs/LeagueTabs";
import LeaguePanels from "./LeagueTabs/LeaguePanels";

import useStyles from "./LeagueStyles";

const League = ({
  match,
  history,
  getLeagueById,
  getLeagueByIdLoading,
  selectedLeague,
  selectedLeagueRounds,
  selectedLeagueRoundsLoading,
  selectedLeagueRoundsFailed,
  getRoundsByLeagueId,
  getScheduleByLeagueId,
  getMembersByLeagueId,
  editLeague,
  editLeagueLoading,
  editLeagueFailed,
  admin
}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const league_id = match.params.league_id;
    getLeagueById(league_id);
    getRoundsByLeagueId(league_id);
    getScheduleByLeagueId(league_id);
    getMembersByLeagueId(league_id);
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
            admin={admin}
          />

          {!edit && (
            <>
              <LeagueTabs handleChange={handleTabChange} value={tabValue} />
              <LeaguePanels tabValue={tabValue} history={history} />
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
  selectedLeagueRounds: state.leagues.selectedLeagueRounds,
  selectedLeagueRoundsLoading: state.leagues.selectedLeagueRoundsLoading,
  selectedLeagueRoundsFailed: state.leagues.selectedLeagueRoundsFailed,
  editLeagueFailed: state.leagues.editLeagueFailed,
  editLeagueLoading: state.leagues.editLeagueLoading,
  admin: state.auth.admin
});

export default connect(mapStateToProps, {
  getLeagueById,
  getRoundsByLeagueId,
  getScheduleByLeagueId,
  getMembersByLeagueId,
  editLeague
})(League);

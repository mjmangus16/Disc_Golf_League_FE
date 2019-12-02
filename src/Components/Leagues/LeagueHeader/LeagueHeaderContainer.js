import React from "react";
import EditLeagueHeader from "./EditLeagueHeader";
import LeagueHeader from "./LeagueHeader";

const LeagueHeaderContainer = ({
  league,
  edit,
  setEdit,
  editLeague,
  editLeagueFailed,
  editLeagueLoading
}) => {
  return (
    <div>
      {!edit ? (
        <LeagueHeader league={league} handler={setEdit} />
      ) : (
        <EditLeagueHeader
          league={league}
          handler={setEdit}
          loading={editLeagueLoading}
          failed={editLeagueFailed}
          editLeague={editLeague}
        />
      )}
    </div>
  );
};

export default LeagueHeaderContainer;

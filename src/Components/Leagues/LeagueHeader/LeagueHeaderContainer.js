import React from "react";
import EditLeagueHeader from "./EditLeagueHeader";
import LeagueHeader from "./LeagueHeader";

const LeagueHeaderContainer = ({
  league,
  edit,
  setEdit,
  editLeague,
  editLeagueFailed,
  editLeagueLoading,
  admin
}) => {
  return (
    <div>
      {!edit ? (
        <LeagueHeader league={league} handler={setEdit} admin={admin} />
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

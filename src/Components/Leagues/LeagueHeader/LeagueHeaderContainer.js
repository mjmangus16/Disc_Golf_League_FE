import React, { useState, useEffect } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import useStyles from "../LeagueStyles";
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

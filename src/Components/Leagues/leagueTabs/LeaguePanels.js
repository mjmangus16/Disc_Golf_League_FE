import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";

import SchedulePanel from "../LeagueSchedule/SchedulePanel";
import RosterPanel from "../LeagueRoster/RosterPanel";
import RoundsPanel from "../LeagueRounds/RoundsPanel";

import useStyles from "../LeagueStyles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const LeaguePanels = ({
  league_id,
  tabValue,
  schedule,
  roster,
  rounds,
  rosterLoading,
  rosterFailed,
  roundsLoading,
  roundsFailed
}) => {
  const classes = useStyles();

  return (
    <div className={classes.profileLeaguesContainer}>
      <TabPanel value={tabValue} index={0}>
        <SchedulePanel schedule={schedule} league_id={league_id} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RosterPanel
          roster={roster}
          loading={rosterLoading}
          failed={rosterFailed}
          league_id={league_id}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RoundsPanel
          rounds={rounds}
          loading={roundsLoading}
          failed={roundsFailed}
          league_id={league_id}
        />
      </TabPanel>
    </div>
  );
};

export default LeaguePanels;

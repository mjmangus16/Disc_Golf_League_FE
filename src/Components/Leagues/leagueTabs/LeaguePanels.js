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
  roundsFailed,
  addMember
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: 25 }}>
      <TabPanel value={tabValue} index={0}>
        <SchedulePanel />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RosterPanel />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RoundsPanel />
      </TabPanel>
    </div>
  );
};

export default LeaguePanels;

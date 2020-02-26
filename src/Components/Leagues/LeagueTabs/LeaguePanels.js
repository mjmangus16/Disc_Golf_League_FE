import React from "react";
import { Typography, Box } from "@material-ui/core";

import SchedulePanel from "../LeagueSchedule/SchedulePanel";
import MembersPanel from "../LeagueMembers/MembersPanel";
import RoundsPanel from "../LeagueRounds/RoundsPanel";
import StandingsPanel from "../LeagueStandings/StandingsPanel";

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

const LeaguePanels = ({ tabValue, history, user_id, owner_id }) => {
  return (
    <div style={{ marginBottom: 25 }}>
      <TabPanel value={tabValue} index={0}>
        <SchedulePanel history={history} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MembersPanel history={history} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RoundsPanel history={history} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <StandingsPanel history={history} />
      </TabPanel>
    </div>
  );
};

export default LeaguePanels;

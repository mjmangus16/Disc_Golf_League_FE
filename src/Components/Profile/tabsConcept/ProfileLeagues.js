import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";

import ProfileTabs from "./ProfileTabs";

import useStyles from "../ProfileStyles";

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

const ProfileLeagues = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.profileLeaguesContainer}>
      <ProfileTabs value={tabValue} handleChange={handleTabChange} />
      <TabPanel value={tabValue} index={0}>
        <table>
          <tbody>
            <tr>
              <th>HELLO</th>
            </tr>
          </tbody>
        </table>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};

export default ProfileLeagues;

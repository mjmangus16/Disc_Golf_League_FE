import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
import useStyles from "./ProfileStyles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const ProfileTabs = ({ handleChange, value }) => {
  const classes = useStyles();

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        centered
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
      >
        <Tab
          label="Participant"
          {...a11yProps(0)}
          style={{ borderBottom: "2px solid lightgrey" }}
        />
        <Tab
          label="Owner"
          {...a11yProps(1)}
          style={{ borderBottom: "2px solid lightgrey" }}
        />
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

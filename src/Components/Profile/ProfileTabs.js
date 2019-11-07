import React from "react";
import { Tabs, Tab } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const ProfileTabs = ({ handleChange, value }) => {
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
          label="Member"
          {...a11yProps(0)}
          style={{ borderBottom: "2px solid lightgrey" }}
        />
        <Tab
          label="Manager"
          {...a11yProps(1)}
          style={{ borderBottom: "2px solid lightgrey" }}
        />
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

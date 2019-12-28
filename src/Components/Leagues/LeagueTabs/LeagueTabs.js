import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tab: {
    borderBottom: "2px solid lightgrey",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem"
    }
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const LeagueTabs = ({ handleChange, value }) => {
  const classes = useStyles();
  return (
    <div style={{ marginTop: 25 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        centered
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
      >
        <Tab label="Schedule" {...a11yProps(0)} className={classes.tab} />
        <Tab label="Members" {...a11yProps(1)} className={classes.tab} />
        <Tab label="Rounds" {...a11yProps(1)} className={classes.tab} />
      </Tabs>
    </div>
  );
};

export default LeagueTabs;

import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import useStyles from "../LeagueStyles";

const RosterPanel = ({ roster, loading, failed }) => {
  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          <Button
            variant="contained"
            size="small"
            style={{
              margin: "0px auto 0px 0px"
            }}
          >
            Update Roster
          </Button>
          {roster.length > 0 ? (
            <div style={{ height: 400, overflow: "auto", marginTop: 25 }}>
              {roster.map((member, i) => (
                <div
                  style={{ textAlign: "left" }}
                  key={(member.l_name, member.f_name, i)}
                >
                  {member.l_name}, {member.f_name}
                </div>
              ))}
            </div>
          ) : failed ? (
            <Typography style={{ marginTop: 15 }}>{failed.error}</Typography>
          ) : (
            <Typography style={{ marginTop: 15 }}>
              You have not added any members to the league yet.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default RosterPanel;

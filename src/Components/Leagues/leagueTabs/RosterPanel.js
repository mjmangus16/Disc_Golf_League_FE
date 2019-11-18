import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";

const RosterPanel = ({ roster }) => {
  return (
    <div>
      {" "}
      {roster ? (
        <Typography>There is a roster</Typography>
      ) : (
        <Typography>
          You have not added any members to the league yet.
        </Typography>
      )}
    </div>
  );
};

export default RosterPanel;

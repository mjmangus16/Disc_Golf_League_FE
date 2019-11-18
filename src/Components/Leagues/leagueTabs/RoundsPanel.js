import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";

const RoundsPanel = ({ rounds }) => {
  return (
    <div>
      {rounds ? (
        <Typography>There is rounds</Typography>
      ) : (
        <Typography>You have not added any rounds yet.</Typography>
      )}
    </div>
  );
};

export default RoundsPanel;

import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import useStyles from "../LeagueStyles";

import RoundCard from "./RoundCard";

const RoundsPanel = ({ rounds, failed, loading }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <div>
      {loading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          <Button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: hover ? green[600] : green[400],
              borderColor: green[600],
              margin: "0px auto 0px 0px"
            }}
          >
            Add Round
          </Button>
          {rounds && rounds.length > 0 ? (
            <Grid
              container
              spacing={2}
              style={{ height: 400, overflow: "auto", marginTop: 25 }}
            >
              {rounds.map((round, i) => (
                <Grid
                  item
                  xs={12}
                  key={round.date + round.type + round.round_id}
                >
                  <RoundCard round={round} />
                </Grid>
              ))}
            </Grid>
          ) : failed ? (
            <Typography>{failed.error}</Typography>
          ) : (
            <Typography>
              You have not added any rounds to the league yet.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default RoundsPanel;

import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";
import useStyles from "./ProfileStyles";

const LeagueCard = ({ league }) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      key={`league9231${league.league_id}`}
      className={classes.leagueCard}
    >
      <Paper
        className={classes.paper}
        elevation={hover ? 12 : 4}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Grid container>
          <Grid item xs={4}>
            <Typography>{league.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{league.type}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{league.location}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{league.days}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LeagueCard;

import React, { useState } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./LeagueStyles";

const LeagueCard = ({ league }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  return (
    <Grid item xs={12}>
      <Link
        to={`/league/${league.league_id}`}
        style={{ textDecoration: "none" }}
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
      </Link>
    </Grid>
  );
};

export default LeagueCard;

import React, { useState } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "../Leagues/LeagueStyles";

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
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">{league.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body2"
                style={{ fontWeight: 600, textDecoration: "underline" }}
              >
                League Type
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body2"
                style={{ fontWeight: 600, textDecoration: "underline" }}
              >
                State
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body2"
                style={{ fontWeight: 600, textDecoration: "underline" }}
              >
                Zip Code
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body2"
                style={{ fontWeight: 600, textDecoration: "underline" }}
              >
                Days Played
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">{league.type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{league.state}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{league.zip}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{league.days}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};

export default LeagueCard;

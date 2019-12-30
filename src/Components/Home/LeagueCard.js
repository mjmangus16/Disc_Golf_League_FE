import React, { useState } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./HomeStyles";
import Hidden from "@material-ui/core/Hidden";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

const LeagueCard = ({ league, width }) => {
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
              <Typography variant="h6" className={classes.heading}>
                {league.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.headers}>
                League Type
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.headers}>
                Days Played
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.headers}>
                Members
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.headers}>
                State
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.columnData}>
                {league.type}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.columnData}>
                {league.days}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.columnData}>
                {league.members}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" className={classes.columnData}>
                {league.state}
              </Typography>
            </Grid>
            {/* {!handleSize && (
              <Grid item xs={3}>
                <Typography variant="body2" className={classes.columnData}>
                  {league.zip}
                </Typography>
              </Grid>
            )} */}
          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};

export default withWidth()(LeagueCard);

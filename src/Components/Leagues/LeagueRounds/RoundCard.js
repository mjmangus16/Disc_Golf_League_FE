import React, { useState } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer"
  },
  typo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem"
    }
  }
}));

const RoundCard = ({ round, league_id }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <Grid item xs={12}>
      <Link
        to={`/league/${league_id}/round/${round.round_id}/viewRound`}
        style={{ textDecoration: "none" }}
      >
        <Paper
          className={classes.paper}
          elevation={hover ? 12 : 4}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Grid container>
            <Grid item xs={3}>
              <Typography className={classes.typo}>
                Week {round.round_num}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.typo}>
                Date: {round.date}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.typo}>
                Type: {round.type}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.typo}>
                Participants: {round.participants}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};

export default RoundCard;

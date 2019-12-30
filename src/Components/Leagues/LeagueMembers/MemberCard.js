import React, { useState } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    margin: "auto",
    width: 550,
    [theme.breakpoints.down("sm")]: {
      width: "auto"
    }
  },
  typo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem"
    }
  }
}));

const RosterCard = ({ league_id, member, remove }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <Grid item xs={12}>
      <Link
        to={`/league/${league_id}/member/${member.member_id}`}
        style={{ textDecoration: "none" }}
      >
        <Paper
          className={classes.paper}
          elevation={hover ? 12 : 4}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography className={classes.typo}>
                {member.l_name}, {member.f_name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.typo}>
                Rounds: {member.rounds}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};

export default RosterCard;

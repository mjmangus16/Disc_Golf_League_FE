import React, { useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  TextField
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "../LeagueStyles";
import DeleteIcon from "@material-ui/icons/Delete";

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
          style={{ width: 550, margin: "auto" }}
        >
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography>
                {member.l_name}, {member.f_name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Rounds: {member.rounds}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};

export default RosterCard;

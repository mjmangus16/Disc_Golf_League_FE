import React from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import useStyles from "../LeagueStyles";

const Score = ({ player, handleScore, index }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        padding: 10,
        borderBottom: "1px solid lightgrey",
        maxWidth: 500,
        margin: "25px auto auto"
      }}
    >
      <Grid container alignItems="flex-end">
        <Grid item xs={6}>
          <Typography className={classes.createRoundName}>
            {player.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Score"
            name="type"
            required
            style={{ width: 65 }}
            onChange={e => handleScore(e, index)}
            InputProps={{
              classes: {
                input: classes.formTextInputScore2
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel2
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Score;

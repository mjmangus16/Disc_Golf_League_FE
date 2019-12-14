import React from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";

const Score = ({ player, handleScore, index }) => {
  console.log(player);
  return (
    <div
      style={{
        padding: 10,
        borderBottom: "1px solid lightgrey",
        width: 400,
        margin: "25px auto auto"
      }}
    >
      <Grid container alignItems="flex-end">
        <Grid item xs={6}>
          <Typography>{player.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Score"
            name="type"
            required
            style={{ width: 65 }}
            onChange={e => handleScore(e, index)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Score;

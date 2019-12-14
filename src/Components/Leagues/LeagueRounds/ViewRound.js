import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoundByRoundId } from "../../../Redux/actions/roundsActions";
import { Typography, Button, Grid } from "@material-ui/core";

const ViewRound = ({
  match,
  round,
  roundLoading,
  roundFailed,
  getRoundByRoundId
}) => {
  useEffect(() => {
    const { round_id, league_id } = match.params;

    getRoundByRoundId(league_id, round_id);
  }, []);
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {round.league}
      </Typography>
      <Grid container style={{ width: "50%", margin: "auto" }}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            Date: {round.date}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            Type: {round.type}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            Round #: {round.round_num}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

ViewRound.propTypes = {};

const mapStateToProps = state => ({
  round: state.rounds.round,
  roundLoading: state.rounds.roundLoading,
  roundFailed: state.rounds.roundFailed
});

export default connect(mapStateToProps, { getRoundByRoundId })(ViewRound);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import useStyles from "../LeagueStyles";

import RoundCard from "./RoundCard";

const RoundsPanel = ({
  league_id,
  rounds,
  roundsFailed,
  roundsLoading,
  admin
}) => {
  const classes = useStyles();

  return (
    <div>
      {roundsLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          {admin && (
            <Link
              to={`/league/${league_id}/createRound`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                size="small"
                style={{
                  margin: "0px auto 0px 0px"
                }}
              >
                Add Round
              </Button>
            </Link>
          )}

          {rounds && rounds.length > 0 ? (
            <Grid
              container
              spacing={2}
              style={{ height: 500, overflow: "auto", marginTop: 25 }}
            >
              {rounds.map((round, i) => (
                <Grid
                  item
                  xs={12}
                  key={round.date + round.type + round.round_id}
                >
                  <RoundCard round={round} league_id={league_id} />
                </Grid>
              ))}
            </Grid>
          ) : roundsFailed.error ? (
            <Typography style={{ marginTop: 15 }}>
              {roundsFailed.error}
            </Typography>
          ) : (
            <Typography style={{ marginTop: 15 }}>
              {admin
                ? "You have not added any rounds to the league yet."
                : "The league manager has not added any rounds to this league yet."}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

RoundsPanel.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  rounds: state.rounds.rounds,
  roundsLoading: state.rounds.roundsLoading,
  roundsFailed: state.rounds.roundsFailed,
  admin: state.auth.admin
});

export default connect(mapStateToProps, {})(RoundsPanel);

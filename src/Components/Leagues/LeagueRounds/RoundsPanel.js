import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  history,
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
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{
                margin: "0px auto 0px 0px"
              }}
              onClick={() => history.push(`/league/${league_id}/createRound`)}
            >
              Add Round
            </Button>
          )}
          {rounds && rounds.length > 0 ? (
            <TableContainer
              style={{
                maxWidth: 550,
                margin: "25px auto"
              }}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Round #
                    </TableCell>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Date
                    </TableCell>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Type
                    </TableCell>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Participants
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rounds.map(round => (
                    <TableRow
                      key={"roundKey" + round.round_id}
                      onClick={() =>
                        history.push(
                          `/league/${league_id}/round/${round.round_id}/viewRound`
                        )
                      }
                      className={classes.tableRow}
                    >
                      <TableCell align="center" className={classes.tableTypo}>
                        {round.round_num}
                      </TableCell>
                      <TableCell align="center" className={classes.tableTypo}>
                        {round.date}
                      </TableCell>
                      <TableCell align="center" className={classes.tableTypo}>
                        {round.type}
                      </TableCell>
                      <TableCell align="center" className={classes.tableTypo}>
                        {round.participants}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : roundsFailed.error ? (
            <Typography className={classes.missingData}>
              {roundsFailed.error}
            </Typography>
          ) : (
            <Typography className={classes.missingData}>
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

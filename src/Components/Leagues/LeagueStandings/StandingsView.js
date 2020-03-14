import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import useStyles from "../LeagueStyles";

const StandingsView = ({ rounds, standings, leagueFormat }) => {
  const classes = useStyles();

  const handlePointsPerRound = parts => {
    console.log(rounds);
    console.log(parts);
    let displayCells = [];

    for (let i = 0; i < rounds.length; i++) {
      let match = false;
      let points = "N/A";
      for (let j = 0; j < parts.length; j++) {
        if (rounds[i].round_id === parts[j].round_id) {
          match = true;
          points = parts[j].points;
        }
      }
      displayCells.unshift(
        <TableCell align="center" className={classes.tableTypoH}>
          {points}
        </TableCell>
      );
    }
    return displayCells;
  };

  return (
    <div
      style={{
        maxWidth: 750,
        margin: "auto"
      }}
    >
      <Typography variant="h6" gutterbottom style={{ marginBottom: 25 }}>
        Standings Type Name: {leagueFormat.name}
      </Typography>
      <Typography variant="body" gutterbottom>
        Description: {leagueFormat.description}
      </Typography>
      <TableContainer
        style={{
          maxWidth: 750,
          margin: "25px auto",
          overFlow: "hidden",
          scroll: "auto"
        }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableTypoH}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableTypoH}>
                Total Points
              </TableCell>
              {rounds &&
                rounds.map((r, i) => (
                  <TableCell align="center" className={classes.tableTypoH}>
                    {i + 1}
                  </TableCell>
                ))}
              <TableCell align="center" className={classes.tableTypoH}>
                Average Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.length > 0 &&
              standings.map(st => {
                let total = 0;
                st[1].forEach(p => {
                  total += p.points;
                });
                return (
                  <TableRow key={st[0]}>
                    <TableCell component="th" scope="row">
                      {st[0]}
                    </TableCell>
                    <TableCell align="center">{total}</TableCell>
                    {handlePointsPerRound(st[1])}
                    <TableCell align="center">
                      {(total / st[1].length).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

StandingsView.propTypes = {
  league_id: PropTypes.number,
  admin: PropTypes.bool.isRequired,
  owner_id: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  owner_id: PropTypes.number,
  standings: PropTypes.array,
  rounds: PropTypes.array,
  leagueFormat: PropTypes.array
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id,
  standings: state.standings.standings,
  rounds: state.rounds.rounds,
  leagueFormat: state.standings.leagueFormat
});

export default connect(mapStateToProps, {})(StandingsView);

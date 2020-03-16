import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoundsByLeagueId } from "../../../Redux/actions/roundsActions";
import {
  getStandingsResults,
  getStandingsFormatByLeagueId
} from "../../../Redux/actions/standingsActions";
import { getMembersByLeagueId } from "../../../Redux/actions/membersActions";
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import useStyles from "../LeagueStyles";

const StandingsView = ({
  rounds,
  standings,
  leagueFormat,
  getRoundsByLeagueId,
  members,
  getStandingsResults,
  getStandingsFormatByLeagueId,
  getMembersByLeagueId,
  match
}) => {
  const classes = useStyles();

  useEffect(() => {
    const league_id = match.params.league_id;
    getRoundsByLeagueId(league_id);
    getStandingsFormatByLeagueId(league_id);
    getMembersByLeagueId(league_id);
  }, []);

  useEffect(() => {
    if (members.length > 0) {
      const league_id = match.params.league_id;
      getStandingsResults(league_id, members);
    }
  }, [members]);

  const handlePointsPerRound = parts => {
    let displayCells = [];

    for (let i = 0; i < rounds.length; i++) {
      let points = "N/A";
      for (let j = 0; j < parts.length; j++) {
        if (rounds[i].round_id === parts[j].round_id) {
          points = parts[j].points;
        }
      }
      displayCells.unshift(
        <TableCell
          align="center"
          className={classes.tableTypo}
          key={"round#OfPoints" + points + i}
        >
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
      <div style={{ padding: "0px 15px" }}>
        <Typography variant="h6" className={classes.tableTypoH}>
          Standings Format:
        </Typography>
        <Typography
          variant="body1"
          className={classes.tableTypo}
          style={{ marginBottom: 25 }}
        >
          {leagueFormat.name}
        </Typography>
        <Typography variant="h6" className={classes.tableTypoH}>
          Description:
        </Typography>
        <Typography variant="body1" className={classes.tableTypo}>
          {leagueFormat.description}
        </Typography>
      </div>

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
                  <TableCell
                    align="center"
                    className={classes.tableTypoH}
                    key={"roundCell#" + i}
                  >
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
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableTypo}
                    >
                      {st[0]}
                    </TableCell>
                    <TableCell align="center" className={classes.tableTypo}>
                      {total}
                    </TableCell>
                    {handlePointsPerRound(st[1])}
                    <TableCell align="center" className={classes.tableTypo}>
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
  leagueFormat: PropTypes.object
};

const mapStateToProps = state => ({
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id,
  standings: state.standings.standings,
  rounds: state.rounds.rounds,
  leagueFormat: state.standings.leagueFormat,
  members: state.members.members
});

export default connect(mapStateToProps, {
  getRoundsByLeagueId,
  getStandingsResults,
  getStandingsFormatByLeagueId,
  getMembersByLeagueId
})(StandingsView);

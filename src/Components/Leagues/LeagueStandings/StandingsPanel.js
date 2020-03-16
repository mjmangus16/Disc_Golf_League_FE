import React from "react";
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

const StandingsPanel = ({
  league_id,
  history,
  admin,
  user_id,
  owner_id,
  standings
}) => {
  const classes = useStyles();

  const displayStandings = () => {
    return standings.map(st => {
      let total = 0;
      st[1].forEach(p => {
        total += p.points;
      });
      return (
        <TableRow key={st[0]} className={classes.tableRow}>
          <TableCell component="th" scope="row" className={classes.tableTypo}>
            {st[0]}
          </TableCell>
          <TableCell align="center" className={classes.tableTypo}>
            {total}
          </TableCell>
          <TableCell align="center" className={classes.tableTypo}>
            {(total / st[1].length).toFixed(2)}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div>
      <Grid container justify="space-around">
        {admin && user_id === owner_id && (
          <Grid item className={classes.standingsPanelButton}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => history.push(`/league/${league_id}/setStandings`)}
            >
              Set Standings Format
            </Button>
          </Grid>
        )}
        <Grid item className={classes.standingsPanelButton}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => history.push(`/league/${league_id}/viewStandings`)}
          >
            Extended Standings
          </Button>
        </Grid>
      </Grid>
      <TableContainer
        style={{
          maxWidth: 550,
          margin: "25px auto"
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableTypoH}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableTypoH}>
                Total Points
              </TableCell>
              <TableCell align="center" className={classes.tableTypoH}>
                Average Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayStandings()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

StandingsPanel.propTypes = {
  league_id: PropTypes.number,
  admin: PropTypes.bool.isRequired,
  owner_id: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  owner_id: PropTypes.number,
  standings: PropTypes.array
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id,
  standings: state.standings.standings
});

export default connect(mapStateToProps, {})(StandingsPanel);

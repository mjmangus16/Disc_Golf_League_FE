import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  sortStandingsByName,
  sortStandingsByAverage,
  sortStandingsByTotal
} from "../../../Redux/actions/standingsActions";
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
  Button,
  TableSortLabel
} from "@material-ui/core";

import useStyles from "../LeagueStyles";

const StandingsPanel = ({
  league_id,
  history,
  admin,
  user_id,
  owner_id,
  standings,
  sortStandingsByName,
  sortStandingsByAverage,
  sortStandingsByTotal,
  sortOrderName,
  sortOrderTotal,
  sortOrderAverage
}) => {
  const classes = useStyles();

  // useEffect(() => {
  //   if (standings.length > 0) sortStandingsByName(standings, sortOrderName);
  // }, [standings]);

  console.log(standings);

  const displayStandings = () => {
    return standings.map(st => {
      let total = 0;
      st[1].forEach(p => {
        total += p.points;
      });
      return (
        <TableRow key={st[0]}>
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
        {standings.length > 0 && (
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
        )}
      </Grid>
      {standings.length > 0 ? (
        <TableContainer
          style={{
            maxWidth: 550,
            margin: "25px auto"
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  className={classes.tableTypoH}
                  style={{ cursor: "pointer" }}
                  onClick={() => sortStandingsByName(standings, sortOrderName)}
                >
                  <TableSortLabel
                    active={sortOrderName !== null}
                    direction={sortOrderName ? "asc" : "desc"}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableTypoH}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    sortStandingsByTotal(standings, sortOrderTotal)
                  }
                >
                  <TableSortLabel
                    active={sortOrderTotal !== null}
                    direction={sortOrderTotal ? "asc" : "desc"}
                  >
                    Total Points
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableTypoH}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    sortStandingsByAverage(standings, sortOrderAverage)
                  }
                >
                  <TableSortLabel
                    active={sortOrderAverage !== null}
                    direction={sortOrderAverage ? "asc" : "desc"}
                  >
                    Average Points
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayStandings()}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className={classes.missingData}>
          You have not set your standings yet.
        </Typography>
      )}
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
  standings: state.standings.standings,
  sortOrderName: state.standings.sortOrderName,
  sortOrderTotal: state.standings.sortOrderTotal,
  sortOrderAverage: state.standings.sortOrderAverage
});

export default connect(mapStateToProps, {
  sortStandingsByName,
  sortStandingsByAverage,
  sortStandingsByTotal
})(StandingsPanel);

import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getManagerLeagues,
  getUserLeagues
} from "../../Redux/actions/leaguesActions";

import LeagueCard from "../Leagues/LeagueCard";

import useStyles from "./ProfileStyles";

const ProfileLeagues = ({
  getManagerLeagues,
  getUserLeagues,
  getManagerLeaguesLoading,
  getUserLeaguesLoading,
  leagues,
  admin,
  width,
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (admin) {
      getManagerLeagues();
    } else {
      getUserLeagues();
    }
  }, []);

  const displayTableHeadings = () => {
    if (isWidthDown("xs", width)) {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.tableTypoH}>
              Name
            </TableCell>

            <TableCell align="center" className={classes.tableTypoH}>
              Days
            </TableCell>
          </TableRow>
        </TableHead>
      );
    } else {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.tableTypoH}>
              Name
            </TableCell>
            <TableCell align="center" className={classes.tableTypoH}>
              Type
            </TableCell>
            <TableCell align="center" className={classes.tableTypoH}>
              Location
            </TableCell>
            <TableCell align="center" className={classes.tableTypoH}>
              Days
            </TableCell>
          </TableRow>
        </TableHead>
      );
    }
  };

  const displayLeagues = () => {
    if (isWidthDown("xs", width)) {
      return (
        <TableBody>
          {leagues.map(league => (
            <TableRow
              key={"leagueKey" + league.league_id}
              onClick={() => history.push(`/league/${league.league_id}`)}
              className={classes.tableRow}
            >
              <TableCell align="left" className={classes.tableTypo}>
                {league.name}
              </TableCell>
              <TableCell align="center" className={classes.tableTypo}>
                {league.days}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          {leagues.map(league => (
            <TableRow
              key={"leagueKey" + league.league_id}
              onClick={() => history.push(`/league/${league.league_id}`)}
              className={classes.tableRow}
            >
              <TableCell align="left" className={classes.tableTypo}>
                {league.name}
              </TableCell>
              <TableCell align="center" className={classes.tableTypo}>
                {league.type}
              </TableCell>
              <TableCell align="center" className={classes.tableTypo}>
                {league.location}
              </TableCell>
              <TableCell align="center" className={classes.tableTypo}>
                {league.days}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }
  };

  return (
    <div className={classes.profileLeaguesContainer}>
      <div className={classes.gridContainer}>
        {getManagerLeaguesLoading || getUserLeaguesLoading ? (
          <CircularProgress size={32} className={classes.buttonProgress} />
        ) : leagues.length > 0 ? (
          <TableContainer
            style={{
              maxWidth: 700,
              margin: "25px auto"
            }}
          >
            <Table className={classes.table} aria-label="simple table">
              {displayTableHeadings()}
              {displayLeagues()}
            </Table>
          </TableContainer>
        ) : (
          <div className={classes.noLeagues}>
            <Typography variant="body1">
              You have no leagues to display.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileLeagues.propTypes = {
  getManagerLeaguesLoading: PropTypes.bool.isRequired,
  getManagerLeaguesFailed: PropTypes.object.isRequired,
  getUserLeaguesLoading: PropTypes.bool.isRequired,
  getUserLeaguesFailed: PropTypes.object.isRequired,
  leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  admin: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  getManagerLeaguesLoading: state.leagues.getManagerLeaguesLoading,
  getManagerLeaguesFailed: state.leagues.getManagerLeaguesFailed,
  getUserLeaguesLoading: state.leagues.getUserLeaguesLoading,
  getUserLeaguesFailed: state.leagues.getUserLeaguesFailed,
  leagues: state.leagues.leagues,
  admin: state.auth.admin
});

export default connect(mapStateToProps, {
  getManagerLeagues,
  getUserLeagues
})(withWidth()(ProfileLeagues));

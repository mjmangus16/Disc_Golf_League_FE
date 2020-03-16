import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getStandingsFormats,
  getStandingsFormatByLeagueId,
  updateLeagueFormat,
  connectFormatToLeague,
  clearStandingsFormats,
  clearStandingsLeagueFormat
} from "../../../Redux/actions/standingsActions";
import { Grid, Typography, Button } from "@material-ui/core";

import useStyles from "../LeagueStyles";

const SetStandings = ({
  getStandingsFormats,
  getStandingsFormatByLeagueId,
  updateLeagueFormat,
  connectFormatToLeague,
  clearStandingsFormats,
  clearStandingsLeagueFormat,
  standingsFormats,
  leagueFormat,
  league_id,
  match
}) => {
  const classes = useStyles();
  useEffect(() => {
    const league_id = match.params.league_id;
    getStandingsFormats();
    getStandingsFormatByLeagueId(league_id);
    return () => {
      clearStandingsFormats();
      clearStandingsLeagueFormat();
    };
  }, []);

  const handleFormatSelection = standings_format_id => {
    if (leagueFormat.standings_format_id) {
      updateLeagueFormat(league_id, standings_format_id);
    } else {
      connectFormatToLeague(league_id, standings_format_id);
    }
  };

  const displayFormats = () => {
    return standingsFormats.map(form => {
      return (
        <Grid item xs={3} key={form.name}>
          <Button
            variant={
              leagueFormat.standings_format_id === form.standings_format_id
                ? "contained"
                : "outlined"
            }
            fullWidth
            onClick={() => handleFormatSelection(form.standings_format_id)}
            className={classes.tableTypoH}
          >
            {form.name}
          </Button>
        </Grid>
      );
    });
  };

  return (
    <div style={{ maxWidth: "960px", margin: "auto", padding: "0px 15px" }}>
      <Typography
        variant="h6"
        className={classes.tableTypoH}
        style={{ marginBottom: 25 }}
      >
        Set the format for your leagues standings.
      </Typography>
      <Typography
        color="error"
        className={classes.tableTypoH}
        style={{ marginBottom: 25 }}
      >
        ** There is currently only one format to choose from**{" "}
      </Typography>
      <Grid container justify="space-evenly">
        {displayFormats()}
      </Grid>
      <div className={classes.tableTypo} style={{ marginTop: 25 }}>
        {leagueFormat.description}
      </div>
    </div>
  );
};

SetStandings.propTypes = {
  league_id: PropTypes.number,
  admin: PropTypes.bool.isRequired,
  owner_id: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  owner_id: PropTypes.number,
  getStandingsFormats: PropTypes.func.isRequired,
  getStandingsFormatByLeagueId: PropTypes.func.isRequired,
  updateLeagueFormat: PropTypes.func.isRequired,
  clearStandingsFormats: PropTypes.func.isRequired,
  clearStandingsLeagueFormat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id,
  standingsFormats: state.standings.formats,
  leagueFormat: state.standings.leagueFormat
});

export default connect(mapStateToProps, {
  getStandingsFormats,
  getStandingsFormatByLeagueId,
  updateLeagueFormat,
  connectFormatToLeague,
  clearStandingsFormats,
  clearStandingsLeagueFormat
})(SetStandings);

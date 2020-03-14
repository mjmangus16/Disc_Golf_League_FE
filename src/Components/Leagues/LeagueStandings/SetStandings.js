import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getStandingsFormats,
  getStandingsFormatByLeagueId,
  updateLeagueFormat,
  clearStandingsFormats,
  clearStandingsLeagueFormat
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
  Button
} from "@material-ui/core";

const SetStandings = ({
  getStandingsFormats,
  getStandingsFormatByLeagueId,
  updateLeagueFormat,
  clearStandingsFormats,
  clearStandingsLeagueFormat,
  standingsFormats,
  leagueFormat,
  league_id,
  match
}) => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const league_id = match.params.league_id;
    getStandingsFormats();
    getStandingsFormatByLeagueId(league_id);
    // return () => {
    //   clearStandingsFormats();
    // };
  }, []);

  const handleFormatSelection = standings_format_id => {
    setSelectedId(standings_format_id);
    updateLeagueFormat(1, standings_format_id);
  };

  const displayFormats = () => {
    return standingsFormats.map(form => {
      return (
        <Grid item xs={3}>
          <Button
            variant={
              leagueFormat.standings_format_id === form.standings_format_id
                ? "contained"
                : "outlined"
            }
            fullWidth
            onClick={() => handleFormatSelection(form.standings_format_id)}
          >
            {form.name}
          </Button>
        </Grid>
      );
    });
  };

  return (
    <div style={{ maxWidth: "960px", margin: "auto" }}>
      <Typography variant="h6" style={{ marginBottom: 25 }}>
        Set the format for your leagues standings.
      </Typography>
      <Typography color="error" style={{ marginBottom: 25 }}>
        ** There is currently only one format to choose from**{" "}
      </Typography>
      <Grid container justify="space-evenly">
        {displayFormats()}
      </Grid>
      <div style={{ marginTop: 25 }}>{leagueFormat.description}</div>
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
  clearStandingsFormats,
  clearStandingsLeagueFormat
})(SetStandings);

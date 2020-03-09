import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getStandingsFormats,
  getStandingsFormatByLeagueId,
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
  clearStandingsFormats,
  clearStandingsLeagueFormat,
  standingsFormats,
  leagueFormat,
  match
}) => {
  const [formatInfo, setFormatInfo] = useState("TESTING");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const league_id = match.params.league_id;
    getStandingsFormats();
    getStandingsFormatByLeagueId(league_id);
    return () => {
      clearStandingsFormats();
    };
  }, []);

  useEffect(() => {
    const info = standingsFormats.filter(
      form => form.standings_format_id === selectedId
    );
    if (info.length > 0) {
      setFormatInfo(info[0].description);
      console.log(info);
    }
  }, [selectedId]);

  const displayFormats = () => {
    return standingsFormats.map(form => {
      return (
        <Grid item xs={3}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setSelectedId(form.standings_format_id)}
          >
            {form.name}
          </Button>
        </Grid>
      );
    });
  };

  return (
    <div style={{ maxWidth: "960px", margin: "auto" }}>
      <Grid container justify="space-evenly">
        {displayFormats()}
      </Grid>
      <div>{formatInfo}</div>
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
  clearStandingsFormats,
  clearStandingsLeagueFormat
})(SetStandings);

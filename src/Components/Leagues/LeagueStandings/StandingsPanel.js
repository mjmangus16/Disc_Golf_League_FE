import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
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

const useStyles = makeStyles(theme => ({}));

const StandingsPanel = ({ league_id, history, admin, user_id, owner_id }) => {
  return (
    <div>
      {admin && user_id === owner_id && (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => history.push(`/league/${league_id}/setStandings`)}
          style={{
            margin: "0px auto 0px 0px"
          }}
        >
          Set Standings Format
        </Button>
      )}
    </div>
  );
};

StandingsPanel.propTypes = {
  league_id: PropTypes.number,
  admin: PropTypes.bool.isRequired,
  owner_id: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  owner_id: PropTypes.number
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id
});

export default connect(mapStateToProps, {})(StandingsPanel);

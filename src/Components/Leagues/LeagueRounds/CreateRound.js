import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMembersByLeagueId } from "../../../Redux/actions/membersActions";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import useStyles from "../LeagueStyles";

import TransferList from "./TransferList";
import Score from "./Score";

const CreateRound = ({ getMembersByLeagueId, members, match }) => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    const { league_id } = match.params;
    getMembersByLeagueId(league_id);
  }, []);

  useEffect(() => {
    setLeft(
      members.map(m => {
        return {
          name: `${m.l_name}, ${m.f_name}`,
          member_id: m.member_id
        };
      })
    );
  }, [members]);

  return (
    <div className={classes.createRoundContainer}>
      <Typography variant="h5" gutterBottom>
        Create Round
      </Typography>

      <Grid
        container
        alignItems="center"
        style={{ width: 400, margin: "auto" }}
      >
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              style={{ width: 150 }}
              disableToolbar
              format="MM/DD/YYYY"
              margin="dense"
              id="date-picker-inline"
              label="Date"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Round Type" margin="dense" name="type" required />
        </Grid>
      </Grid>
      {!toggle ? (
        <div>
          <TransferList
            members={members}
            left={left}
            setLeft={setLeft}
            right={right}
            setRight={setRight}
          />
          <div style={{ padding: 15 }}>
            <Typography gutterBottom variant="body2">
              Once the round date, type and participants are submitted, you can
              input scores.
            </Typography>
            <Button
              fullWidth
              size="small"
              variant="contained"
              style={{ marginTop: 10 }}
              onClick={() => setToggle(right.length > 0 ? true : false)}
            >
              Submit Round
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {right.map(p => (
            <Score player={p} />
          ))}
        </div>
      )}
    </div>
  );
};

CreateRound.propTypes = {};

const mapStateToProps = state => ({
  members: state.members.members
});

export default connect(mapStateToProps, { getMembersByLeagueId })(CreateRound);

import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMembersByLeagueId } from "../../../Redux/actions/membersActions";
import { addRoundAndParticipants } from "../../../Redux/actions/roundsActions";
import { getLeagueById } from "../../../Redux/actions/leaguesActions";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import useStyles from "../LeagueStyles";

import TransferList from "./TransferList";
import Score from "./Score";

const types = [
  "None",
  "Singles",
  "Doubles",
  "Singles Travel",
  "Doubles Travel",
  "Putting",
  "Other"
];

const CreateRound = ({
  getMembersByLeagueId,
  addRoundAndParticipants,
  getLeagueById,
  leagueType,
  members,
  match,
  history
}) => {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const [toggle, setToggle] = useState(false);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("None");

  useEffect(() => {
    const { league_id } = match.params;
    getLeagueById(league_id);
    getMembersByLeagueId(league_id);
  }, []);

  useEffect(() => {
    if (leagueType) {
      setType(leagueType);
    }
  }, [leagueType]);

  useEffect(() => {
    setLeft(
      members.map(m => {
        return {
          name: `${m.l_name}, ${m.f_name}`,
          member_id: m.member_id,
          score: ""
        };
      })
    );
  }, [members]);

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const handleScore = (e, index) => {
    let container = [...right];
    container[index] = { ...container[index], score: e.target.value };
    setRight(container);
  };

  const submitRound = () => {
    const { league_id } = match.params;
    const round = {
      league_id,
      date: moment(date).format("MM/DD/YYYY"),
      type
    };

    const participants = right.map(x => {
      return { ...x, league_id: league_id };
    });

    let completed = true;
    const redirect = () => history.push(`/league/${league_id}`);
    participants.forEach(p => {
      if (p.score == "") {
        completed = false;
      }
    });

    if (completed) {
      addRoundAndParticipants(league_id, round, participants, redirect);
    }
  };

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
              variant="inline"
              format="MM/DD/YYYY"
              margin="dense"
              id="date-picker-inline"
              label="Date"
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <FormControl margin="dense" fullWidth required style={{ width: 150 }}>
            <InputLabel id="demo-simple-select-outlined-label" ref={inputLabel}>
              Round Type
            </InputLabel>
            <Select
              labelWidth={labelWidth}
              value={type}
              name="type"
              onChange={e => setType(e.target.value)}
            >
              {types.map(ty => (
                <MenuItem value={ty} key={`typeKey${ty}`}>
                  {ty}
                </MenuItem>
              ))}
            </Select>
            {/* {createNewLeagueFailed.state && (
              <FormHelperText>{createNewLeagueFailed.state}</FormHelperText>
            )} */}
          </FormControl>
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
              Enter Scores
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {right.map((p, i) => (
            <Score
              key={p.name + i}
              player={p}
              index={i}
              handleScore={handleScore}
            />
          ))}
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                style={{ marginTop: 10 }}
                onClick={() => setToggle(false)}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                style={{ marginTop: 10 }}
                onClick={submitRound}
              >
                Submit Round
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

CreateRound.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  leagueType: PropTypes.string,
  getMembersByLeagueId: PropTypes.func.isRequired,
  addRoundAndParticipants: PropTypes.func.isRequired,
  getLeagueById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.members.members,
  leagueType: state.leagues.selectedLeague.type
});

export default connect(mapStateToProps, {
  getMembersByLeagueId,
  addRoundAndParticipants,
  getLeagueById
})(CreateRound);

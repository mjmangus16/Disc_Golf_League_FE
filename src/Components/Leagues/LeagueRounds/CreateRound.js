import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMembersByLeagueId } from "../../../Redux/actions/membersActions";
import { addRoundAndParticipants } from "../../../Redux/actions/roundsActions";
import { getLeagueById } from "../../../Redux/actions/leaguesActions";
import { initBreadcrumb } from "../../../Redux/actions/breadcrumbActions";
import { Typography, Grid, Button } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import useStyles from "../LeagueStyles";
import { green } from "@material-ui/core/colors";

import TransferList from "./TransferList";
import Score from "./Score";

const CreateRound = ({
  getMembersByLeagueId,
  addRoundAndParticipants,
  getLeagueById,
  members,
  match,
  history,
  initBreadcrumb
}) => {
  const classes = useStyles();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [date, setDate] = useState(new Date());
  const [scoresError, setScoresError] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    const { league_id } = match.params;
    getLeagueById(league_id);
    getMembersByLeagueId(league_id);
    initBreadcrumb(league_id);

    window.scrollTo(0, 0);
  }, []);

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
    if (!date) {
      setDateError("Date field is required");
    } else {
      setDateError(null);
      const { league_id } = match.params;
      const round = {
        league_id,
        date: moment(date).format("MM/DD/YYYY")
      };

      const participants = right.map(x => {
        return { ...x, league_id: league_id };
      });

      let completed = true;
      const redirect = () => history.push(`/league/${league_id}`);
      participants.forEach(p => {
        if (p.score == "" || p.score.length > 3) {
          completed = false;
        }
      });

      if (completed) {
        addRoundAndParticipants(league_id, round, participants, redirect);
        setScoresError(null);
      } else {
        setScoresError(
          "Every Score Field is required and must be less than 4 digits long"
        );
      }
    }
  };

  return (
    <div className={classes.createRoundContainer}>
      <Typography
        variant="h5"
        gutterBottom
        className={classes.leagueNameHeading}
      >
        Create Round
      </Typography>
      <Grid
        container
        alignItems="center"
        style={{ maxWidth: 350, margin: "auto" }}
      >
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              error={dateError ? true : false}
              helperText={dateError && dateError}
              style={{ width: 125, padding: 0 }}
              disableToolbar
              variant="inline"
              format="MM/DD/YY"
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
        {/* <Grid item xs={6}>
          <FormControl margin="dense" fullWidth required style={{ width: 125 }}>
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
            {addRoundFailed.type && (
              <FormHelperText>{addRoundFailed.type}</FormHelperText>
            )}
          </FormControl>
        </Grid> */}
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
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              fullWidth
              size="small"
              variant="contained"
              style={{
                backgroundColor: hover2 ? green[600] : green[400],
                borderColor: green[600],
                marginTop: 10
              }}
              onClick={() => setToggle(right.length > 0 ? true : false)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {scoresError && (
            <Typography variant="body2" color="error" style={{ padding: 10 }}>
              {scoresError}
            </Typography>
          )}

          {right.map((p, i) => (
            <Score
              key={p.name + i}
              player={p}
              index={i}
              handleScore={handleScore}
            />
          ))}
          <Grid container style={{ maxWidth: 500, margin: "25px auto" }}>
            <Grid item xs={5} style={{ margin: "auto" }}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                style={{}}
                onClick={() => setToggle(false)}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={5} style={{ margin: "auto" }}>
              <Button
                onMouseEnter={() => setHover1(true)}
                onMouseLeave={() => setHover1(false)}
                fullWidth
                size="small"
                variant="contained"
                style={{
                  backgroundColor: hover1 ? green[600] : green[400],
                  borderColor: green[600]
                }}
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
  getLeagueById: PropTypes.func.isRequired,
  addRoundFailed: PropTypes.object.isRequired,
  addParticipantFailed: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  members: state.members.members,
  leagueType: state.leagues.selectedLeague.type,
  addRoundFailed: state.rounds.addRoundFailed,
  addParticipantFailed: state.rounds.addParticipantFailed
});

export default connect(mapStateToProps, {
  getMembersByLeagueId,
  addRoundAndParticipants,
  getLeagueById,
  initBreadcrumb
})(CreateRound);

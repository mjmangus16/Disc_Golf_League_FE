import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRoundByRoundId,
  addParticipant,
  deleteParticipant
} from "../../../Redux/actions/roundsActions";
import { getMembersByLeagueId } from "../../../Redux/actions/membersActions";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";

const ViewRound = ({
  match,
  round,
  roundLoading,
  roundFailed,
  members,
  getRoundByRoundId,
  getMembersByLeagueId,
  addParticipant,
  addParticipantLoading,
  addParticipantFailed,
  deleteParticipant
}) => {
  const [hover, setHover] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [changes, setChanges] = useState(false);
  const [member, setMember] = useState("");
  const [score, setScore] = useState("");
  const [availMem, setAvailMem] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const { round_id, league_id } = match.params;

    getRoundByRoundId(league_id, round_id);
    getMembersByLeagueId(league_id);
  }, []);

  useEffect(() => {
    if (round && round.participants) {
      const container = [];
      members.forEach(m => {
        let found = false;
        round.participants.forEach(p => {
          if (m.member_id === p.member_id) {
            found = true;
          }
        });
        !found && container.push(m);
      });
      setAvailMem(container);
      setParticipants(round.participants);
    }
  }, [members, round.participants]);

  useEffect(() => {
    setError(addParticipantFailed.error);
  }, [addParticipantFailed]);

  const submitParticipant = () => {
    const { round_id, league_id } = match.params;

    if (member != "" && score != "") {
      const data = {
        member_id: member.member_id,
        f_name: member.f_name,
        l_name: member.l_name,
        score,
        round_id
      };
      addParticipant(league_id, round_id, data, setTrigger);
      setMember("");
      setScore("");
    } else {
      setError("The member & score fields are required");
    }
  };

  const handleScore = (e, index) => {
    let container = [...participants];
    container[index] = { ...container[index], score: e.target.value };
    setParticipants(container);
  };

  const handleDelete = (member_id, participant_id) => {
    const { round_id, league_id } = match.params;
    console.log(participant_id);
    const removePart = () => {
      const container = participants.filter(
        p => p.participant_id !== participant_id
      );

      setParticipants(container);
    };
    deleteParticipant(
      league_id,
      round_id,
      member_id,
      participant_id,
      removePart
    );
  };

  console.log(participants);

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Grid container>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setChanges(!changes)}
          >
            Make Changes
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {round.league}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          {!trigger ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setTrigger(true)}
            >
              Add Score
            </Button>
          ) : (
            <Button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              variant="outlined"
              size="small"
              onClick={submitParticipant}
              style={{
                backgroundColor: hover ? green[600] : green[400],
                borderColor: green[600]
              }}
            >
              {addParticipantLoading ? "...Loading" : "Submit Score"}
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ width: "50%", margin: "auto" }}>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            style={{ textTransform: "capitalize" }}
          >
            {round.type} Round # {round.round_num}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{round.date}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom></Typography>
        </Grid>
      </Grid>
      <Grid container style={{ maxWidth: 350, margin: "25px auto auto" }}>
        {error && (
          <Grid item xs={12} style={{ margin: "auto" }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Grid>
        )}
        {trigger && (
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{
                borderBottom: "1px solid lightGrey",
                padding: "15px 0px"
              }}
            >
              {/* {submitFailed.error && (
                <Grid item xs={12}>
                  <Typography color="error" align="center" variant="body2">
                    {submitFailed.error}
                  </Typography>
                </Grid>
              )} */}
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Member
                  </InputLabel>
                  <Select
                    labelid="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={member}
                    onChange={e => setMember(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {availMem.map(am => (
                      <MenuItem
                        value={am}
                        key={am.l_name + am.f_name + am.member_id}
                      >{`${am.l_name}, ${am.f_name}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  label="Score"
                  margin="dense"
                  value={score}
                  name="score"
                  style={{ width: 55, paddingRight: 5 }}
                  onChange={e => setScore(e.target.value)}
                  inputProps={{
                    style: { textAlign: "center" }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {participants.length > 0 ? (
          participants.map((part, index) => (
            <Grid
              item
              xs={12}
              key={part.l_name + part.f_name + part.participant_id}
            >
              <Grid
                container
                alignItems="center"
                style={{
                  borderBottom: "1px solid lightGrey",
                  padding: "15px 0px"
                }}
              >
                <Grid item xs={6}>
                  <Typography variant="body1" align="left">
                    {part.l_name}, {part.f_name}
                  </Typography>
                </Grid>
                {!changes ? (
                  <Grid item xs={6}>
                    <Typography variant="body1" align="center">
                      {part.score}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={3}>
                    <TextField
                      required
                      label="Score"
                      margin="dense"
                      value={part.score}
                      name="score"
                      onChange={e => handleScore(e, index)}
                      style={{ width: 55, paddingRight: 5, marginTop: -10 }}
                      inputProps={{
                        style: { textAlign: "center" }
                      }}
                    />
                  </Grid>
                )}

                {changes && (
                  <Grid item xs={3}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleDelete(part.member_id, part.participant_id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No rounds added yet</Typography>
        )}
      </Grid>
    </div>
  );
};

ViewRound.propTypes = {};

const mapStateToProps = state => ({
  round: state.rounds.round,
  roundLoading: state.rounds.roundLoading,
  roundFailed: state.rounds.roundFailed,
  members: state.members.members,
  addParticipantLoading: state.rounds.addParticipantLoading,
  addParticipantFailed: state.rounds.addParticipantFailed
});

export default connect(mapStateToProps, {
  getRoundByRoundId,
  getMembersByLeagueId,
  addParticipant,
  deleteParticipant
})(ViewRound);

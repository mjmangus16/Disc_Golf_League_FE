import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRoundByRoundId,
  addParticipant,
  deleteParticipant,
  updateMultipleParticipants,
  updateRound,
  clearSelectedRoundData,
  sortRoundByName,
  sortRoundByScore
} from "../../../Redux/actions/roundsActions";
import { getLeagueById } from "../../../Redux/actions/leaguesActions";
import { getMembersByLeagueId } from "../../../Redux/actions/membersActions";
import { initBreadcrumb } from "../../../Redux/actions/breadcrumbActions";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton,
  TableSortLabel
} from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { green, red } from "@material-ui/core/colors";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import useStyles from "../LeagueStyles";

const ViewRound = ({
  match,
  round,
  members,
  getRoundByRoundId,
  clearSelectedRoundData,
  getMembersByLeagueId,
  addParticipant,
  addParticipantLoading,
  deleteParticipant,
  updateMultipleParticipants,
  updateRound,
  admin,
  width,
  user_id,
  owner_id,
  getLeagueById,
  initBreadcrumb,
  sortRoundByName,
  sortRoundByScore,
  sortOrderName,
  sortOrderScore
}) => {
  const classes = useStyles();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [changes, setChanges] = useState(false);
  const [member, setMember] = useState("");
  const [score, setScore] = useState("");
  const [availMem, setAvailMem] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState({ member: "", score: "" });
  const [type, setType] = useState("");
  const [scoresError, setScoresError] = useState(null);

  useEffect(() => {
    const { round_id, league_id } = match.params;
    getLeagueById(league_id);
    getRoundByRoundId(league_id, round_id);
    getMembersByLeagueId(league_id);
    initBreadcrumb(league_id);

    return () => {
      clearSelectedRoundData();
    };
  }, []);

  useEffect(() => {
    setType(round.type);
  }, [round]);

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

  const submitParticipant = () => {
    if (member === "") {
      setError({ member: "Member selection field is required", score: null });
    } else {
      if (score == "") {
        setError({ score: "Score field is required", member: null });
      } else {
        setError({});
        const { round_id, league_id } = match.params;

        if (member != "" && score != "") {
          const data = {
            member_id: member.member_id,
            f_name: member.f_name,
            l_name: member.l_name,
            score,
            round_id,
            league_id
          };
          addParticipant(league_id, round_id, data, setTrigger);
          setMember("");
          setScore("");
        } else {
          setError("The member & score fields are required");
        }
      }
    }
  };

  const handleScore = (e, index) => {
    let container = [...participants];
    container[index] = { ...container[index], score: e.target.value };
    setParticipants(container);
  };

  const handleDelete = (member_id, participant_id) => {
    const { round_id, league_id } = match.params;
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

  const handleUpdate = () => {
    const { round_id, league_id } = match.params;

    let completed = true;
    participants.forEach(p => {
      if (p.score == "" || p.score.length > 3) {
        completed = false;
      }
    });

    if (completed) {
      updateMultipleParticipants(league_id, round_id, participants);
      updateRound(league_id, round_id, { type, date: round.date });
      setChanges(false);
      setScoresError(null);
    } else {
      setScoresError(
        "Score fields are required and must be less than 4 digits long"
      );
    }
  };

  const displayAddButton = () => {
    if (admin && user_id === owner_id) {
      if (isWidthDown("sm", width)) {
        if (!trigger) {
          return (
            <IconButton
              color="secondary"
              size="medium"
              onClick={() => {
                setChanges(false);
                setTrigger(true);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          );
        } else {
          return (
            <IconButton
              onClick={handleUpdate}
              size="small"
              onClick={submitParticipant}
              style={{
                backgroundColor: green[600],
                color: "white"
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          );
        }
      } else {
        if (!trigger) {
          return (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                setChanges(false);
                setTrigger(true);
              }}
            >
              Add Score
            </Button>
          );
        } else {
          return (
            <Button
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              variant="contained"
              size="small"
              onClick={submitParticipant}
              style={{
                backgroundColor: hover2 ? green[600] : green[400],
                borderColor: green[600]
              }}
            >
              {addParticipantLoading ? "...Loading" : "Submit Score"}
            </Button>
          );
        }
      }
    }
  };

  const displayChangesButton = () => {
    if (admin && user_id === owner_id) {
      if (isWidthDown("sm", width)) {
        if (!changes) {
          return (
            <IconButton
              color="secondary"
              size="medium"
              onClick={() => {
                setChanges(true);
                setTrigger(false);
              }}
            >
              <EditIcon />
            </IconButton>
          );
        } else {
          return (
            <IconButton
              onClick={handleUpdate}
              size="small"
              style={{
                backgroundColor: green[600],
                color: "white"
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          );
        }
      } else {
        if (!changes) {
          return (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                setChanges(true);
                setTrigger(false);
              }}
            >
              Make Changes
            </Button>
          );
        } else {
          return (
            <Button
              onMouseEnter={() => setHover1(true)}
              onMouseLeave={() => setHover1(false)}
              variant="contained"
              size="small"
              onClick={handleUpdate}
              style={{
                backgroundColor: hover1 ? green[600] : green[400],
                borderColor: green[600]
              }}
            >
              Submit Changes
            </Button>
          );
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: 800, width: "90%", margin: "auto" }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          {displayChangesButton()}
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.leagueNameHeading}
          >
            {round.league}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          {displayAddButton()}
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ width: "50%", margin: "auto" }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={classes.roundInfo}>
            {moment(new Date(round.date)).format("MM/DD/YY")}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom></Typography>
        </Grid>
      </Grid>
      <Grid container style={{ maxWidth: 350, margin: "25px auto auto" }}>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            style={{
              borderBottom: "1px solid lightGrey",
              padding: "15px 0px"
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                align="left"
                className={classes.tableTypoH}
                onClick={() =>
                  sortRoundByName(round.participants, sortOrderName)
                }
              >
                <TableSortLabel
                  active={sortOrderName !== null}
                  direction={sortOrderName ? "asc" : "desc"}
                >
                  Name
                </TableSortLabel>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                align="center"
                className={classes.tableTypoH}
                onClick={() =>
                  sortRoundByScore(round.participants, sortOrderScore)
                }
              >
                <TableSortLabel
                  active={sortOrderScore !== null}
                  direction={sortOrderScore ? "asc" : "desc"}
                >
                  Score
                </TableSortLabel>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {error.member && (
          <Grid item xs={12} style={{ margin: "auto" }}>
            <Typography variant="body2" color="error">
              {error.member}
            </Typography>
          </Grid>
        )}
        {error.score && (
          <Grid item xs={12} style={{ margin: "auto" }}>
            <Typography variant="body2" color="error">
              {error.score}
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
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  required
                  error={error.member ? true : false}
                >
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                    className={classes.memberInputLabel}
                  >
                    Member
                  </InputLabel>
                  <Select
                    labelid="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={member}
                    onChange={e => setMember(e.target.value)}
                    className={classes.memberSelectItems}
                  >
                    <MenuItem value="" className={classes.memberSelectItems}>
                      <em>None</em>
                    </MenuItem>
                    {availMem.map(am => (
                      <MenuItem
                        value={am}
                        key={am.l_name + am.f_name + am.member_id}
                        className={classes.memberSelectItems}
                      >{`${am.l_name}, ${am.f_name}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={error.score ? true : false}
                  required
                  label="Score"
                  margin="dense"
                  value={score}
                  name="score"
                  style={{ width: 55, paddingRight: 5 }}
                  onChange={e => setScore(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.formTextInputScore
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.formTextLabel
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {scoresError && (
          <Grid item xs={12}>
            <Typography color="error" align="center" variant="body2">
              {scoresError}
            </Typography>
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
                  <Typography
                    variant="body1"
                    align="left"
                    className={classes.roundMemberName}
                  >
                    {part.l_name}, {part.f_name}
                  </Typography>
                </Grid>
                {!changes ? (
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      align="center"
                      className={classes.roundMemberName}
                    >
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
                      InputProps={{
                        classes: {
                          input: classes.formTextInputScore
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.formTextLabel
                        }
                      }}
                    />
                  </Grid>
                )}

                {changes && (
                  <Grid item xs={3}>
                    <IconButton
                      onClick={() =>
                        handleDelete(part.member_id, part.participant_id)
                      }
                      style={{ color: red[500] }}
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

ViewRound.propTypes = {
  round: PropTypes.object.isRequired,
  roundLoading: PropTypes.bool.isRequired,
  roundFailed: PropTypes.object.isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  addParticipantLoading: PropTypes.bool.isRequired,
  addParticipantFailed: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
  getRoundByRoundId: PropTypes.func.isRequired,
  clearSelectedRoundData: PropTypes.func.isRequired,
  getMembersByLeagueId: PropTypes.func.isRequired,
  addParticipant: PropTypes.func.isRequired,
  deleteParticipant: PropTypes.func.isRequired,
  updateMultipleParticipants: PropTypes.func.isRequired,
  updateRound: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  owner_id: PropTypes.number
};

const mapStateToProps = state => ({
  round: state.rounds.round,
  roundLoading: state.rounds.roundLoading,
  roundFailed: state.rounds.roundFailed,
  members: state.members.members,
  addParticipantLoading: state.rounds.addParticipantLoading,
  addParticipantFailed: state.rounds.addParticipantFailed,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id,
  sortOrderName: state.rounds.sortOrderName,
  sortOrderScore: state.rounds.sortOrderScore
});

export default connect(mapStateToProps, {
  getRoundByRoundId,
  clearSelectedRoundData,
  getMembersByLeagueId,
  addParticipant,
  deleteParticipant,
  updateMultipleParticipants,
  updateRound,
  getLeagueById,
  initBreadcrumb,
  sortRoundByName,
  sortRoundByScore
})(withWidth()(ViewRound));

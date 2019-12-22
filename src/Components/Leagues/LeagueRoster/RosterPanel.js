import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitMemberToLeague } from "../../../Redux/actions/membersActions";
import {
  Typography,
  Grid,
  CircularProgress,
  Button,
  TextField,
  Paper
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import useStyles from "../LeagueStyles";
import RosterCard from "./RosterCard";

const RosterPanel = ({
  league_id,
  members,
  membersLoading,
  membersFailed,
  submitLoading,
  submitFailed,
  submitMemberToLeague,
  admin
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [newMember, setNewMember] = useState({
    f_name: "",
    l_name: "",
    email: ""
  });

  const handler = e => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const submitMember = () => {
    submitMemberToLeague(newMember, league_id, setTrigger, setNewMember);
  };

  return (
    <div>
      {membersLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <div>
          {trigger ? (
            <Button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              variant="outlined"
              size="small"
              style={{
                backgroundColor: hover ? green[600] : green[400],
                borderColor: green[600],
                width: 150
              }}
              onClick={submitMember}
            >
              {submitLoading ? "Loading..." : "Submit Member"}
            </Button>
          ) : (
            admin && (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{
                  margin: "0px auto 0px 0px"
                }}
                onClick={() => setTrigger(true)}
              >
                Add Member
              </Button>
            )
          )}
          {members.length > 0 || trigger ? (
            <Grid
              container
              spacing={1}
              alignContent="flex-start"
              style={{
                height: 500,
                overflow: "auto",
                marginTop: 25
              }}
            >
              {trigger && (
                <Grid item xs={12}>
                  <Paper
                    className={classes.paper}
                    elevation={4}
                    style={{ width: 550, margin: "auto" }}
                  >
                    <Grid container spacing={1}>
                      {submitFailed.error && (
                        <Grid item xs={12}>
                          <Typography
                            color="error"
                            align="center"
                            variant="body2"
                          >
                            {submitFailed.error}
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={4}>
                        <TextField
                          label="First Name"
                          margin="dense"
                          variant="outlined"
                          fullWidth
                          required
                          value={newMember.f_name}
                          name="f_name"
                          onChange={e => handler(e)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Last Name"
                          margin="dense"
                          variant="outlined"
                          fullWidth
                          required
                          value={newMember.l_name}
                          name="l_name"
                          onChange={e => handler(e)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Email"
                          margin="dense"
                          variant="outlined"
                          fullWidth
                          value={newMember.email}
                          name="email"
                          onChange={e => handler(e)}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )}
              {members.map((member, i) => (
                <RosterCard
                  key={(member.f_name, member.l_name, i)}
                  member={member}
                  league_id={league_id}
                />
              ))}
            </Grid>
          ) : membersFailed ? (
            <Typography style={{ marginTop: 15 }}>
              {membersFailed.error}
            </Typography>
          ) : (
            <Typography style={{ marginTop: 15 }}>
              {admin
                ? "You have not added any members to the league yet."
                : "The league manager has not added any members to this league yet."}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

RosterPanel.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  members: state.members.members,
  getMembersLoading: state.members.getMembersLoading,
  getMembersFailed: state.members.getMembersFailed,
  submitLoading: state.members.submitMemberLoading,
  submitFailed: state.members.submitMemberFailed,
  admin: state.auth.admin
});

export default connect(mapStateToProps, {
  submitMemberToLeague
})(RosterPanel);

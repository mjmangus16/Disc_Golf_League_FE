import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getMemberByMemberId,
  removeMemberFromLeague,
  updateMember
} from "../../../Redux/actions/membersActions";
import {
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress
} from "@material-ui/core";

import useStyles from "../LeagueStyles";

import ConnectUser from "./ConnectUser";

const LeagueMember = ({
  getMemberByMemberId,
  removeMemberFromLeague,
  member,
  memberLoading,
  memberFailed,
  updateMember,
  updateMemberLoading,
  updateMemberFailed,
  update_success,
  match,
  history
}) => {
  const classes = useStyles();
  const [trigger, setTrigger] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { league_id, member_id } = match.params;
    getMemberByMemberId(league_id, member_id);
  }, []);

  useEffect(() => {
    setEmail(member.email);
  }, [member]);

  const deleteMember = () => {
    const { member_id, league_id } = match.params;
    const redirect = () => history.push(`/league/${league_id}`);
    removeMemberFromLeague(member_id, league_id, redirect);
  };

  const handleUpdate = () => {
    const { league_id, member_id } = match.params;
    updateMember(member_id, league_id, email);
  };

  return (
    <div>
      <ConnectUser
        status={trigger}
        close={setTrigger}
        email={email}
        change={setEmail}
        deleteMember={deleteMember}
        loading={updateMemberLoading}
        failed={updateMemberFailed}
        success={update_success}
        update={handleUpdate}
      />
      {memberLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <>
          <Typography variant="h4">{`${member.l_name}, ${member.f_name}`}</Typography>
          <Button
            variant="outlined"
            size="small"
            style={{ margin: "10px auto" }}
            onClick={() => setTrigger(true)}
          >
            Member Options
          </Button>

          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: 25 }}
          >
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    style={{ textDecoration: "underline" }}
                  >
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    style={{ textDecoration: "underline" }}
                  >
                    Type
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    style={{ textDecoration: "underline" }}
                  >
                    Location
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    style={{ textDecoration: "underline" }}
                  >
                    Score
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {member.rounds &&
              member.rounds.map(r => (
                <Grid item xs={8} key={r.type + r.date + r.score}>
                  <Paper style={{ padding: "15px 0px" }} elevation={4}>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography variant="body2">{r.date}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">{r.type}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">
                          {r.location ? r.location : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">{r.score}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
  );
};

LeagueMember.propTypes = {};

const mapStateToProps = state => ({
  member: state.members.member,
  memberLoading: state.members.getMemberLoading,
  memberFailed: state.members.getMemberFailed,
  updateMemberLoading: state.members.updateMemberLoading,
  updateMemberFailed: state.members.updateMemberFailed,
  update_success: state.members.update_success
});

export default connect(mapStateToProps, {
  getMemberByMemberId,
  removeMemberFromLeague,
  updateMember
})(LeagueMember);

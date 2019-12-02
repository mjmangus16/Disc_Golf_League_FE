import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMemberByMemberId } from "../../../Redux/actions/membersActions";
import {
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  TextField,
  CircularProgress
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../LeagueStyles";
import { typography } from "@material-ui/system";

const LeagueMember = ({
  getMemberByMemberId,
  member,
  memberLoading,
  memberFailed,
  match
}) => {
  const classes = useStyles();

  useEffect(() => {
    const { league_id, member_id } = match.params;
    getMemberByMemberId(league_id, member_id);
  }, []);

  return (
    <div>
      {memberLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <>
          <Typography variant="h4">{`${member.l_name}, ${member.f_name}`}</Typography>
          {member.email ? (
            <Typography>{member.email}</Typography>
          ) : (
            <Button
              variant="outlined"
              size="small"
              style={{ margin: "10px auto" }}
            >
              Connect User
            </Button>
          )}
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
                <Grid item xs={8}>
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
  memberFailed: state.members.getMemberFailed
});

export default connect(mapStateToProps, {
  getMemberByMemberId
})(LeagueMember);

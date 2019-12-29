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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import { green } from "@material-ui/core/colors";
import useStyles from "../LeagueStyles";
import MemberCard from "./MemberCard";

const RosterPanel = ({
  history,
  league_id,
  members,
  membersLoading,
  membersFailed,
  submitLoading,
  submitFailed,
  submitMemberToLeague,
  admin,
  user_id,
  owner_id
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
            admin &&
            owner_id === user_id && (
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
          {trigger && (
            <div style={{ margin: "25px auto" }}>
              <Paper
                className={classes.paper}
                style={{ maxWidth: 550, margin: "auto" }}
              >
                <Grid container spacing={1} justify="center">
                  {submitFailed.error && (
                    <Grid item xs={12}>
                      <Typography color="error" align="center" variant="body2">
                        {submitFailed.error}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={6} md={4} style={{ width: "auto" }}>
                    <TextField
                      label="First Name"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      required
                      value={newMember.f_name}
                      name="f_name"
                      onChange={e => handler(e)}
                      InputProps={{
                        classes: {
                          input: classes.formTextInput
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.formTextLabel
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      label="Last Name"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      required
                      value={newMember.l_name}
                      name="l_name"
                      onChange={e => handler(e)}
                      InputProps={{
                        classes: {
                          input: classes.formTextInput
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.formTextLabel
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} md={4}>
                    <TextField
                      label="Email"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      value={newMember.email}
                      name="email"
                      onChange={e => handler(e)}
                      InputProps={{
                        classes: {
                          input: classes.formTextInput
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
              </Paper>
            </div>
          )}
          {members.length > 0 ? (
            <TableContainer style={{ maxWidth: 400, margin: "15px auto" }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Name
                    </TableCell>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Rounds
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map(member => (
                    <TableRow
                      key={"memberKey" + member.member_id}
                      onClick={() =>
                        history.push(
                          `/league/${league_id}/member/${member.member_id}`
                        )
                      }
                      className={classes.tableRow}
                    >
                      <TableCell align="center" className={classes.tableTypo}>
                        {`${member.l_name}, ${member.f_name}`}
                      </TableCell>
                      <TableCell align="center" className={classes.tableTypo}>
                        {member.rounds}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : membersFailed ? (
            <Typography className={classes.missingData}>
              {membersFailed.error}
            </Typography>
          ) : (
            <Typography className={classes.missingData}>
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

RosterPanel.propTypes = {
  league_id: PropTypes.number,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  getMembersLoading: PropTypes.bool.isRequired,
  getMembersFailed: PropTypes.object.isRequired,
  submitLoading: PropTypes.bool.isRequired,
  submitFailed: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
  submitMemberToLeague: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  owner_id: PropTypes.number
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  league_id: state.leagues.selectedLeague.league_id,
  members: state.members.members,
  getMembersLoading: state.members.getMembersLoading,
  getMembersFailed: state.members.getMembersFailed,
  submitLoading: state.members.submitMemberLoading,
  submitFailed: state.members.submitMemberFailed,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id
});

export default connect(mapStateToProps, {
  submitMemberToLeague
})(RosterPanel);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getMemberByMemberId,
  removeMemberFromLeague,
  updateMember,
  clearSelectedMemberData
} from "../../../Redux/actions/membersActions";
import {
  Typography,
  Grid,
  Toolbar,
  Button,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import useStyles from "../LeagueStyles";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

import ConnectUser from "./ConnectUser";

const LeagueMember = ({
  getMemberByMemberId,
  clearSelectedMemberData,
  removeMemberFromLeague,
  member,
  memberLoading,
  memberFailed,
  updateMember,
  updateMemberLoading,
  updateMemberFailed,
  update_success,
  match,
  history,
  admin,
  width,
  user_id,
  owner_id
}) => {
  const classes = useStyles();
  const [trigger, setTrigger] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { league_id, member_id } = match.params;
    getMemberByMemberId(league_id, member_id);

    return () => {
      clearSelectedMemberData();
    };
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

  const handleSize = () => {
    if (isWidthDown("sm", width)) {
      return true;
    } else {
    }
  };

  const displayOptionsButton = () => {
    if (admin && owner_id === user_id) {
      if (isWidthDown("sm", width)) {
        return (
          <IconButton color="secondary" onClick={() => setTrigger(true)}>
            <EditIcon />
          </IconButton>
        );
      } else {
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ margin: "10px auto" }}
            onClick={() => setTrigger(true)}
          >
            Options
          </Button>
        );
      }
    }
  };

  return (
    <div>
      {admin && (
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
      )}

      {memberLoading ? (
        <CircularProgress size={50} className={classes.loadingCircle} />
      ) : (
        <>
          <Grid
            container
            alignItems="center"
            style={{ maxWidth: 800, margin: "auto" }}
          >
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Typography
                variant="h4"
                className={classes.memberNameHeading}
              >{`${member.l_name}, ${member.f_name}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              {admin && displayOptionsButton()}
            </Grid>
          </Grid>
          {member.rounds && member.rounds.length > 0 ? (
            <TableContainer
              style={{
                maxWidth: 550,
                margin: "25px auto"
              }}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableTypoH}>
                      Date
                    </TableCell>

                    <TableCell align="center" className={classes.tableTypoH}>
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {member.rounds.map(round => (
                    <TableRow key={"memberRoundKey" + round.participant_id}>
                      <TableCell align="center" className={classes.tableTypo}>
                        {moment(new Date(round.date)).format("MM/DD/YY")}
                      </TableCell>

                      <TableCell align="center" className={classes.tableTypo}>
                        {round.score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" style={{ marginTop: 25 }}>
              This member has not played any rounds yet
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

LeagueMember.propTypes = {
  member: PropTypes.object.isRequired,
  memberLoading: PropTypes.bool.isRequired,
  memberFailed: PropTypes.object.isRequired,
  updateMemberLoading: PropTypes.bool.isRequired,
  updateMemberFailed: PropTypes.object.isRequired,
  update_success: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  getMemberByMemberId: PropTypes.func.isRequired,
  clearSelectedMemberData: PropTypes.func.isRequired,
  removeMemberFromLeague: PropTypes.func.isRequired,
  updateMember: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  owner_id: PropTypes.number
};

const mapStateToProps = state => ({
  member: state.members.member,
  memberLoading: state.members.getMemberLoading,
  memberFailed: state.members.getMemberFailed,
  updateMemberLoading: state.members.updateMemberLoading,
  updateMemberFailed: state.members.updateMemberFailed,
  update_success: state.members.update_success,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id
});

export default connect(mapStateToProps, {
  getMemberByMemberId,
  clearSelectedMemberData,
  removeMemberFromLeague,
  updateMember
})(withWidth()(LeagueMember));

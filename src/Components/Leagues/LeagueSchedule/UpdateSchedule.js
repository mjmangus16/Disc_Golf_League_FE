import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  submitSchedule,
  removeWeekFromSchedule,
  getScheduleByLeagueId,
  updateWeekInSchedule
} from "../../../Redux/actions/scheduleActions";
import { initBreadcrumb } from "../../../Redux/actions/breadcrumbActions";
import { Typography, Grid } from "@material-ui/core";
import moment from "moment";
import WeekItem from "./WeekItem";

import useStyles from "../LeagueStyles";

const UpdateSchedule = ({
  schedule,
  updateWeekInSchedule,
  submitSchedule,
  removeWeekFromSchedule,
  editLeagueFailed,
  getScheduleByLeagueId,
  match,
  initBreadcrumb
}) => {
  const classes = useStyles();
  const [sched, setSched] = useState([]);

  useEffect(() => {
    const league_id = match.params.league_id;
    initBreadcrumb(league_id);
    getScheduleByLeagueId(league_id);
  }, []);

  useEffect(() => {
    if (schedule) {
      const container = schedule.map((s, i) => (
        <WeekItem
          key={`${(s.date, i)}`}
          data={s}
          i={i}
          length={schedule.length}
          remove={removeWeek}
          update={updateWeek}
        />
      ));

      setSched([
        <WeekItem
          data={{
            date: moment(new Date()).format("YYYYMMDD"),
            info: ""
          }}
          key={`thisIsTheAddedWeekItem`}
          i={container.length}
          submit={submitWeek}
          blank={true}
        />,
        ...container.reverse()
      ]);
    }
  }, [schedule]);

  const removeWeek = schedule_id => {
    const league_id = match.params.league_id;
    removeWeekFromSchedule(schedule_id, league_id);
  };

  const submitWeek = data => {
    const league_id = match.params.league_id;
    submitSchedule(league_id, data);
  };

  const updateWeek = week => {
    const league_id = match.params.league_id;
    updateWeekInSchedule(league_id, week);
  };

  return (
    <div className={classes.updateScheduleContainer}>
      <Typography
        variant="h5"
        gutterBottom
        className={classes.leagueNameHeading}
      >
        Update Schedule
      </Typography>

      <div
        style={{
          marginTop: 25
        }}
      >
        {editLeagueFailed.error && (
          <Typography color="error" style={{ marginTop: 10 }}>
            {editLeagueFailed.error}
          </Typography>
        )}
        <Grid
          container
          justify="center"
          style={{ width: "90%", margin: "auto" }}
        >
          {sched ? sched : <WeekItem />}
        </Grid>
      </div>
    </div>
  );
};

UpdateSchedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  editLeagueFailed: PropTypes.object.isRequired,
  league_id: PropTypes.number,
  submitSchedule: PropTypes.func.isRequired,
  removeWeekFromSchedule: PropTypes.func.isRequired,
  updateWeekInSchedule: PropTypes.func.isRequired,
  getScheduleByLeagueId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule.schedule,
  editLeagueFailed: state.leagues.editLeagueFailed,
  league_id: state.leagues.selectedLeague.league_id
});

export default connect(mapStateToProps, {
  submitSchedule,
  removeWeekFromSchedule,
  updateWeekInSchedule,
  getScheduleByLeagueId,
  initBreadcrumb
})(UpdateSchedule);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  submitSchedule,
  removeWeekFromSchedule,
  getScheduleByLeagueId,
  updateWeekInSchedule
} from "../../../Redux/actions/scheduleActions";
import { Typography, Grid, Button } from "@material-ui/core";
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
  match
}) => {
  const classes = useStyles();
  const [sched, setSched] = useState([]);
  const [addError, setAddError] = useState(false);

  useEffect(() => {
    getScheduleByLeagueId(match.params.league_id);
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
            all: "",
            rec: "",
            int: "",
            adv: "",
            open: ""
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
      <Typography variant="h5" gutterBottom>
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
        {addError && (
          <Typography>
            You must submit the blank week before you can add another one.
          </Typography>
        )}
        <Grid container spacing={4}>
          {sched ? sched : <WeekItem index={1} />}
        </Grid>
      </div>
    </div>
  );
};

UpdateSchedule.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  schedule: state.schedule.schedule,
  editLeagueFailed: state.leagues.editLeagueFailed,
  league_id: state.leagues.selectedLeague.league_id
});

export default connect(mapStateToProps, {
  submitSchedule,
  removeWeekFromSchedule,
  updateWeekInSchedule,
  getScheduleByLeagueId
})(UpdateSchedule);

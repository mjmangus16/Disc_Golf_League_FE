import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  scheduleUpdate,
  addWeekToSchedule,
  removeWeekFromSchedule
} from "../../../Redux/actions/leaguesActions";
import { Typography, Grid, Button } from "@material-ui/core";

import WeekItem from "./WeekItem";

import useStyles from "../LeagueStyles";

const UpdateSchedule = ({
  schedule,
  selectedLeague,
  match,
  scheduleUpdate,
  addWeekToSchedule,
  removeWeekFromSchedule
}) => {
  const classes = useStyles();
  const [sched, setSched] = useState([]);

  useEffect(() => {
    if (schedule) {
      const container = schedule
        .map((s, i) => (
          <WeekItem
            key={`${(s.date, i)}`}
            data={s}
            i={i}
            length={schedule.length}
            remove={removeWeek}
            submit={submitWeek}
          />
        ))
        .reverse();

      setSched(container);
    }
  }, [schedule]);

  const removeWeek = index => {
    const league_id = match.params.league_id;
    removeWeekFromSchedule(schedule, index, league_id, selectedLeague);
  };

  const submitWeek = (week, index) => {
    const league_id = match.params.league_id;
    const container = [...schedule];
    container[index] = week;
    scheduleUpdate(container, league_id, selectedLeague);
  };

  return (
    <div className={classes.updateScheduleContainer}>
      <Typography variant="h5" gutterBottom>
        Update Schedule
      </Typography>

      <Grid container style={{ margin: "15px auto", width: "50%" }}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => addWeekToSchedule(schedule)}
          >
            Add Week
          </Button>
        </Grid>
      </Grid>
      <div
        style={{
          borderTop: "1px solid lightgrey"
        }}
      >
        {sched ? sched : <WeekItem index={1} />}
      </div>
    </div>
  );
};

UpdateSchedule.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  schedule: state.leagues.selectedLeague.schedule,
  selectedLeague: state.leagues.selectedLeague
});

export default connect(mapStateToProps, {
  scheduleUpdate,
  addWeekToSchedule,
  removeWeekFromSchedule
})(UpdateSchedule);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";

const SchedulePanel = ({ league_id, schedule, admin }) => {
  return (
    <div>
      {admin && (
        <Link
          to={`/league/${league_id}/updateSchedule`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            size="small"
            style={{
              margin: "0px auto 0px 0px"
            }}
          >
            Update Schedule
          </Button>
        </Link>
      )}

      {!schedule || schedule.length === 0 ? (
        <Typography style={{ marginTop: 15 }}>
          {admin
            ? "You have to not created a schedule yet."
            : "The league manager has not created a schedule yet."}
        </Typography>
      ) : (
        <div style={{ height: 500, overflow: "auto", marginTop: 25 }}>
          {schedule
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .map((week, i) => (
              <div style={{ textAlign: "left" }} key={`scheduleKey${i}`}>
                <Typography variant="subtitle2" style={{ margin: "10px auto" }}>
                  Week {i + 1}
                  <Typography variant="body2">
                    {moment(week.date).format("MMMM Do YYYY")}
                  </Typography>
                </Typography>

                <ul style={{ listStyle: "none" }}>
                  {Object.entries(week).map((d, i) => {
                    if (
                      d[1] !== "" &&
                      d[0] !== "date" &&
                      d[0] !== "schedule_id" &&
                      d[0] !== "league_id"
                    ) {
                      return (
                        <li key={d[0] + d[1] + i}>
                          <Typography variant="body1">
                            <span
                              style={{
                                fontWeight: 500,
                                textTransform: "capitalize"
                              }}
                            >
                              {d[0]}:{" "}
                            </span>
                            {d[1]}
                          </Typography>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

SchedulePanel.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  schedule: state.schedule.schedule,
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin
});

export default connect(mapStateToProps, {})(SchedulePanel);
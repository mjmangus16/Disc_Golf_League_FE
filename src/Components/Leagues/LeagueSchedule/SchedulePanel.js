import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import moment from "moment";

const SchedulePanel = ({ schedule, league_id }) => {
  return (
    <div>
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
      {!schedule || schedule.length === 0 ? (
        <Typography style={{ marginTop: 15 }}>
          You have to not created a schedule yet.
        </Typography>
      ) : (
        <div style={{ height: 400, overflow: "auto", marginTop: 25 }}>
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
                    if (d[1] !== "" && d[0] !== "date") {
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
                            </span>{" "}
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

export default SchedulePanel;

import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box } from "@material-ui/core";

import { green } from "@material-ui/core/colors";

const SchedulePanel = ({ schedule }) => {
  const [hover, setHover] = useState(false);
  console.log(Object.keys(schedule[0]));

  const formattedSchedule = Object.entries(schedule[0]);
  console.log(formattedSchedule);
  return (
    <div>
      {!schedule ? (
        <div>
          <Button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: hover ? green[600] : green[400],
              borderColor: green[600],
              margin: "0px auto 0px 0px"
            }}
          >
            Create Schedule
          </Button>
          <Typography style={{ marginTop: 15 }}>
            You have to not created a schedule yet.
          </Typography>
        </div>
      ) : (
        <div>
          <Button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: hover ? green[600] : green[400],
              borderColor: green[600],
              margin: "0px auto 0px 0px"
            }}
          >
            Update Schedule
          </Button>
          <div style={{ height: 400, overflow: "auto", marginTop: 25 }}>
            {schedule.map((week, i) => (
              <div style={{ textAlign: "left" }} key={`scheduleKey${i}`}>
                <Typography variant="subtitle2" style={{ margin: "10px auto" }}>
                  Week {i + 1}
                </Typography>
                <ul style={{ listStyle: "none" }}>
                  {Object.entries(week).map(d => (
                    <li>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 500 }}>{d[0]}: </span> {d[1]}
                      </Typography>
                    </li>
                  ))}

                  {/* <li>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 500 }}>Advanced:</span>{" "}
                      {week.Advanced}
                    </Typography>
                  </li> */}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePanel;

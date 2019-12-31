import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  schedItem1: {
    margin: "10px auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      margin: "5px auto"
    }
  },
  schedItem2: {
    margin: "10px auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      margin: "5px auto"
    }
  },
  schedItem3: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  missingData: {
    marginTop: 25,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  }
}));

const SchedulePanel = ({
  league_id,
  schedule,
  history,
  admin,
  user_id,
  owner_id
}) => {
  const classes = useStyles();
  return (
    <div>
      {admin && user_id === owner_id && (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => history.push(`/league/${league_id}/updateSchedule`)}
          style={{
            margin: "0px auto 0px 0px"
          }}
        >
          Update Schedule
        </Button>
      )}

      {!schedule || schedule.length === 0 ? (
        <Typography className={classes.missingData}>
          {admin
            ? "You have to not created a schedule yet."
            : "The league manager has not created a schedule yet."}
        </Typography>
      ) : (
        <div style={{ margin: "25px auto" }}>
          {schedule
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .map((week, i) => (
              <div
                style={{
                  textAlign: "left",
                  borderTop: "1px solid lightGrey",
                  padding: "0px 10px"
                }}
                key={`scheduleKey${i}`}
              >
                <Typography variant="subtitle2" className={classes.schedItem1}>
                  Week {i + 1}
                  <Typography variant="body2" className={classes.schedItem2}>
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
                          <Typography
                            variant="body1"
                            className={classes.schedItem3}
                          >
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

SchedulePanel.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  league_id: PropTypes.number,
  admin: PropTypes.bool.isRequired,
  owner_id: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  owner_id: PropTypes.number
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  schedule: state.schedule.schedule,
  league_id: state.leagues.selectedLeague.league_id,
  admin: state.auth.admin,
  user_id: state.auth.user_id,
  owner_id: state.leagues.selectedLeague.owner_id
});

export default connect(mapStateToProps, {})(SchedulePanel);

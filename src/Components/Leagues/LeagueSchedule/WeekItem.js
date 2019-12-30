import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import useStyles from "../LeagueStyles";

const WeekItem = ({ data, i, length, remove, submit, update, blank }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [missing, setMissing] = useState();
  const [week, setWeek] = useState({
    date: moment(new Date()).format("YYYYMMDD"),
    all: "",
    rec: "",
    int: "",
    adv: "",
    open: ""
  });

  useEffect(() => {
    setWeek(data);
  }, [data, length]);

  const handleChange = e => {
    setWeek({ ...week, [e.target.name]: e.target.value });
  };

  const handleDate = newDate => {
    setWeek({ ...week, date: moment(newDate).format("YYYYMMDD") });
  };

  const submitWeek = () => {
    if (week.date !== "") {
      if (
        week.all !== "" ||
        week.rec !== "" ||
        week.int !== "" ||
        week.adv !== "" ||
        week.open !== ""
      ) {
        setMissing(false);
        submit(week);
      } else {
        setMissing(true);
      }
    } else {
      setMissing(true);
    }
  };

  const updateWeek = () => {
    if (week.date !== "") {
      if (
        week.all !== "" ||
        week.rec !== "" ||
        week.int !== "" ||
        week.adv !== "" ||
        week.open !== ""
      ) {
        setMissing(false);
        setTrigger(false);
        update(week);
      } else {
        setMissing(true);
      }
    } else {
      setMissing(true);
    }
  };

  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={1}
        style={{ borderBottom: "1px solid lightGrey", padding: "20px 0px" }}
      >
        <Grid item xs={4}>
          <Typography variant="h6" align="left" style={{ padding: 10 }}>
            Week {i + 1}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          {missing && (
            <Typography color="error" variant="body2">
              At least one field + the date must be filled out to submit a week
              to the schedule
            </Typography>
          )}
        </Grid>
        <Grid item xs={1} sm={2}></Grid>
        <Grid item xs={2} sm={1}>
          {!blank && (
            <IconButton
              onClick={() => remove(data.schedule_id)}
              style={{ color: red[500] }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disabled={!trigger && !blank}
              style={{ width: 125, margin: "auto" }}
              disableToolbar
              variant="inline"
              format="MM/DD/YY"
              margin="dense"
              label="Date"
              value={week.date}
              onChange={handleDate}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={!trigger && !blank}
            label="all"
            margin="dense"
            variant="outlined"
            value={week.all}
            name="all"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={!trigger && !blank}
            label="recreational"
            margin="dense"
            variant="outlined"
            value={week.rec}
            name="rec"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={!trigger && !blank}
            label="intermediate"
            margin="dense"
            variant="outlined"
            value={week.int}
            name="int"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={!trigger && !blank}
            label="advanced"
            margin="dense"
            variant="outlined"
            value={week.adv}
            name="adv"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={!trigger && !blank}
            label="open"
            margin="dense"
            variant="outlined"
            value={week.open}
            name="open"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={8} style={{ margin: "auto" }}>
          {blank || trigger ? (
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={blank ? submitWeek : updateWeek}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                backgroundColor: hover ? green[600] : green[400],
                borderColor: green[600]
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={() => setTrigger(true)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ boxShadow: "none" }}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeekItem;

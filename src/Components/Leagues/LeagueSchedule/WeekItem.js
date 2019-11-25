import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { green } from "@material-ui/core/colors";
import useStyles from "../LeagueStyles";

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const WeekItem = ({ data, i, length, remove, submit }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [trigger, setTrigger] = useState(i === length - 1 ? true : false);
  const [missing, setMissing] = useState();
  const [week, setWeek] = useState({
    date: "",
    all: "",
    recreational: "",
    intermediate: "",
    advanced: "",
    open: ""
  });

  useEffect(() => {
    setWeek(data);
    setTrigger(i === length - 1 ? true : false);
  }, [data, length]);

  const handleChange = e => {
    setWeek({ ...week, [e.target.name]: e.target.value });
  };

  const handleDate = newDate => {
    setWeek({ ...week, date: newDate });
  };

  const submitWeek = () => {
    if (week.date !== "") {
      if (
        week.all !== "" ||
        week.recreational !== "" ||
        week.intermediate !== "" ||
        week.advanced !== "" ||
        week.open !== ""
      ) {
        setTrigger(false);
        setMissing(false);
        submit(week, i);
      } else {
        setMissing(true);
      }
    } else {
      setMissing(true);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      style={{
        borderBottom: "1px solid lightgrey",
        paddingBottom: 25,
        paddingTop: 25
      }}
    >
      {missing && (
        <Grid item xs={12}>
          <Typography color="error" variant="body2">
            The Date and at least 1 other field is required to submit a week to
            the schedule
          </Typography>
        </Grid>
      )}
      <Grid item xs={8}>
        <Typography variant="h6" align="left" style={{ padding: 10 }}>
          Week {i + 1}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        {trigger ? (
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={submitWeek}
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
            variant="outlined"
            size="small"
            onClick={() => setTrigger(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              borderColor: green[600]
            }}
          >
            Edit
          </Button>
        )}
      </Grid>
      <Grid item xs={2}>
        <IconButton color="secondary" onClick={() => remove(i)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disabled={!trigger}
            style={{ width: 195, margin: "auto" }}
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            margin="dense"
            id="date-picker-inline"
            label="Date"
            value={week.date}
            onChange={handleDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={!trigger}
          label="all"
          margin="dense"
          variant="outlined"
          value={week.all}
          name="all"
          onChange={e => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={!trigger}
          label="recreational"
          margin="dense"
          variant="outlined"
          value={week.recreational}
          name="recreational"
          onChange={e => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={!trigger}
          label="intermediate"
          margin="dense"
          variant="outlined"
          value={week.intermediate}
          name="intermediate"
          onChange={e => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={!trigger}
          label="advanced"
          margin="dense"
          variant="outlined"
          value={week.advanced}
          name="advanced"
          onChange={e => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={!trigger}
          label="open"
          margin="dense"
          variant="outlined"
          value={week.open}
          name="open"
          onChange={e => handleChange(e)}
        />
      </Grid>
    </Grid>
  );
};

export default WeekItem;

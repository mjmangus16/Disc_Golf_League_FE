import React, { useState, useRef } from "react";

import {
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import useStyles from "./HeaderStyles";

const states = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EditLeagueHeader = ({
  league,
  handler,
  loading,
  failed,
  editLeague,
  history
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [leagueData, setLeagueData] = useState({
    ...league,
    days: [league.days],
    additional: league.additional ? league.additional : ""
  });
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setLeagueData({ ...leagueData, [event.target.name]: event.target.value });
  };

  const submit = () => {
    const data = { ...leagueData, days: leagueData.days.toString() };
    editLeague(data, handler);
  };
  return (
    <div className={classes.editLeagueHeaderCont}>
      <TextField
        error={failed.name ? true : false}
        helperText={failed.name && failed.name}
        label="League Name"
        margin="dense"
        variant="outlined"
        required
        fullWidth
        value={leagueData.name}
        name="name"
        onChange={e => handleChange(e)}
        className={classes.editLeageName}
      />
      <div className={classes.headerContainer}>
        <Grid container>
          <Grid item sm={6} xs={12} className={classes.editLeagueFields}>
            <TextField
              error={failed.type ? true : false}
              helperText={failed.type && failed.type}
              label="League Type"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData.type}
              name="type"
              onChange={e => handleChange(e)}
              className={classes.editLeagueField}
            />

            <TextField
              error={failed.location ? true : false}
              helperText={failed.location && failed.location}
              label="Location ( Course )"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData.location}
              name="location"
              onChange={e => handleChange(e)}
              className={classes.editLeagueField}
            />

            <FormControl
              error={failed.days ? true : false}
              variant="outlined"
              className={classes.editLeagueFormControl}
              margin="dense"
              fullWidth
              required
            >
              <InputLabel
                id="demo-simple-select-outlined-label"
                ref={inputLabel}
              >
                Days Played
              </InputLabel>
              <Select
                labelWidth={labelWidth}
                value={leagueData.days}
                name="days"
                onChange={e => handleChange(e)}
                renderValue={selected => selected.join(", ")}
                multiple
              >
                {days.map(d => (
                  <MenuItem value={d} key={`statekey${d}`}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
              {failed.days && <FormHelperText>{failed.days}</FormHelperText>}
            </FormControl>

            <TextField
              error={failed["length"] ? true : false}
              helperText={failed["length"] && failed["length"]}
              label="Season Length"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData["length"]}
              name="length"
              onChange={e => handleChange(e)}
              className={classes.editLeagueField}
            />
          </Grid>
          <Grid item sm={6} xs={12} style={{ maxWidth: 400, margin: "auto" }}>
            <TextField
              error={failed.description ? true : false}
              helperText={failed.description && failed.description}
              label="League Description"
              multiline
              rows="5"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData.description}
              name="description"
              onChange={e => handleChange(e)}
              className={classes.editLeagueField}
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ borderBottom: "1px solid lightGrey" }}>
        <TextField
          error={failed.contact ? true : false}
          helperText={failed.contact && failed.contact}
          label="Contact Information"
          multiline
          rows="3"
          margin="dense"
          variant="outlined"
          fullWidth
          required
          value={leagueData.contact}
          name="contact"
          onChange={e => handleChange(e)}
          style={{ margin: "25px auto", width: "98%" }}
          className={classes.editLeagueField}
        />

        <TextField
          label="Additional Info"
          multiline
          rows="3"
          margin="dense"
          variant="outlined"
          fullWidth
          value={leagueData.additional}
          name="additional"
          onChange={e => handleChange(e)}
          style={{ margin: "0px auto 25px", width: "98%" }}
          className={classes.editLeagueField}
        />
      </div>
      <Button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        variant="outlined"
        fullWidth
        size="small"
        style={{
          backgroundColor: hover ? green[600] : green[400],
          borderColor: green[600],
          margin: "15px auto"
        }}
        onClick={e => submit(e)}
      >
        {!loading ? "Submit Changes" : "Loading..."}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        size="small"
        onClick={() => handler(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditLeagueHeader;

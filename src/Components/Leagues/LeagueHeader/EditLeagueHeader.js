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
import useStyles from "../LeagueStyles";

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
    <>
      <TextField
        // error={createNewLeagueFailed.name ? true : false}
        // helperText={createNewLeagueFailed.name && createNewLeagueFailed.name}
        label="League Name"
        margin="dense"
        variant="outlined"
        required
        fullWidth
        value={leagueData.name}
        name="name"
        onChange={e => handleChange(e)}
        style={{ maxWidth: 400, margin: 10 }}
      />
      <div className={classes.headerContainer}>
        <Grid container>
          <Grid item xs={6} style={{ maxWidth: 250, margin: "auto" }}>
            <TextField
              // error={createNewLeagueFailed.type ? true : false}
              // helperText={
              //   createNewLeagueFailed.type && createNewLeagueFailed.type
              // }
              label="League Type"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData.type}
              name="type"
              onChange={e => handleChange(e)}
            />

            <TextField
              // error={createNewLeagueFailed.location ? true : false}
              // helperText={
              //   createNewLeagueFailed.location && createNewLeagueFailed.location
              // }
              label="Location ( Course )"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData.location}
              name="location"
              onChange={e => handleChange(e)}
            />

            <FormControl
              // error={createNewLeagueFailed.days ? true : false}
              variant="outlined"
              className={classes.formControl}
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
            </FormControl>

            <TextField
              // error={createNewLeagueFailed["length"] ? true : false}
              // helperText={
              //   createNewLeagueFailed["length"] && createNewLeagueFailed["length"]
              // }
              label="Season Length"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData["length"]}
              name="length"
              onChange={e => handleChange(e)}
            />
          </Grid>
          <Grid item xs={6} style={{ maxWidth: 400, margin: "auto" }}>
            <TextField
              // error={createNewLeagueFailed.description ? true : false}
              // helperText={
              //   createNewLeagueFailed.description &&
              //   createNewLeagueFailed.description
              // }
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
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ borderBottom: "1px solid lightGrey" }}>
        <TextField
          // error={createNewLeagueFailed.contact ? true : false}
          // helperText={
          //   createNewLeagueFailed.contact && createNewLeagueFailed.contact
          // }
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
        />
      </div>
      <Button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        variant="outlined"
        fullWidth
        style={{
          backgroundColor: hover ? green[600] : green[400],
          borderColor: green[600],
          margin: "15px auto"
        }}
        onClick={e => submit(e)}
      >
        {!loading ? "Submit Changes" : "Loading..."}
      </Button>
      <Button variant="outlined" fullWidth onClick={() => handler(false)}>
        Cancel
      </Button>
    </>
  );
};

export default EditLeagueHeader;

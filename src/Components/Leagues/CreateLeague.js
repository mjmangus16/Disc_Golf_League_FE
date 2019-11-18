import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { createNewLeague } from "../../Redux/actions/leaguesActions";

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

import useStyles from "./LeagueStyles";

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

const CreateLeague = ({
  createNewLeague,
  createNewLeagueLoading,
  createNewLeagueFailed,
  history
}) => {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [leagueData, setLeagueData] = useState({
    name: "",
    type: "",
    state: "",
    zip: "",
    location: "",
    year: "",
    days: [],
    length: "",
    contact: "",
    description: "",
    additional: ""
  });

  const handleChange = event => {
    setLeagueData({ ...leagueData, [event.target.name]: event.target.value });
  };

  const submit = () => {
    let data = { ...leagueData, days: leagueData.days.toString() };
    const redirect = league_id => history.push(`/league/${league_id}`);
    createNewLeague(data, redirect);
  };

  return (
    <div className={classes.createLeagueContainer}>
      <Typography variant="h5" gutterBottom>
        Create A New League
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        align="left"
        className={classes.createLeagueInfo}
      >
        The fields listed are all information that is needed to create and
        manage a league. Most, but not all fields are required. Once the league
        is submitted, you can create a schedule, add members and submit rounds
        to the league.
      </Typography>
      <Grid container spacing={1} style={{ borderTop: "1px solid lightgrey" }}>
        <Grid item xs={6}>
          <TextField
            error={createNewLeagueFailed.name ? true : false}
            helperText={
              createNewLeagueFailed.name && createNewLeagueFailed.name
            }
            label="League Name"
            margin="dense"
            variant="outlined"
            fullWidth
            required
            value={leagueData.name}
            name="name"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={createNewLeagueFailed.type ? true : false}
            helperText={
              createNewLeagueFailed.type && createNewLeagueFailed.type
            }
            label="League Type"
            margin="dense"
            variant="outlined"
            fullWidth
            required
            value={leagueData.type}
            name="type"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl
            error={createNewLeagueFailed.state ? true : false}
            variant="outlined"
            className={classes.formControl}
            margin="dense"
            fullWidth
            required
          >
            <InputLabel id="demo-simple-select-outlined-label" ref={inputLabel}>
              State
            </InputLabel>
            <Select
              labelWidth={labelWidth}
              value={leagueData.state}
              name="state"
              onChange={e => handleChange(e)}
            >
              {states.map(st => (
                <MenuItem value={st} key={`statekey${st}`}>
                  {st}
                </MenuItem>
              ))}
            </Select>
            {createNewLeagueFailed.state && (
              <FormHelperText>{createNewLeagueFailed.state}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            error={createNewLeagueFailed.zip ? true : false}
            helperText={createNewLeagueFailed.zip && createNewLeagueFailed.zip}
            label="Zip Code"
            margin="dense"
            variant="outlined"
            fullWidth
            required
            value={leagueData.zip}
            name="zip"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={createNewLeagueFailed.location ? true : false}
            helperText={
              createNewLeagueFailed.location && createNewLeagueFailed.location
            }
            label="Location ( Course )"
            margin="dense"
            variant="outlined"
            fullWidth
            required
            value={leagueData.location}
            name="location"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            error={createNewLeagueFailed.year ? true : false}
            helperText={
              createNewLeagueFailed.year && createNewLeagueFailed.year
            }
            label="Year"
            margin="dense"
            variant="outlined"
            fullWidth
            required
            value={leagueData.year}
            name="year"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl
            error={createNewLeagueFailed.days ? true : false}
            variant="outlined"
            className={classes.formControl}
            margin="dense"
            fullWidth
            required
          >
            <InputLabel id="demo-simple-select-outlined-label" ref={inputLabel}>
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
            {createNewLeagueFailed.days && (
              <FormHelperText>{createNewLeagueFailed.days}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            error={createNewLeagueFailed["length"] ? true : false}
            helperText={
              createNewLeagueFailed["length"] && createNewLeagueFailed["length"]
            }
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
        <Grid item xs={6}>
          <TextField
            error={createNewLeagueFailed.contact ? true : false}
            helperText={
              createNewLeagueFailed.contact && createNewLeagueFailed.contact
            }
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={createNewLeagueFailed.description ? true : false}
            helperText={
              createNewLeagueFailed.description &&
              createNewLeagueFailed.description
            }
            label="League Description"
            multiline
            rows="3"
            margin="dense"
            variant="outlined"
            fullWidth
            required
            value={leagueData.description}
            name="description"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
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
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
          >
            {createNewLeagueLoading ? "Loading...." : "Submit League"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

CreateLeague.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  createNewLeagueLoading: state.leagues.createNewLeagueLoading,
  createNewLeagueFailed: state.leagues.createNewLeagueFailed
});

export default connect(mapStateToProps, { createNewLeague })(CreateLeague);

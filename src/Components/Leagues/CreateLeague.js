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
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import useStyles from "./LeagueStyles";
import { green } from "@material-ui/core/colors";

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
const types = [
  "Singles",
  "Doubles",
  "Singles Travel",
  "Doubles Travel",
  "Putting",
  "Other"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CreateLeague = ({
  createNewLeague,
  createNewLeagueLoading,
  createNewLeagueFailed,
  history,
  width
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
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
      <Typography
        variant="h5"
        gutterBottom
        className={classes.leagueNameHeading}
      >
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
      <div className={classes.headerContainer}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} sm={8}>
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
          <Grid item xs={12} sm={4}>
            <FormControl
              error={createNewLeagueFailed.type ? true : false}
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
                League Type
              </InputLabel>
              <Select
                labelWidth={labelWidth}
                value={leagueData.type}
                name="type"
                onChange={e => handleChange(e)}
              >
                {types.map(ty => (
                  <MenuItem value={ty} key={`typeKey${ty}`}>
                    {ty}
                  </MenuItem>
                ))}
              </Select>
              {createNewLeagueFailed.state && (
                <FormHelperText>{createNewLeagueFailed.state}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl
              error={createNewLeagueFailed.state ? true : false}
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
          <Grid item xs={12} sm={3}>
            <TextField
              error={createNewLeagueFailed.zip ? true : false}
              helperText={
                createNewLeagueFailed.zip && createNewLeagueFailed.zip
              }
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
          {!leagueData.type.includes("Travel") && (
            <Grid item xs={12} sm={6}>
              <TextField
                error={createNewLeagueFailed.location ? true : false}
                helperText={
                  createNewLeagueFailed.location &&
                  createNewLeagueFailed.location
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
          )}

          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <FormControl
              error={createNewLeagueFailed.days ? true : false}
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
              {createNewLeagueFailed.days && (
                <FormHelperText>{createNewLeagueFailed.days}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={createNewLeagueFailed["length"] ? true : false}
              helperText={
                createNewLeagueFailed["length"] &&
                createNewLeagueFailed["length"]
              }
              label="Season Length (# of Weeks)"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              value={leagueData["length"]}
              name="length"
              onChange={e => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
        </Grid>
      </div>
      <Button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        fullWidth
        variant="outlined"
        size="small"
        onClick={submit}
        style={{
          backgroundColor: hover ? green[600] : green[400],
          borderColor: green[600],
          margin: "15px auto"
        }}
      >
        {createNewLeagueLoading ? "Loading...." : "Submit League"}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        size="small"
        onClick={() => history.push("/profile")}
      >
        Cancel
      </Button>
    </div>
  );
};

CreateLeague.propTypes = {
  createNewLeagueLoading: PropTypes.bool.isRequired,
  createNewLeagueFailed: PropTypes.object.isRequired,
  createNewLeague: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  createNewLeagueLoading: state.leagues.createNewLeagueLoading,
  createNewLeagueFailed: state.leagues.createNewLeagueFailed
});

export default connect(mapStateToProps, { createNewLeague })(
  withWidth()(CreateLeague)
);

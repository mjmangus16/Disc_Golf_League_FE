import React, { useRef, useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "auto",
    minWidth: 120,
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      margin: "5px auto"
    }
  }
}));

const MobileSelector = ({
  states,
  selected,
  allLeaguesHandler,
  byStateHandler
}) => {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    if (event.target.value === "All") {
      allLeaguesHandler();
    } else {
      byStateHandler(event.target.value);
    }
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      size="small"
    >
      <InputLabel id="demo-simple-select-outlined-label" ref={inputLabel}>
        States
      </InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={selected}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        <MenuItem value="All" onClick={() => allLeaguesHandler()}>
          All States
        </MenuItem>
        {states.map(st => (
          <MenuItem value={st}>{st}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MobileSelector;

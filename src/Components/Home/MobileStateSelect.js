import React, { useRef, useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "auto",
    minWidth: 120,
    [theme.breakpoints.down("xs")]: {
      width: 275,
      margin: "5px auto"
    }
  }
}));

const MobileSelector = () => {
  const classes = useStyles();
  const [age, setAge] = useState("");

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setAge(event.target.value);
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
        value={"none"}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MobileSelector;

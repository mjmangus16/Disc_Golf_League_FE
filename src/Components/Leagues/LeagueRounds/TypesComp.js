import React, { useEffect, useState, useRef } from "react";

import { Select, InputLabel, MenuItem, FormControl } from "@material-ui/core";

const types = [
  "Singles",
  "Doubles",
  "Singles Travel",
  "Doubles Travel",
  "Putting",
  "Other"
];

const TypesComp = ({ type, setType }) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl margin="dense" fullWidth required style={{ width: 150 }}>
      <InputLabel id="demo-simple-select-outlined-label" ref={inputLabel}>
        Round Type
      </InputLabel>
      <Select
        labelWidth={labelWidth}
        value={type}
        name="type"
        onChange={e => setType(e.target.value)}
        defaultValue={type}
      >
        {types.map(ty => (
          <MenuItem value={ty} key={`typeKey${ty}`}>
            {ty}
          </MenuItem>
        ))}
      </Select>
      {/* {createNewLeagueFailed.state && (
  <FormHelperText>{createNewLeagueFailed.state}</FormHelperText>
)} */}
    </FormControl>
  );
};

export default TypesComp;

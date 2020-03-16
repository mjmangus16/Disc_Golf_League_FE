import React, { useState, useRef, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 800,
    margin: "auto",
    gridColumn: 2,
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      gridRow: 2,
      gridColumn: "1/3",
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      gridTemplateColumns: "1fr",
      width: "100%"
    }
  },
  search: {
    position: "relative",
    border: "1px solid darkGrey",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    maxWidth: 300,
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    },
    [theme.breakpoints.down("xs")]: {
      gridRow: 1,
      margin: "auto",
      width: "95%",
      maxWidth: "95%"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  find: {
    margin: "auto 10px",
    padding: "auto 10px",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      margin: "5px auto"
    }
  },
  formControl: {
    margin: "0px 5px",
    minWidth: 120,
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      margin: "5px auto"
    }
  }
}));

const types = [
  "Singles",
  "Doubles",
  "Singles Travel",
  "Doubles Travel",
  "Putting",
  "Other"
];

const HomeSearch = ({ searchHandler, selected, clear }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState("");
  const [searchType, setSearchType] = useState("Name");

  const handleSelect = event => {
    setSearchType(event.target.value);
  };

  const handleClear = () => {
    setInputText("");
    clear();
  };

  return (
    <div className={classes.container}>
      {searchType !== "Type" ? (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={`Search By...`}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
        </div>
      ) : (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          margin="dense"
          fullWidth
          required
        >
          <Select
            value={types[0]}
            name="type"
            onChange={e => setInputText(e.target.value)}
          >
            {types.map(ty => (
              <MenuItem value={ty} key={`typeKey${ty}`}>
                {ty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
      >
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={searchType}
          onChange={handleSelect}
        >
          <MenuItem value={"Name"}>Name</MenuItem>
          <MenuItem value={"Type"}>Type</MenuItem>
          <MenuItem value={"Zip"}>Zip Code</MenuItem>
        </Select>
      </FormControl>
      <Button
        className={classes.find}
        variant="contained"
        color="secondary"
        onClick={() => searchHandler(inputText, searchType)}
      >
        Find
      </Button>
      <Button
        className={classes.find}
        variant="contained"
        color="secondary"
        onClick={handleClear}
      >
        Clear
      </Button>
    </div>
  );
};

export default HomeSearch;

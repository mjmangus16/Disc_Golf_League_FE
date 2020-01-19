import React, { useState, useRef, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Select,
  FormControl,
  FormHelperText,
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
    display: "flex"
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
    padding: "auto 10px"
  },
  formControl: {
    margin: "0px 5px",
    minWidth: 120
  }
}));

const HomeSearch = ({ searchHandler, selected }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState("");
  const [searchType, setSearchType] = useState("Name");

  const handleSelect = event => {
    setSearchType(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={`Search ${selected} Leagues By...`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </div>
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
    </div>
  );
};

export default HomeSearch;
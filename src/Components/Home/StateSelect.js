import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

import MobileStateSelect from "./MobileStateSelect";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: "650px",
    overflow: "scroll"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  item: {
    margin: "0px 10px"
  }
}));

const StateSelect = ({
  states,
  selected,
  allLeaguesHandler,
  byStateHandler,
  width
}) => {
  const classes = useStyles();

  const displayStates = () => {
    if (isWidthDown("xs", width)) {
      return (
        <MobileStateSelect
          states={states}
          selected={selected}
          allLeaguesHandler={allLeaguesHandler}
          byStateHandler={byStateHandler}
        />
      );
    } else {
      return (
        <div className={classes.container}>
          <ul className={classes.list}>
            <li className={classes.item}>
              <Button
                fullWidth
                variant={selected == "All" ? "outlined" : "text"}
                onClick={() => allLeaguesHandler()}
              >
                All
              </Button>
            </li>
            {states.map(st => (
              <li className={classes.item} key={"select" + st}>
                <Button
                  fullWidth
                  variant={selected == st ? "outlined" : "text"}
                  onClick={e => byStateHandler(st)}
                >
                  {st}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return displayStates();
};

export default withWidth()(StateSelect);

import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
  byStateHandler
}) => {
  const classes = useStyles();
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
          <li className={classes.item}>
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
};

export default StateSelect;

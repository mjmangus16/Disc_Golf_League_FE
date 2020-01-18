import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: "650px",
    overflow: "scroll"
  },
  list: {
    listStyle: "none"
  }
}));

const StateSelect = ({ states, allLeaguesHandler, byStateHandler }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <Button fullWidth onClick={() => allLeaguesHandler()}>
          All
        </Button>
        {states.map(st => (
          <li className={classes.item}>
            <Button fullWidth onClick={e => byStateHandler(st)}>
              {st}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StateSelect;

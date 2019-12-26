import React, { useEffect, useState } from "react";

import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox
} from "@material-ui/core";

import useStyles from "../LeagueStyles";

const TransferList = ({ left, setLeft, right, setRight }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  console.log(checked);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  console.log("left: ", leftChecked);

  function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
  }

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items, side) => (
    <div>
      <Typography gutterBottom variant="subtitle2">
        {side ? "League Members" : "Round Participants"}
      </Typography>
      <Paper
        className={classes.paper}
        elevation={2}
        style={{ height: 300, minWidth: 250, overflow: "auto" }}
      >
        <List dense component="div" role="list">
          {items.map(value => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem
                key={value.name + value.member_id}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    </div>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
      style={{ marginTop: 25 }}
    >
      <Grid item>{customList(left, true)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, false)}</Grid>
    </Grid>
  );
};

export default TransferList;

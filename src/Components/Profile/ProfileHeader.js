import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, IconButton } from "@material-ui/core";
import useStyles from "./ProfileStyles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { green } from "@material-ui/core/colors";

const ProfileHeader = ({
  org_name,
  f_name,
  handleOpen,
  get_loading,
  success,
  admin,
  history,
  width
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    org_name ? setName(org_name) : setName(f_name);
  }, [org_name, f_name]);

  const displayUpdate = () => {
    if (!get_loading) {
      if (isWidthDown("xs", width)) {
        return (
          <IconButton color="secondary" size="medium" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        );
      } else {
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleOpen}
            style={{
              backgroundColor: success && green[500],
              borderColor: success && green[500]
            }}
          >
            {!success ? "Update Profile" : "Successfully Updated!"}
          </Button>
        );
      }
    }
  };

  const displayCreate = () => {
    if (admin && !isWidthDown("xs", width)) {
      return (
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variant="contained"
          size="small"
          onClick={() => history.push("/createLeague")}
          style={{
            backgroundColor: hover ? green[600] : green[400],
            borderColor: green[600]
          }}
        >
          Create New League
        </Button>
      );
    } else {
      return (
        <IconButton
          size="medium"
          onClick={handleOpen}
          style={{
            color: green[600],
            borderColor: green[600]
          }}
        >
          <AddCircleIcon />
        </IconButton>
      );
    }
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={2} sm={3}>
        {displayCreate()}
      </Grid>
      <Grid item xs={8} sm={6}>
        <Typography
          variant="h5"
          className={classes.title}
        >{`Welcome ${name}`}</Typography>
      </Grid>
      <Grid item xs={2} sm={3}>
        {displayUpdate()}
      </Grid>
    </Grid>
  );
};

export default withWidth()(ProfileHeader);

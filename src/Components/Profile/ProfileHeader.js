import React, { useState, useEffect } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./ProfileStyles";

import { green } from "@material-ui/core/colors";

const ProfileHeader = ({
  org_name,
  f_name,
  handleOpen,
  get_loading,
  success
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");

  useEffect(() => {
    org_name ? setName(org_name) : setName(f_name);
  }, [org_name, f_name]);

  return (
    <Grid container>
      <Grid item xs={0} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h5"
          className={classes.title}
        >{`Welcome ${name}`}</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        {!get_loading && (
          <Button
            variant={!success ? "outlined" : "contained"}
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
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;

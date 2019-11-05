import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
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
    <div className={classes.header}>
      <Typography
        variant="h5"
        className={classes.title}
      >{`Welcome ${name}`}</Typography>
      {!get_loading && (
        <Button
          variant={!success ? "outlined" : "contained"}
          color="secondary"
          size="small"
          className={classes.updateButton}
          onClick={handleOpen}
          style={{
            backgroundColor: success && green[500],
            borderColor: success && green[500]
          }}
        >
          {!success ? "Update Profile" : "Successfully Updated!"}
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;

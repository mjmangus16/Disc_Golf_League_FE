import React, { useState, useEffect } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./ProfileStyles";

import { green } from "@material-ui/core/colors";

const ProfileHeader = ({
  org_name,
  f_name,
  handleOpen,
  get_loading,
  success,
  admin
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    org_name ? setName(org_name) : setName(f_name);
  }, [org_name, f_name]);

  return (
    <Grid container>
      <Grid item sm={3}>
        {admin && (
          <Link to="/createLeague" style={{ textDecoration: "none" }}>
            <Button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              variant="outlined"
              size="small"
              style={{
                backgroundColor: hover ? green[600] : green[400],
                borderColor: green[600]
              }}
            >
              Create New League
            </Button>
          </Link>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h5"
          className={classes.title}
        >{`Welcome ${name}`}</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        {!get_loading && (
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
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;

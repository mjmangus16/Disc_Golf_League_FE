import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../../Redux/actions/authActions";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./AuthFormStyles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Signup = ({ loading, signup, errors, history }) => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState({
    org_name: "",
    email: "",
    password: "",
    f_name: "",
    l_name: ""
  });

  const onChangeHandler = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const redirect = () => history.push("/signin");
    signup(newUser, redirect);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="org_name"
                label="Organization Name (Not Required)"
                name="org_name"
                autoComplete="org_name"
                onChange={e => onChangeHandler(e)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.f_name ? true : false}
                helperText={errors.f_name && errors.f_name}
                autoComplete="fname"
                name="f_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.l_name ? true : false}
                helperText={errors.l_name && errors.l_name}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="l_name"
                autoComplete="lname"
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email && errors.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password ? true : false}
                helperText={errors.password && errors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
          </Grid>
          {!errors.message ? (
            <Typography variant="body2" className={classes.errorText}>
              Sorry, we are not currently accepting new users.
            </Typography>
          ) : (
            <Typography variant="body2" className={classes.errorText}>
              {errors.message}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => handleSubmit(e)}
          >
            <div className={classes.loading_error_wrapper}>
              {!loading ? (
                <Typography>SIGN UP</Typography>
              ) : (
                <CircularProgress
                  size={32}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2" className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

Signup.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { signup }
)(Signup);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../../Redux/actions/authActions";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
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
  CircularProgress,
  Tooltip
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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

const Signup = ({
  loading,
  signup,
  errors,
  history,
  addBreadcrumb,
  breadcrumbs
}) => {
  const classes = useStyles();
  const [typeSelected, setTypeSelected] = useState(false);
  const [admin, setAdmin] = useState(false);
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

  const handleManagerSelect = () => {
    setTypeSelected(true);
    setAdmin(true);
  };

  const handleParticipantSelect = () => {
    setTypeSelected(true);
    setAdmin(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const redirect = () => history.push("/signin");
    const addCrumb = () =>
      addBreadcrumb(breadcrumbs, {
        name: "Sign In",
        url: "/signin"
      });
    const userData = {
      ...newUser,
      admin
    };
    signup(userData, redirect, addCrumb);
  };

  return (
    <Container component="main" className={classes.authContainer}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.toggleUserType}>
          <Typography variant="body1" paragraph>
            Please select the type of user you want to create.
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Tooltip
                placement="top"
                title="League Managers can create and manage leagues but can not be used to participate in leagues."
              >
                <Button
                  variant={typeSelected && admin ? "contained" : "outlined"}
                  onClick={handleManagerSelect}
                  color={typeSelected && admin ? "secondary" : "primary"}
                >
                  League Manager
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip
                placement="top"
                title="League Participants can join and participate in leagues but can not create a league of their own."
              >
                <Button
                  variant={typeSelected && !admin ? "contained" : "outlined"}
                  onClick={handleParticipantSelect}
                  color={typeSelected && !admin ? "secondary" : "primary"}
                >
                  League Participant
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {admin && (
              <Grid item xs={12}>
                <TextField
                  disabled={!typeSelected}
                  variant="outlined"
                  fullWidth
                  id="org_name"
                  label="Organization Name (Not Required)"
                  name="org_name"
                  autoComplete="org_name"
                  onChange={e => onChangeHandler(e)}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!typeSelected}
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
                disabled={!typeSelected}
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
                disabled={!typeSelected}
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
                disabled={!typeSelected}
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
          {!errors.signup_message ? (
            <Typography variant="body2" className={classes.errorText}>
              Sorry, we are not currently accepting new users.
            </Typography>
          ) : (
            <Typography variant="body2" className={classes.errorText}>
              {errors.signup_message}
            </Typography>
          )}

          <Button
            disabled={!typeSelected}
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
              <Link
                to="/signin"
                variant="body2"
                className={classes.link}
                onClick={() =>
                  addBreadcrumb(breadcrumbs, {
                    name: "Sign In",
                    url: "/signin"
                  })
                }
              >
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
  errors: PropTypes.object.isRequired,
  breadcrumbs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
  breadcrumbs: state.breadcrumbs.breadcrumbs
});

export default connect(
  mapStateToProps,
  { signup, addBreadcrumb }
)(Signup);

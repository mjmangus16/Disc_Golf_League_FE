import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signin } from "../../Redux/actions/authActions";
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

const Signin = ({
  signin,
  success,
  history,
  errors,
  loading,
  addBreadcrumb,
  breadcrumbs
}) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const redirect = () => history.push("/profile");
    const addCrumb = () =>
      addBreadcrumb(breadcrumbs, {
        name: "Profile",
        url: "/profile"
      });
    signin(user, redirect, addCrumb);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {success && (
          <Typography variant="body2" className={classes.successText}>
            {success}
          </Typography>
        )}
        <form className={classes.form} noValidate>
          <TextField
            error={errors.email ? true : false}
            helperText={errors.email && errors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => onChangeHandler(e)}
          />
          <TextField
            error={errors.password ? true : false}
            helperText={errors.password && errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => onChangeHandler(e)}
          />
          {errors.signin_message && (
            <Typography variant="body2" className={classes.errorText}>
              {errors.signin_message}
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
                <Typography>SIGN IN</Typography>
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
                to="/signup"
                variant="body2"
                className={classes.link}
                onClick={() =>
                  addBreadcrumb(breadcrumbs, {
                    name: "Sign Up",
                    url: "/signup"
                  })
                }
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

Signin.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  breadcrumbs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
  success: state.auth.success,
  breadcrumbs: state.breadcrumbs.breadcrumbs
});

export default connect(mapStateToProps, { signin, addBreadcrumb })(Signin);

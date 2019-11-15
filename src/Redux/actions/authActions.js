import jwt_decode from "jwt-decode";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { setAuthToken } from "../../utils/decodeToken";
import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_FAILED,
  SET_CURRENT_USER,
  CLEAR_LEAGUES,
  CLEAR_PROFILE
} from "../types";

export const signup = (newUser, redirect, addCrumb) => dispatch => {
  dispatch({
    type: SIGNUP_LOADING
  });
  axiosWithAuth()
    .post("/api/users/signup", newUser)
    .then(res => {
      redirect();
      addCrumb();
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.message
      });
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_FAILED,
        payload: err.response.data
      });
    });
};

export const signin = (user, redirect, addCrumb) => dispatch => {
  dispatch({
    type: SIGNIN_LOADING
  });
  axiosWithAuth()
    .post("/api/users/signin", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      redirect();
      addCrumb();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SIGNIN_FAILED,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({
    type: CLEAR_LEAGUES
  });
  dispatch({
    type: CLEAR_PROFILE
  });
};

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import axios from "axios";
import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED
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
      redirect();
      addCrumb();
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SIGNIN_FAILED,
        payload: err.response.data
      });
    });
};

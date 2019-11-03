import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  setCurrentUser,
  logoutUser
  // clearCurrentUser
} from "../Redux/actions/authActions";
import { SET_CURRENT_USER } from "../Redux/types";

export const decodeToken = store => {
  // Check for token
  if (localStorage.token) {
    // Set auth token header auth
    setAuthToken(localStorage.token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      logoutUser();
      // Clear current Profile
      // store.dispatch(clearCurrentProfile());
      // Redirect to home
      window.location.href = "/";
    }
  }
};

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

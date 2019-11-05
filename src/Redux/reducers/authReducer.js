import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_FAILED,
  SET_CURRENT_USER
} from "../types";

import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  email: null,
  iat: null,
  exp: null,
  loading: false,
  errors: {},
  success: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
        success: action.payload
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    case SIGNIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        loading: false,
        errors: {},
        email: action.payload.email,
        iat: action.payload.iat,
        exp: action.payload.exp,
        success: null
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

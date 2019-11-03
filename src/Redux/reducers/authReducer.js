import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED
} from "../types";

const initialState = {
  org_name: null,
  email: null,
  f_name: null,
  l_name: null,
  token: null,
  user_id: null,
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
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
        org_name: action.payload.org_name ? action.payload.org_name : null,
        email: action.payload.email,
        f_name: action.payload.f_name,
        l_name: action.payload.l_name,
        token: action.payload.token,
        user_id: action.payload.user_id,
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

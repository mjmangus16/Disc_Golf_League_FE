import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED
} from "../types";

const initialState = {
  organization: null,
  f_name: null,
  l_name: null,
  token: null,
  user_id: null,
  loading: false,
  errors: {},
  message: null
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
        message: action.payload
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

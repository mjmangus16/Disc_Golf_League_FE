import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  CLEAR_ERRORS,
  CLEAR_UPDATE_SUCCESS
} from "../types";

const initialState = {
  f_name: null,
  l_name: null,
  user_id: null,
  org_name: null,
  get_loading: false,
  update_loading: false,
  errors: {},
  update_success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_LOADING:
      return {
        ...state,
        get_loading: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        get_loading: false,
        f_name: action.payload.f_name,
        l_name: action.payload.l_name,
        user_id: action.payload.user_id,
        org_name: action.payload.org_name,
        errors: {}
      };
    case GET_PROFILE_FAILED:
      return {
        ...state,
        get_loading: false,
        errors: action.payload
      };
    case UPDATE_PROFILE_LOADING:
      return {
        ...state,
        update_loading: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        update_loading: false,
        f_name: action.payload.f_name,
        l_name: action.payload.l_name,
        org_name: action.payload.org_name,
        update_success: true,
        errors: {}
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        update_loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      };
    case CLEAR_UPDATE_SUCCESS:
      return {
        ...state,
        update_success: false
      };
    default:
      return state;
  }
};

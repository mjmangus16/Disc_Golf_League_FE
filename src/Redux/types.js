// BREADCRUMBS TYPES
export const ADD_BREADCRUMB = "ADD_BREADCRUMB";
export const SELECT_BREADCRUMB = "SELECT_BREADCRUMB";

// AUTH TYPES
export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const SIGNIN_LOADING = "SIGNIN_LOADING";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

// PROFILE TYPES
export const GET_PROFILE_LOADING = "GET_PROFILE_LOADING";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILED = "GET_PROFILE_FAILED";

export const UPDATE_PROFILE_LOADING = "UPDATE_PROFILE_LOADING";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED";

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const CLEAR_UPDATE_SUCCESS = "CLEAR_UPDATE_SUCCESS";

export const CLEAR_PROFILE = "CLEAR_PROFILE";

// LEAGUE TYPES

export const GET_ALL_LEAGUES_LOADING = "GET_ALL_LEAGUES_LOADING";
export const GET_ALL_LEAGUES_SUCCESS = "GET_ALL_LEAGUES_SUCCESS";
export const GET_ALL_LEAGUES_FAILED = "GET_ALL_LEAGUES_FAILED";

export const GET_LEAGUES_BY_STATE_SUCCESS = "GET_LEAGUES_BY_STATE_SUCCESS";
export const GET_LEAGUES_BY_VAL_SUCCESS = "GET_LEAGUES_BY_NAME_SUCCESS";

export const GET_MANAGER_LEAGUES_LOADING = "GET_MANAGER_LEAGUES_LOADING";
export const GET_MANAGER_LEAGUES_SUCCESS = "GET_MANAGER_LEAGUES_SUCCESS";
export const GET_MANAGER_LEAGUES_FAILED = "GET_MANAGER_LEAGUES_FAILED";

export const GET_USER_LEAGUES_LOADING = "GET_USER_LEAGUES_LOADING";
export const GET_USER_LEAGUES_SUCCESS = "GET_USER_LEAGUES_SUCCESS";
export const GET_USER_LEAGUES_FAILED = "GET_USER_LEAGUES_FAILED";

export const GET_LEAGUE_BY_ID_LOADING = "GET_LEAGUE_BY_ID_LOADING";
export const GET_LEAGUE_BY_ID_SUCCESS = "GET_LEAGUE_BY_ID_SUCCESS";
export const GET_LEAGUE_BY_ID_FAILED = "GET_LEAGUE_BY_ID_FAILED";

export const CREATE_NEW_LEAGUE_LOADING = "CREATE_NEW_LEAGUE_LOADING";
export const CREATE_NEW_LEAGUE_SUCCESS = "CREATE_NEW_LEAGUE_SUCCESS";
export const CREATE_NEW_LEAGUE_FAILED = "CREATE_NEW_LEAGUE_FAILED";

export const EDIT_LEAGUE_LOADING = "EDIT_LEAGUE_LOADING";
export const EDIT_LEAGUE_SUCCESS = "EDIT_LEAGUE_SUCCESS";
export const EDIT_LEAGUE_FAILED = "EDIT_LEAGUE_FAILED";

// SCHEDULE TYPES

export const GET_SCHEDULE_LOADING = "GET_SCHEDULE_LOADING";
export const GET_SCHEDULE_SUCCESS = "GET_SCHEDULE_SUCCESS";
export const GET_SCHEDULE_FAILED = "GET_SCHEDULE_FAILED";

export const REMOVE_WEEK_FROM_SCHEDULE_LOADING =
  "REMOVE_WEEK_FROM_SCHEDULE_LOADING";
export const REMOVE_WEEK_FROM_SCHEDULE_SUCCESS =
  "REMOVE_WEEK_FROM_SCHEDULE_SUCCESS";
export const REMOVE_WEEK_FROM_SCHEDULE_FAILED =
  "REMOVE_WEEK_FROM_SCHEDULE_FAILED";

export const SUBMIT_SCHEDULE_CHANGES = "SUBMIT_SCHEDULE_CHANGES";

export const SUBMIT_SCHEDULE_LOADING = "SUBMIT_SCHEDULE_LOADING";
export const SUBMIT_SCHEDULE_SUCCESS = "SUBMIT_SCHEDULE_SUCCESS";
export const SUBMIT_SCHEDULE_FAILED = "SUBMIT_SCHEDULE_FAILED";

export const UPDATE_SCHEDULE_LOADING = "UPDATE_SCHEDULE_LOADING";
export const UPDATE_SCHEDULE_SUCCESS = "UPDATE_SCHEDULE_SUCCESS";
export const UPDATE_SCHEDULE_FAILED = "UPDATE_SCHEDULE_FAILED";

// MEMBER TYPES

export const GET_MEMBERS_BY_LEAGUE_ID_LOADING =
  "GET_MEMBERS_BY_LEAGUE_ID_LOADING";
export const GET_MEMBERS_BY_LEAGUE_ID_SUCCESS =
  "GET_MEMBERS_BY_LEAGUE_ID_SUCCESS";
export const GET_MEMBERS_BY_LEAGUE_ID_FAILED =
  "GET_MEMBERS_BY_LEAGUE_ID_FAILED";

export const GET_MEMBER_BY_MEMBER_ID_LOADING =
  "GET_MEMBER_BY_MEMBER_ID_LOADING";
export const GET_MEMBER_BY_MEMBER_ID_SUCCESS =
  "GET_MEMBER_BY_MEMBER_ID_SUCCESS";
export const GET_MEMBER_BY_MEMBER_ID_FAILED = "GET_MEMBER_BY_MEMBER_ID_FAILED";

export const SUBMIT_MEMBER_TO_LEAGUE_LOADING =
  "SUBMIT_MEMBER_TO_LEAGUE_LOADING";
export const SUBMIT_MEMBER_TO_LEAGUE_SUCCESS =
  "SUBMIT_MEMBER_TO_LEAGUE_SUCCESS";
export const SUBMIT_MEMBER_TO_LEAGUE_FAILED = "SUBMIT_MEMBER_TO_LEAGUE_FAILED";

export const REMOVE_MEMBER_FROM_LEAGUE_LOADING =
  "REMOVE_MEMBER_FROM_LEAGUE_LOADING";
export const REMOVE_MEMBER_FROM_LEAGUE_SUCCESS =
  "REMOVE_MEMBER_FROM_LEAGUE_SUCCESS";
export const REMOVE_MEMBER_FROM_LEAGUE_FAILED =
  "REMOVE_MEMBER_FROM_LEAGUE_FAILED";

export const UPDATE_MEMBER_LOADING = "UPDATE_MEMBER_LOADING";
export const UPDATE_MEMBER_SUCCESS = "UPDATE_MEMBER_SUCCESS";
export const UPDATE_MEMBER_FAILED = "UPDATE_MEMBER_FAILED";
export const CLEAR_MEMBER_UPDATE_SUCCESS = "CLEAR_MEMBER_UPDATE_SUCCESS";

// ROUND TYPES

export const GET_ROUNDS_BY_LEAGUE_ID_LOADING =
  "GET_ROUNDS_BY_LEAGUE_ID_LOADING";
export const GET_ROUNDS_BY_LEAGUE_ID_SUCCESS =
  "GET_ROUNDS_BY_LEAGUE_ID_SUCCESS";
export const GET_ROUNDS_BY_LEAGUE_ID_FAILED = "GET_ROUNDS_BY_LEAGUE_ID_FAILED";

export const GET_ROUND_BY_ROUND_ID_LOADING = "GET_ROUND_BY_ROUND_ID_LOADING";
export const GET_ROUND_BY_ROUND_ID_SUCCESS = "GET_ROUND_BY_ROUND_ID_SUCCESS";
export const GET_ROUND_BY_ROUND_ID_FAILED = "GET_ROUND_BY_ROUND_ID_FAILED";

export const ADD_PARTICIPANT_LOADING = "ADD_PARTICIPANT_LOADING";
export const ADD_PARTICIPANT_SUCCESS = "ADD_PARTICIPANT_SUCCESS";
export const ADD_PARTICIPANT_FAILED = "ADD_PARTICIPANT_FAILED";

export const ADD_ROUND_FAILED = "ADD_ROUND_FAILED";

export const UPDATE_ROUND_LOADING = "UPDATE_ROUND_LOADING";
export const UPDATE_ROUND_SUCCESS = "UPDATE_ROUND_SUCCESS";
export const UPDATE_ROUND_FAILED = "UPDATE_ROUND_FAILED";

export const DELETE_PARTICIPANT_LOADING = "DELETE_PARTICIPANT_LOADING";
export const DELETE_PARTICIPANT_SUCCESS = "DELETE_PARTICIPANT_SUCCESS";
export const DELETE_PARTICIPANT_FAILED = "DELETE_PARTICIPANT_FAILED";

// CLEAR TYPES

export const CLEAR_LEAGUES = "CLEAR_LEAGUES";
export const CLEAR_LEAGUE_DATA = "CLEAR_LEAGUE_DATA";
export const CLEAR_SCHEDULE = "CLEAR_SCHEDULE";
export const CLEAR_ROUNDS = "CLEAR_ROUNDS";
export const CLEAR_MEMBERS = "CLEAR_MEMBERS";
export const CLEAR_SELECTED_ROUND_DATA = "CLEAR_SELECTED_ROUND_DATA";
export const CLEAR_SELECTED_MEMBER_DATA = "CLEAR_SELECTED_MEMBER_DATA";

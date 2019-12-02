import {
  GET_SCHEDULE_LOADING,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILED,
  REMOVE_WEEK_FROM_SCHEDULE_SUCCESS,
  SUBMIT_SCHEDULE_LOADING,
  SUBMIT_SCHEDULE_SUCCESS,
  SUBMIT_SCHEDULE_FAILED,
  UPDATE_SCHEDULE_LOADING,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILED
} from "../types";

const initialState = {
  schedule: [],
  getScheduleLoading: false,
  getScheduleFailed: {},
  submitScheduleLoading: false,
  submitScheduleFailed: {},
  updateScheduleLoading: false,
  updateScheduleFailed: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_LOADING:
      return {
        ...state,
        getScheduleLoading: true,
        getScheduleFailed: {}
      };
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        getScheduleLoading: false,
        schedule: action.payload
      };
    case GET_SCHEDULE_FAILED:
      return {
        ...state,
        getScheduleLoading: false,
        getScheduleFailed: action.payload,
        schedule: []
      };
    case REMOVE_WEEK_FROM_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.payload
      };
    case SUBMIT_SCHEDULE_LOADING:
      return {
        ...state,
        submitScheduleLoading: true,
        submitScheduleFailed: {}
      };
    case SUBMIT_SCHEDULE_SUCCESS:
      return {
        ...state,
        submitScheduleLoading: false,
        schedule: [...state.schedule, action.payload]
      };
    case SUBMIT_SCHEDULE_FAILED:
      return {
        ...state,
        submitScheduleFailed: action.payload,
        submitScheduleLoading: false
      };
    case UPDATE_SCHEDULE_LOADING:
      return {
        ...state,
        updateScheduleLoading: true,
        submitScheduleFailed: {}
      };
    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        updateScheduleLoading: false,
        schedule: action.payload
      };
    case UPDATE_SCHEDULE_FAILED:
      return {
        ...state,
        updateScheduleLoading: false,
        submitScheduleFailed: action.payload
      };
    default:
      return state;
  }
};

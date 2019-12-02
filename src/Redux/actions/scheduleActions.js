import { axiosWithAuth } from "../../utils/axiosWithAuth";
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

export const getScheduleByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_SCHEDULE_LOADING
  });
  axiosWithAuth()
    .get(`api/schedules/league/${league_id}`)
    .then(res => {
      dispatch({
        type: GET_SCHEDULE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_SCHEDULE_FAILED,
        payload: err.response.data
      });
    });
};

export const submitSchedule = (league_id, data) => dispatch => {
  dispatch({
    type: SUBMIT_SCHEDULE_LOADING
  });
  axiosWithAuth()
    .post(`api/schedules/league/${league_id}`, { ...data, league_id })
    .then(res => {
      dispatch({
        type: SUBMIT_SCHEDULE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SUBMIT_SCHEDULE_FAILED,
        payload: err.response.data
      });
    });
};

export const updateWeekInSchedule = (league_id, changes) => dispatch => {
  dispatch({
    type: UPDATE_SCHEDULE_LOADING
  });
  axiosWithAuth()
    .put(`api/schedules/league/${league_id}/${changes.schedule_id}`, changes)
    .then(res => {
      dispatch({
        type: UPDATE_SCHEDULE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: UPDATE_SCHEDULE_FAILED,
        payload: err.response.data
      });
    });
};

export const removeWeekFromSchedule = (schedule_id, league_id) => dispatch => {
  axiosWithAuth()
    .delete(`api/schedules/league/${league_id}/${schedule_id}`)
    .then(res => {
      dispatch({
        type: REMOVE_WEEK_FROM_SCHEDULE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

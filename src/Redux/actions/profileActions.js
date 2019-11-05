import { axiosWithAuth } from "../../utils/axiosWithAuth";
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

export const getProfile = email => dispatch => {
  dispatch({
    type: GET_PROFILE_LOADING
  });
  axiosWithAuth()
    .get(`/api/users/email/${email}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE_FAILED,
        payload: err.response.data
      });
    });
};

export const updateProfile = (id, changes, closeModal) => dispatch => {
  dispatch({
    type: UPDATE_PROFILE_LOADING
  });
  axiosWithAuth()
    .put(`/api/users/update/${id}`, changes)
    .then(res => {
      closeModal(false);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_UPDATE_SUCCESS
        });
      }, 10000);
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PROFILE_FAILED,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

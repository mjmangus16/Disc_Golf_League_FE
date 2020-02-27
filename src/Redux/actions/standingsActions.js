import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_STANDINGS_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_BY_LEAGUE_ID_FAILED,
  GET_STANDINGS_FORMATS_LOADING,
  GET_STANDINGS_FORMATS_SUCCESS,
  GET_STANDINGS_FORMATS_FAILED,
  CLEAR_STANDINGS_RESULTS
} from "../types";

export const getStandingsFormats = () => dispatch => {
  dispatch({
    type: GET_STANDINGS_FORMATS_LOADING
  });
  axiosWithAuth()
    .get("api/standings/formats")
    .then(res => {
      dispatch({
        type: GET_STANDINGS_FORMATS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STANDINGS_FORMATS_FAILED,
        payload: err.response.data
      });
    });
};

export const getStandingsResults = league_id => dispatch => {
  dispatch({ type: GET_STANDINGS_BY_LEAGUE_ID_LOADING });
  axiosWithAuth()
    .get(`api/standings/league/${league_id}/results`)
    .then(res => {
      dispatch({
        type: GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STANDINGS_BY_LEAGUE_ID_FAILED,
        payload: err.response.data
      });
    });
};

export const clearStandingsResults = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_RESULTS });
};

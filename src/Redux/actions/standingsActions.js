import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_STANDINGS_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_BY_LEAGUE_ID_FAILED,
  GET_STANDINGS_FORMATS_LOADING,
  GET_STANDINGS_FORMATS_SUCCESS,
  GET_STANDINGS_FORMATS_FAILED,
  GET_STANDINGS_FORMAT_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_FORMAT_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_FORMAT_BY_LEAGUE_ID_FAILED,
  CONNECT_FORMAT_TO_LEAGUE_LOADING,
  CONNECT_FORMAT_TO_LEAGUE_SUCCESS,
  CONNECT_FORMAT_TO_LEAGUE_FAILED,
  CLEAR_STANDINGS_RESULTS,
  CLEAR_STANDINGS_FORMATS,
  CLEAR_STANDINGS_LEAGUE_FORMAT
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

export const getStandingsFormatByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_STANDINGS_FORMAT_BY_LEAGUE_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/standings/league/${league_id}`)
    .then(res => {
      dispatch({
        type: GET_STANDINGS_FORMAT_BY_LEAGUE_ID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STANDINGS_FORMAT_BY_LEAGUE_ID_FAILED,
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

export const connectFormatToLeague = (
  league_id,
  standings_format_id,
  data
) => dispatch => {
  dispatch({
    type: CONNECT_FORMAT_TO_LEAGUE_LOADING
  });
  axiosWithAuth()
    .post(`/league/${league_id}/add/format/${standings_format_id}`)
    .then(res => {
      dispatch({
        type: CONNECT_FORMAT_TO_LEAGUE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: CONNECT_FORMAT_TO_LEAGUE_FAILED,
        payload: err.response.data
      });
    });
};

export const clearStandingsResults = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_RESULTS });
};
export const clearStandingsFormats = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_FORMATS });
};
export const clearStandingsLeagueFormat = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_LEAGUE_FORMAT });
};

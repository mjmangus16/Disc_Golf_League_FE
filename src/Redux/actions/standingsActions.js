import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_STANDINGS_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_BY_LEAGUE_ID_FAILED,
  CLEAR_STANDINGS_RESULTS
} from "../types";

export const getStandingsFormats = () => {};

export const getStandingsResults = league_id => dispatch => {
  console.log("WORKING");
  dispatch({ type: GET_STANDINGS_BY_LEAGUE_ID_LOADING });
  axiosWithAuth()
    .get(`api/standings/league/${league_id}/results`)
    .then(res => {
      console.log(res);
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

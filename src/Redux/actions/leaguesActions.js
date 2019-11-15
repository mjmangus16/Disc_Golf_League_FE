import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_MANAGER_LEAGUES_LOADING,
  GET_MANAGER_LEAGUES_SUCCESS,
  GET_MANAGER_LEAGUES_FAILED,
  GET_LEAGUE_BY_ID_LOADING,
  GET_LEAGUE_BY_ID_SUCCESS,
  GET_LEAGUE_BY_ID_FAILED
} from "../types";

export const getManagerLeagues = () => dispatch => {
  dispatch({
    type: GET_MANAGER_LEAGUES_LOADING
  });
  axiosWithAuth()
    .get("api/leagues/owner")
    .then(leagues => {
      const container = leagues.data.map(league => {
        return {
          league_id: league.league_id,
          name: league.name,
          type: league.type,
          days: league.days,
          location: league.location
        };
      });
      dispatch({
        type: GET_MANAGER_LEAGUES_SUCCESS,
        payload: container
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_MANAGER_LEAGUES_FAILED,
        payload: err.response
      });
    });
};

export const getLeagueById = () => dispatch => {
  dispatch({
    type: GET_LEAGUE_BY_ID_LOADING
  });
};

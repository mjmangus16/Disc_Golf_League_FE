import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_MANAGER_LEAGUES_LOADING,
  GET_MANAGER_LEAGUES_SUCCESS,
  GET_MANAGER_LEAGUES_FAILED,
  GET_LEAGUE_BY_ID_LOADING,
  GET_LEAGUE_BY_ID_SUCCESS,
  GET_LEAGUE_BY_ID_FAILED,
  GET_MEMBERS_BY_LEAGUE_ID_LOADING,
  GET_MEMBERS_BY_LEAGUE_ID_SUCCESS,
  GET_MEMBERS_BY_LEAGUE_ID_FAILED
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
        payload: err.response.data
      });
    });
};

export const getLeagueById = league_id => dispatch => {
  dispatch({
    type: GET_LEAGUE_BY_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/leagues/id/${league_id}`)
    .then(league => {
      dispatch({
        type: GET_LEAGUE_BY_ID_SUCCESS,
        payload: league.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_LEAGUE_BY_ID_FAILED,
        payload: err.response.data
      });
    });
};

export const getMembersByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_MEMBERS_BY_LEAGUE_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/members/league/${league_id}`)
    .then(members => {
      dispatch({
        type: GET_MEMBERS_BY_LEAGUE_ID_SUCCESS,
        payload: members.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_MEMBERS_BY_LEAGUE_ID_FAILED,
        payload: err.response.data
      });
    });
};

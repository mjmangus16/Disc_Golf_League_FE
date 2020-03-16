import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_ALL_LEAGUES_LOADING,
  GET_ALL_LEAGUES_SUCCESS,
  GET_ALL_LEAGUES_FAILED,
  GET_LEAGUES_BY_STATE_SUCCESS,
  GET_LEAGUES_BY_VAL_SUCCESS,
  GET_MANAGER_LEAGUES_LOADING,
  GET_MANAGER_LEAGUES_SUCCESS,
  GET_MANAGER_LEAGUES_FAILED,
  GET_USER_LEAGUES_LOADING,
  GET_USER_LEAGUES_SUCCESS,
  GET_USER_LEAGUES_FAILED,
  GET_LEAGUE_BY_ID_LOADING,
  GET_LEAGUE_BY_ID_SUCCESS,
  GET_LEAGUE_BY_ID_FAILED,
  CREATE_NEW_LEAGUE_LOADING,
  CREATE_NEW_LEAGUE_SUCCESS,
  CREATE_NEW_LEAGUE_FAILED,
  EDIT_LEAGUE_LOADING,
  EDIT_LEAGUE_SUCCESS,
  EDIT_LEAGUE_FAILED,
  CLEAR_LEAGUE_DATA,
  CLEAR_USER_LEAGUES
} from "../types";

export const getAllLeagues = () => dispatch => {
  dispatch({ type: GET_ALL_LEAGUES_LOADING });
  axiosWithAuth()
    .get("api/leagues/getLeagues")
    .then(res => {
      dispatch({ type: GET_ALL_LEAGUES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ALL_LEAGUES_FAILED,
        payload: err.response.data
      });
    });
};

export const getLeaguesByState = state => dispatch => {
  dispatch({ type: GET_ALL_LEAGUES_LOADING });
  axiosWithAuth()
    .get(`api/leagues/getLeagues/state/${state}`)
    .then(res => {
      dispatch({ type: GET_LEAGUES_BY_STATE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ALL_LEAGUES_FAILED,
        payload: err.response.data
      });
    });
};

export const getLeaguesByVal = (state, val, input) => dispatch => {
  dispatch({ type: GET_ALL_LEAGUES_LOADING });
  axiosWithAuth()
    .get(`api/leagues/getLeagues/state/${state}/val/${val}/input/${input}`)
    .then(res => {
      dispatch({ type: GET_LEAGUES_BY_VAL_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ALL_LEAGUES_FAILED,
        payload: err.response.data
      });
    });
};

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

export const getUserLeagues = () => dispatch => {
  dispatch({ type: GET_USER_LEAGUES_LOADING });
  axiosWithAuth()
    .get("/api/leagues/user")
    .then(res => {
      dispatch({ type: GET_USER_LEAGUES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_USER_LEAGUES_FAILED,
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

export const createNewLeague = (league_data, redirect) => dispatch => {
  dispatch({
    type: CREATE_NEW_LEAGUE_LOADING
  });

  axiosWithAuth()
    .post("api/leagues/create", league_data)
    .then(res => {
      dispatch({
        type: CREATE_NEW_LEAGUE_SUCCESS,
        payload: res.data
      });
      redirect(res.data.league_id);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: CREATE_NEW_LEAGUE_FAILED,
        payload: err.response.data
      });
    });
};

export const editLeague = (league_data, redirect) => dispatch => {
  dispatch({
    type: EDIT_LEAGUE_LOADING
  });
  axiosWithAuth()
    .put(`api/leagues/update/${league_data.league_id}`, league_data)
    .then(res => {
      dispatch({
        type: EDIT_LEAGUE_SUCCESS,
        payload: res.data
      });
      redirect();
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: EDIT_LEAGUE_FAILED,
        payload: err.response.data
      });
    });
};

export const clearLeagueData = () => dispatch => {
  dispatch({ type: CLEAR_LEAGUE_DATA });
};

export const clearUserLeagues = () => dispatch => {
  dispatch({ type: CLEAR_USER_LEAGUES });
};

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
  GET_MEMBERS_BY_LEAGUE_ID_FAILED,
  GET_ROUNDS_BY_LEAGUE_ID_LOADING,
  GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
  GET_ROUNDS_BY_LEAGUE_ID_FAILED,
  CREATE_NEW_LEAGUE_LOADING,
  CREATE_NEW_LEAGUE_SUCCESS,
  CREATE_NEW_LEAGUE_FAILED,
  EDIT_LEAGUE_LOADING,
  EDIT_LEAGUE_SUCCESS,
  EDIT_LEAGUE_FAILED,
  ADD_WEEK_TO_SCHEDULE_SUCCESS,
  REMOVE_WEEK_FROM_SCHEDULE_SUCCESS,
  SUBMIT_SCHEDULE_CHANGES,
  UPDATE_SCHEDULE_LOADING,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILED,
  CLEAR_LEAGUE_DATA
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

export const getRoundsByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_ROUNDS_BY_LEAGUE_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/rounds/league/${league_id}`)
    .then(rounds => {
      dispatch({
        type: GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
        payload: rounds.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ROUNDS_BY_LEAGUE_ID_FAILED,
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
      redirect(false);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: EDIT_LEAGUE_FAILED,
        payload: err.response.data
      });
    });
};

export const addWeekToSchedule = schedule => dispatch => {
  const container = schedule ? [...schedule] : [];
  container.push({
    date: "",
    all: "",
    recreational: "",
    intermediate: "",
    advanced: "",
    open: ""
  });
  dispatch({
    type: ADD_WEEK_TO_SCHEDULE_SUCCESS,
    payload: container
  });
};

export const removeWeekFromSchedule = (
  schedule,
  index,
  league_id,
  selectedLeague
) => dispatch => {
  const container = [...schedule];
  container.splice(index, 1);
  axiosWithAuth()
    .put(`api/leagues/update/${league_id}`, {
      ...selectedLeague,
      schedule: JSON.stringify(container)
    })
    .then(() => {
      dispatch({
        type: REMOVE_WEEK_FROM_SCHEDULE_SUCCESS,
        payload: { ...selectedLeague, schedule: container }
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export const scheduleUpdate = (
  schedule,
  league_id,
  selectedLeague
) => dispatch => {
  axiosWithAuth()
    .put(`api/leagues/update/${league_id}`, {
      ...selectedLeague,
      schedule: JSON.stringify(schedule)
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

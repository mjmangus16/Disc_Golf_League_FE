import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_ROUNDS_BY_LEAGUE_ID_LOADING,
  GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
  GET_ROUNDS_BY_LEAGUE_ID_FAILED,
  GET_ROUND_BY_ROUND_ID_LOADING,
  GET_ROUND_BY_ROUND_ID_SUCCESS,
  GET_ROUND_BY_ROUND_ID_FAILED,
  ADD_PARTICIPANT_LOADING,
  ADD_PARTICIPANT_SUCCESS,
  ADD_PARTICIPANT_FAILED,
  ADD_ROUND_FAILED,
  UPDATE_ROUND_LOADING,
  UPDATE_ROUND_SUCCESS,
  UPDATE_ROUND_FAILED,
  CLEAR_ROUNDS,
  CLEAR_SELECTED_ROUND_DATA,
  SORT_ROUND_BY_NAME,
  SORT_ROUND_BY_SCORE
} from "../types";

export const getRoundsByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_ROUNDS_BY_LEAGUE_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/rounds/league/${league_id}`)
    .then(res => {
      dispatch({
        type: GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
        payload: res.data
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

export const getRoundByRoundId = (league_id, round_id) => dispatch => {
  dispatch({ type: GET_ROUND_BY_ROUND_ID_LOADING });
  axiosWithAuth()
    .get(`api/rounds/league/${league_id}/round/${round_id}`)
    .then(res => {
      dispatch({
        type: GET_ROUND_BY_ROUND_ID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ROUND_BY_ROUND_ID_FAILED,
        payload: err.response.data
      });
    });
};

export const addRoundAndParticipants = (
  league_id,
  round,
  participants,
  redirect
) => async dispatch => {
  axiosWithAuth()
    .post(`api/rounds/add/league/${league_id}`, {
      date: round.date,
      type: round.type
    })
    .then(res => {
      axiosWithAuth()
        .post(
          `api/participants/league/${league_id}/round/${res.data.round_id}`,
          participants
        )
        .then(() => {
          redirect();
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: ADD_PARTICIPANT_FAILED,
            payload: err.response.data
          });
        });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: ADD_ROUND_FAILED,
        payload: err.response.data
      });
    });
};

export const addParticipant = (
  league_id,
  round_id,
  participant,
  trigger
) => dispatch => {
  dispatch({ type: ADD_PARTICIPANT_LOADING });
  axiosWithAuth()
    .post(`api/participants/league/${league_id}/round/${round_id}`, [
      participant
    ])
    .then(() => {
      dispatch({ type: ADD_PARTICIPANT_SUCCESS, payload: participant });
      trigger(false);
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_PARTICIPANT_FAILED, payload: err.response.data });
    });
};

export const updateRound = (league_id, round_id, changes) => dispatch => {
  dispatch({ type: UPDATE_ROUND_LOADING });
  console.log(changes);
  axiosWithAuth()
    .put(`api/rounds/update/${round_id}/league/${league_id}`, changes)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: UPDATE_ROUND_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_ROUND_FAILED, payload: err.response.data });
    });
};

export const updateMultipleParticipants = (
  league_id,
  round_id,
  participants
) => dispatch => {
  participants = participants.map(pa => {
    return {
      member_id: pa.member_id,
      participant_id: pa.participant_id,
      score: pa.score
    };
  });

  participants.forEach(async p => {
    await axiosWithAuth()
      .put(
        `api/participants/league/${league_id}/round/${round_id}/member/${p.member_id}/participant/${p.participant_id}`,
        p
      )
      .catch(err => {
        console.log(err);
      });
  });
};

export const deleteParticipant = (
  league_id,
  round_id,
  member_id,
  participant_id,
  removePart
) => dispatch => {
  axiosWithAuth()
    .delete(
      `api/participants/league/${league_id}/round/${round_id}/member/${member_id}/participant/${participant_id}`
    )
    .then(res => {
      console.log("SUCCESS");
      removePart();
    });
};

export const clearRoundsData = () => dispatch => {
  dispatch({ type: CLEAR_ROUNDS });
};

export const clearSelectedRoundData = () => dispatch => {
  dispatch({ type: CLEAR_SELECTED_ROUND_DATA });
};

export const sortRoundByName = (participants, order) => dispatch => {
  if (order === null || order === true) {
    participants.sort((a, b) => {
      return a.l_name.toLowerCase() <= b.l_name.toLowerCase() ? -1 : 1;
    });
  } else {
    participants.sort((a, b) => {
      return a.l_name.toLowerCase() >= b.l_name.toLowerCase() ? -1 : 1;
    });
  }

  dispatch({
    type: SORT_ROUND_BY_NAME,
    payload: participants
  });
};

export const sortRoundByScore = (participants, order) => dispatch => {
  if (order === null || order === true) {
    participants.sort((a, b) => a.score - b.score);
  } else {
    participants.sort((a, b) => b.score - a.score);
  }

  dispatch({
    type: SORT_ROUND_BY_SCORE,
    payload: participants
  });
};

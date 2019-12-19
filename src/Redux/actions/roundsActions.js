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
  ADD_PARTICIPANT_FAILED
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
  const newRound = await axiosWithAuth().post(
    `api/rounds/add/league/${league_id}`,
    {
      date: round.date,
      type: round.type
    }
  );

  axiosWithAuth()
    .post(
      `api/participants/league/${league_id}/round/${newRound.data.round_id}`,
      participants
    )
    .then(res => {
      redirect();
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
  console.log(participants);

  participants.forEach(async p => {
    await axiosWithAuth().put(
      `api/participants/league/${league_id}/round/${round_id}/member/${p.member_id}/participant/${p.participant_id}`,
      p
    );
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
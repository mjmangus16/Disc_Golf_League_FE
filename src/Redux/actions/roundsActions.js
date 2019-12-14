import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  GET_ROUNDS_BY_LEAGUE_ID_LOADING,
  GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
  GET_ROUNDS_BY_LEAGUE_ID_FAILED,
  GET_ROUND_BY_ROUND_ID_LOADING,
  GET_ROUND_BY_ROUND_ID_SUCCESS,
  GET_ROUND_BY_ROUND_ID_FAILED
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
  round_id,
  round,
  participants
) => async dispatch => {
  const newRound = await axiosWithAuth().post(
    `api/rounds/add/league/${league_id}`,
    {
      date: round.date,
      type: round.type
    }
  );

  axiosWithAuth().post(
    `api/participants/league/${league_id}/round/${newRound.data.round_id}`,
    participants
  );
};

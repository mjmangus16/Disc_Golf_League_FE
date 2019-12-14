import {
  GET_ROUNDS_BY_LEAGUE_ID_LOADING,
  GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
  GET_ROUNDS_BY_LEAGUE_ID_FAILED,
  GET_ROUND_BY_ROUND_ID_LOADING,
  GET_ROUND_BY_ROUND_ID_SUCCESS,
  GET_ROUND_BY_ROUND_ID_FAILED
} from "../types";

const initialState = {
  rounds: [],
  roundsLoading: false,
  roundsFailed: {},
  round: {},
  roundLoading: false,
  roundFailed: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUNDS_BY_LEAGUE_ID_LOADING:
      return {
        ...state,
        roundsLoading: true,
        roundsFailed: {}
      };
    case GET_ROUNDS_BY_LEAGUE_ID_SUCCESS:
      return {
        ...state,
        rounds: action.payload.reverse(),
        roundsLoading: false
      };
    case GET_ROUNDS_BY_LEAGUE_ID_FAILED:
      return {
        ...state,
        roundsFailed: action.payload,
        roundsLoading: false
      };
    case GET_ROUND_BY_ROUND_ID_LOADING:
      return {
        ...state,
        roundLoading: true,
        roundFailed: {}
      };
    case GET_ROUND_BY_ROUND_ID_SUCCESS:
      return {
        ...state,
        round: action.payload,
        roundLoading: false
      };
    case GET_ROUND_BY_ROUND_ID_FAILED:
      return {
        ...state,
        roundFailed: action.payload,
        roundLoading: false
      };
    default:
      return state;
  }
};

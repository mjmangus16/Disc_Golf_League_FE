import {
  GET_ROUNDS_BY_LEAGUE_ID_LOADING,
  GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
  GET_ROUNDS_BY_LEAGUE_ID_FAILED
} from "../types";

const initialState = {
  rounds: [],
  roundsLoading: false,
  roundsFailed: {}
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
    default:
      return state;
  }
};

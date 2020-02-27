import {
  GET_STANDINGS_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_BY_LEAGUE_ID_FAILED,
  CLEAR_STANDINGS_RESULTS
} from "../types";

const initialState = {
  standings: [],
  getStandingsLoading: false,
  getStandingsFailed: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STANDINGS_BY_LEAGUE_ID_LOADING:
      return {
        ...state,
        getStandingsLoading: true,
        getStandingsFailed: {}
      };
    case GET_STANDINGS_BY_LEAGUE_ID_SUCCESS:
      return {
        ...state,
        standings: action.payload,
        getStandingsLoading: false,
        getStandingsFailed: {}
      };
    case GET_STANDINGS_BY_LEAGUE_ID_FAILED:
      return {
        ...state,
        getStandingsLoading: false,
        getStandingsFailed: action.payload,
        standings: []
      };
    case CLEAR_STANDINGS_RESULTS:
      return {
        ...state,
        getStandingsLoading: false,
        getStandingsFailed: {},
        standings: []
      };
    default:
      return state;
  }
};

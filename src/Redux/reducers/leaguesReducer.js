import {
  GET_MANAGER_LEAGUES_LOADING,
  GET_MANAGER_LEAGUES_SUCCESS,
  GET_MANAGER_LEAGUES_FAILED,
  CLEAR_LEAGUES
} from "../types";

const initialState = {
  getManagerLeaguesLoading: true,
  getManagerLeaguesFailed: null,
  leagues: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MANAGER_LEAGUES_LOADING:
      return {
        ...state,
        getManagerLeaguesLoading: true
      };
    case GET_MANAGER_LEAGUES_SUCCESS:
      return {
        ...state,
        getManagerLeaguesLoading: false,
        leagues: action.payload
      };
    case GET_MANAGER_LEAGUES_FAILED:
      return {
        ...state,
        getManagerLeaguesLoading: false,
        getManagerLeaguesFailed: action.payload
      };
    case CLEAR_LEAGUES:
      return {
        ...state,
        getManagerLeaguesLoading: false,
        getManagerLeaguesFailed: null,
        leagues: null
      };
    default:
      return state;
  }
};

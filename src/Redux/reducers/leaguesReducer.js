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
  CLEAR_LEAGUES
} from "../types";

const initialState = {
  getManagerLeaguesLoading: true,
  getManagerLeaguesFailed: null,
  getLeagueByIdLoading: true,
  getLeagueByIdFailed: null,
  leagues: [],
  selectedLeague: {},
  selectedLeagueMembersLoading: true,
  selectedLeagueMembersFailed: null,
  selectedLeagueMembers: []
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
        leagues: action.payload,
        getManagerLeaguesLoading: false
      };
    case GET_MANAGER_LEAGUES_FAILED:
      return {
        ...state,
        getManagerLeaguesFailed: action.payload,
        getManagerLeaguesLoading: false
      };
    case GET_LEAGUE_BY_ID_LOADING:
      return {
        ...state,
        getLeagueByIdLoading: true
      };
    case GET_LEAGUE_BY_ID_SUCCESS:
      return {
        ...state,
        selectedLeague: action.payload,
        getLeagueByIdLoading: false
      };
    case GET_LEAGUE_BY_ID_FAILED:
      return {
        ...state,
        getLeagueByIdFailed: action.payload,
        getLeagueByIdLoading: false
      };
    case GET_MEMBERS_BY_LEAGUE_ID_LOADING:
      return {
        ...state,
        selectedLeagueMembersLoading: true
      };
    case GET_MEMBERS_BY_LEAGUE_ID_SUCCESS:
      return {
        ...state,
        selectedLeagueMembers: action.payload,
        selectedLeagueMembersLoading: false
      };
    case CLEAR_LEAGUES:
      return {
        ...state,
        getManagerLeaguesLoading: false,
        getManagerLeaguesFailed: null,
        leagues: []
      };
    default:
      return state;
  }
};

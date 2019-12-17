import {
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
  CLEAR_LEAGUES
} from "../types";

const initialState = {
  getManagerLeaguesLoading: false,
  getManagerLeaguesFailed: {},
  getUserLeaguesLoading: false,
  getUserLeaguesFailed: {},
  getLeagueByIdLoading: false,
  getLeagueByIdFailed: {},
  leagues: [],
  selectedLeague: {},
  createNewLeagueLoading: false,
  createNewLeagueFailed: {},
  editLeagueLoading: false,
  editLeagueFailed: {}
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
    case GET_USER_LEAGUES_LOADING:
      return {
        ...state,
        getUserLeaguesLoading: true,
        getUserLeaguesFailed: {}
      };
    case GET_USER_LEAGUES_SUCCESS:
      return {
        ...state,
        getUserLeaguesLoading: false,
        leagues: action.payload
      };
    case GET_USER_LEAGUES_FAILED:
      return {
        ...state,
        getUserLeaguesLoading: false,
        getUserLeaguesFailed: action.payload
      };
    case GET_LEAGUE_BY_ID_LOADING:
      return {
        ...state,
        getLeagueByIdLoading: true,
        getLeagueByIdFailed: {}
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
    case CREATE_NEW_LEAGUE_LOADING:
      return {
        ...state,
        createNewLeagueLoading: true
      };
    case CREATE_NEW_LEAGUE_SUCCESS:
      return {
        ...state,
        selectedLeague: action.payload,
        createNewLeagueLoading: false,
        createNewLeagueFailed: {}
      };
    case CREATE_NEW_LEAGUE_FAILED:
      return {
        ...state,
        createNewLeagueFailed: action.payload,
        createNewLeagueLoading: false
      };
    case EDIT_LEAGUE_LOADING:
      return {
        ...state,
        editLeagueLoading: true,
        editLeagueFailed: {}
      };
    case EDIT_LEAGUE_SUCCESS:
      return {
        ...state,
        selectedLeague: action.payload,
        editLeagueLoading: false
      };
    case EDIT_LEAGUE_FAILED:
      return {
        ...state,
        editLeagueFailed: action.payload,
        editLeagueLoading: false
      };

    case CLEAR_LEAGUE_DATA:
      return {
        ...state,
        getLeagueByIdLoading: false,
        getLeagueByIdFailed: null,
        selectedLeague: {},
        selectedLeagueMembersLoading: false,
        selectedLeagueMembersFailed: null,
        selectedLeagueMembers: [],
        selectedLeagueRoundsLoading: false,
        selectedLeagueRoundsFailed: null,
        selectedLeagueRounds: [],
        createNewLeagueLoading: false,
        createNewLeagueFailed: {}
      };
    case CLEAR_LEAGUES:
      return {
        ...state,
        leagues: [],
        getManagerLeaguesLoading: false,
        getManagerLeaguesFailed: null
      };
    default:
      return state;
  }
};

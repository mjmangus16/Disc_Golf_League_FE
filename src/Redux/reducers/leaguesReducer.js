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
  UPDATE_SCHEDULE_LOADING,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILED,
  CLEAR_LEAGUE_DATA,
  CLEAR_LEAGUES
} from "../types";

const initialState = {
  getManagerLeaguesLoading: false,
  getManagerLeaguesFailed: null,
  getLeagueByIdLoading: false,
  getLeagueByIdFailed: null,
  leagues: [],
  selectedLeague: {},
  selectedLeagueMembersLoading: false,
  selectedLeagueMembersFailed: null,
  selectedLeagueMembers: [],
  selectedLeagueRoundsLoading: false,
  selectedLeagueRoundsFailed: null,
  selectedLeagueRounds: [],
  createNewLeagueLoading: false,
  createNewLeagueFailed: {},
  editLeagueLoading: false,
  editLeagueFailed: {},
  updateScheduleLoading: false,
  updateScheduleFailed: {}
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
        getManagerLeaguesLoading: true,
        getManagerLeaguesFailed: null,
        getLeagueByIdLoading: true,
        getLeagueByIdFailed: null,
        leagues: [],
        selectedLeague: {},
        selectedLeagueMembersLoading: true,
        selectedLeagueMembersFailed: null,
        selectedLeagueMembers: [],
        selectedLeagueRoundsLoading: true,
        selectedLeagueRoundsFailed: null,
        selecteLeagueRounds: []
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
    case GET_MEMBERS_BY_LEAGUE_ID_FAILED:
      return {
        ...state,
        selectedLeagueMembersFailed: action.payload,
        selectedLeagueMembersLoading: false
      };
    case GET_ROUNDS_BY_LEAGUE_ID_LOADING:
      return {
        ...state,
        selectedLeagueRoundsLoading: true
      };
    case GET_ROUNDS_BY_LEAGUE_ID_SUCCESS:
      return {
        ...state,
        selectedLeagueRounds: action.payload.reverse(),
        selectedLeagueRoundsLoading: false
      };
    case GET_ROUNDS_BY_LEAGUE_ID_FAILED:
      return {
        ...state,
        selectedLeagueRoundsFailed: action.payload,
        selectedLeagueRoundsLoading: false
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
        editLeagueLoading: true
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
    case ADD_WEEK_TO_SCHEDULE_SUCCESS:
      return {
        ...state,
        selectedLeague: {
          ...state.selectedLeague,
          schedule: action.payload
        }
      };
    case REMOVE_WEEK_FROM_SCHEDULE_SUCCESS:
      return {
        ...state,
        selectedLeague: action.payload
      };
    case UPDATE_SCHEDULE_LOADING:
      return {
        ...state,
        updateScheduleLoading: true
      };
    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        selectedLeague: action.payload,
        updateScheduleLoading: false
      };
    case UPDATE_SCHEDULE_FAILED:
      return {
        ...state,
        updateScheduleFailed: action.payload,
        updateScheduleLoading: false
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

import {
  GET_STANDINGS_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_BY_LEAGUE_ID_FAILED,
  GET_STANDINGS_FORMATS_LOADING,
  GET_STANDINGS_FORMATS_SUCCESS,
  GET_STANDINGS_FORMATS_FAILED,
  GET_STANDINGS_FORMAT_BY_LEAGUE_ID_LOADING,
  GET_STANDINGS_FORMAT_BY_LEAGUE_ID_SUCCESS,
  GET_STANDINGS_FORMAT_BY_LEAGUE_ID_FAILED,
  CONNECT_FORMAT_TO_LEAGUE_LOADING,
  CONNECT_FORMAT_TO_LEAGUE_SUCCESS,
  CONNECT_FORMAT_TO_LEAGUE_FAILED,
  UPDATE_LEAGUE_FORMAT_LOADING,
  UPDATE_LEAGUE_FORMAT_SUCCESS,
  UPDATE_LEAGUE_FORMAT_FAILED,
  DELETE_LEAGUE_FORMAT_LOADING,
  DELETE_LEAGUE_FORMAT_SUCCESS,
  DELETE_LEAGUE_FORMAT_FAILED,
  CLEAR_STANDINGS_RESULTS,
  CLEAR_STANDINGS_FORMATS,
  CLEAR_STANDINGS_LEAGUE_FORMAT,
  SORT_STANDINGS_BY_NAME,
  SORT_STANDINGS_BY_TOTAL,
  SORT_STANDINGS_BY_AVERAGE,
  SORT_STANDINGS_BY_ROUND
} from "../types";

const initialState = {
  standings: [],
  getStandingsLoading: false,
  getStandingsFailed: {},
  formats: [],
  getFormatsLoading: false,
  getFormatsFailed: {},
  leagueFormat: {},
  getLeagueFormatLoading: false,
  getLeagueFormatFailed: {},
  connectFormatLoading: false,
  connectFormatFailed: {},
  updateFormatLoading: false,
  updateFormatFailed: {},
  sortOrderName: null,
  sortOrderTotal: null,
  sortOrderAverage: null,
  sortOrderRound: null,
  sortOrderRoundDir: null
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
    case GET_STANDINGS_FORMATS_LOADING:
      return {
        ...state,
        getFormatsLoading: true,
        getFormatsFailed: {}
      };
    case GET_STANDINGS_FORMATS_SUCCESS:
      return {
        ...state,
        getFormatsLoading: false,
        getFormatsFailed: {},
        formats: action.payload
      };
    case GET_STANDINGS_FORMATS_FAILED: {
      return {
        ...state,
        getFormatsLoading: false,
        getFormatsFailed: action.payload,
        formats: []
      };
    }
    case GET_STANDINGS_FORMAT_BY_LEAGUE_ID_LOADING:
      return {
        ...state,
        getLeagueFormatLoading: true,
        getLeagueFormatFailed: {}
      };
    case GET_STANDINGS_FORMAT_BY_LEAGUE_ID_SUCCESS:
      return {
        ...state,
        getLeagueFormatLoading: false,
        getLeagueFormatFailed: {},
        leagueFormat: action.payload
      };
    case GET_STANDINGS_FORMAT_BY_LEAGUE_ID_FAILED: {
      return {
        ...state,
        getLeagueFormatLoading: false,
        getLeagueFormatFailed: action.payload,
        leagueFormat: {}
      };
    }
    case CONNECT_FORMAT_TO_LEAGUE_LOADING:
      return {
        ...state,
        connectFormatLoading: true,
        connectFormatFailed: {}
      };
    case CONNECT_FORMAT_TO_LEAGUE_SUCCESS:
      return {
        ...state,
        connectFormatLoading: true,
        connectFormatFailed: {},
        leagueFormat: action.payload
      };
    case CONNECT_FORMAT_TO_LEAGUE_FAILED:
      return {
        ...state,
        connectFormatLoading: true,
        connectFormatFailed: {},
        leagueFormat: action.payload
      };
    case UPDATE_LEAGUE_FORMAT_LOADING:
      return {
        ...state,
        updateFormatLoading: true,
        updateFormatFailed: {}
      };
    case UPDATE_LEAGUE_FORMAT_SUCCESS:
      return {
        ...state,
        updateFormatLoading: false,
        updateFormatFailed: {},
        leagueFormat: action.payload
      };
    case UPDATE_LEAGUE_FORMAT_FAILED:
      return {
        ...state,
        updateFormatLoading: false,
        leagueFormat: {},
        updateFormatFailed: action.payload
      };
    case DELETE_LEAGUE_FORMAT_LOADING:
      return {
        ...state,
        deleteFormatLoading: true,
        deleteFormatFailed: {}
      };
    case DELETE_LEAGUE_FORMAT_SUCCESS:
      return {
        ...state,
        deleteFormatLoading: false,
        leagueFormat: action.payload,
        deleteFormatFailed: {}
      };
    case DELETE_LEAGUE_FORMAT_FAILED:
      return {
        ...state,
        deleteFormatLoading: false,
        deleteFormatFailed: action.payload
      };
    case CLEAR_STANDINGS_RESULTS:
      return {
        ...state,
        getStandingsLoading: false,
        getStandingsFailed: {},
        standings: []
      };
    case CLEAR_STANDINGS_FORMATS:
      return {
        ...state,
        getFormatsLoading: false,
        getFormatsFailed: {},
        formats: []
      };
    case CLEAR_STANDINGS_LEAGUE_FORMAT:
      return {
        ...state,
        getLeagueFormatLoading: false,
        getLeagueFormatFailed: {},
        leagueFormat: {}
      };
    case SORT_STANDINGS_BY_NAME:
      return {
        ...state,
        standings: action.payload,
        sortOrderName:
          state.sortOrderName == null ? false : !state.sortOrderName,
        sortOrderTotal: null,
        sortOrderAverage: null,
        sortOrderRound: null,
        sortOrderRoundDir: null
      };
    case SORT_STANDINGS_BY_AVERAGE:
      return {
        ...state,
        standings: action.payload,
        sortOrderName: null,
        sortOrderTotal: null,
        sortOrderAverage:
          state.sortOrderAverage == null ? false : !state.sortOrderAverage,
        sortOrderRound: null,
        sortOrderRoundDir: null
      };
    case SORT_STANDINGS_BY_TOTAL:
      return {
        ...state,
        standings: action.payload,
        sortOrderName: null,
        sortOrderTotal:
          state.sortOrderTotal == null ? false : !state.sortOrderTotal,
        sortOrderAverage: null,
        sortOrderRound: null,
        sortOrderRoundDir: null
      };
    case SORT_STANDINGS_BY_ROUND:
      return {
        ...state,
        standings: action.payload,
        sortOrderName: null,
        sortOrderTotal: null,
        sortOrderAverage: null,
        sortOrderRound: action.round,
        sortOrderRoundDir:
          state.sortOrderRoundDir == null ? false : !state.sortOrderRoundDir
      };
    default:
      return state;
  }
};

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
  CLEAR_STANDINGS_RESULTS,
  CLEAR_STANDINGS_FORMATS,
  CLEAR_STANDINGS_LEAGUE_FORMAT
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
  getLeagueFormatFailed: {}
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
    default:
      return state;
  }
};

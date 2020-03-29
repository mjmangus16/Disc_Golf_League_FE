import {
  GET_ROUNDS_BY_LEAGUE_ID_LOADING,
  GET_ROUNDS_BY_LEAGUE_ID_SUCCESS,
  GET_ROUNDS_BY_LEAGUE_ID_FAILED,
  GET_ROUND_BY_ROUND_ID_LOADING,
  GET_ROUND_BY_ROUND_ID_SUCCESS,
  GET_ROUND_BY_ROUND_ID_FAILED,
  ADD_ROUND_FAILED,
  ADD_PARTICIPANT_LOADING,
  ADD_PARTICIPANT_SUCCESS,
  ADD_PARTICIPANT_FAILED,
  UPDATE_ROUND_LOADING,
  UPDATE_ROUND_SUCCESS,
  UPDATE_ROUND_FAILED,
  CLEAR_ROUNDS,
  CLEAR_SELECTED_ROUND_DATA,
  SORT_ROUND_BY_NAME,
  SORT_ROUND_BY_SCORE
} from "../types";

const initialState = {
  rounds: [],
  roundsLoading: false,
  roundsFailed: {},
  round: {},
  roundLoading: false,
  roundFailed: {},
  addRoundFailed: {},
  addParticipantLoading: false,
  addParticipantFailed: {},
  updateRoundLoading: false,
  updateRoundFailed: {},
  sortOrderName: null,
  sortOrderScore: null
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
    case ADD_ROUND_FAILED:
      return {
        ...state,
        addRoundFailed: action.payload
      };
    case GET_ROUND_BY_ROUND_ID_FAILED:
      return {
        ...state,
        roundFailed: action.payload,
        roundLoading: false
      };
    case ADD_PARTICIPANT_LOADING:
      return {
        ...state,
        addParticipantLoading: true,
        addParticipantFailed: {}
      };
    case ADD_PARTICIPANT_SUCCESS:
      return {
        ...state,
        round: {
          ...state.round,
          participants: [action.payload, ...state.round.participants]
        },
        addParticipantLoading: false
      };
    case ADD_PARTICIPANT_FAILED:
      return {
        ...state,
        addParticipantLoading: false,
        addParticipantFailed: action.payload
      };
    case UPDATE_ROUND_LOADING:
      return {
        ...state,
        updateRoundLoading: true,
        updateRoundFailed: {}
      };
    case UPDATE_ROUND_SUCCESS:
      return {
        ...state,
        updateRoundLoading: false,
        round: { ...state.round, ...action.payload }
      };
    case UPDATE_ROUND_FAILED:
      return {
        ...state,
        updateRoundLoading: false,
        updateROundFailed: action.payload
      };
    case CLEAR_ROUNDS:
      return {
        ...state,
        rounds: [],
        roundsLoading: false,
        roundsFailed: {},
        round: {},
        roundLoading: false,
        roundFailed: {},
        addParticipantLoading: false,
        addParticipantFailed: {},
        updateRoundLoading: false,
        updateRoundFailed: {}
      };
    case CLEAR_SELECTED_ROUND_DATA:
      return {
        ...state,
        round: {}
      };
    case SORT_ROUND_BY_NAME:
      return {
        ...state,
        round: {
          ...state.round,
          participants: action.payload
        },
        sortOrderName:
          state.sortOrderName == null ? false : !state.sortOrderName,
        sortOrderScore: null
      };
    case SORT_ROUND_BY_SCORE:
      return {
        ...state,
        round: {
          ...state.round,
          participants: action.payload
        },
        sortOrderName: null,
        sortOrderScore:
          state.sortOrderScore == null ? false : !state.sortOrderScore
      };
    default:
      return state;
  }
};

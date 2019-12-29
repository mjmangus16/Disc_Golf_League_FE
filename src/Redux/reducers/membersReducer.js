import {
  GET_MEMBERS_BY_LEAGUE_ID_LOADING,
  GET_MEMBERS_BY_LEAGUE_ID_SUCCESS,
  GET_MEMBERS_BY_LEAGUE_ID_FAILED,
  GET_MEMBER_BY_MEMBER_ID_LOADING,
  GET_MEMBER_BY_MEMBER_ID_SUCCESS,
  GET_MEMBER_BY_MEMBER_ID_FAILED,
  SUBMIT_MEMBER_TO_LEAGUE_LOADING,
  SUBMIT_MEMBER_TO_LEAGUE_SUCCESS,
  SUBMIT_MEMBER_TO_LEAGUE_FAILED,
  REMOVE_MEMBER_FROM_LEAGUE_LOADING,
  REMOVE_MEMBER_FROM_LEAGUE_SUCCESS,
  REMOVE_MEMBER_FROM_LEAGUE_FAILED,
  UPDATE_MEMBER_LOADING,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  CLEAR_MEMBER_UPDATE_SUCCESS,
  CLEAR_MEMBERS,
  CLEAR_SELECTED_MEMBER_DATA
} from "../types";

const initialState = {
  getMembersLoading: false,
  getMembersFailed: {},
  members: [],
  getMemberLoading: false,
  getMemberFailed: {},
  member: {},
  submitMemberLoading: false,
  submitMemberFailed: {},
  removeMemberFailed: {},
  updateMemberLoading: false,
  updateMemberFailed: {},
  update_success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBERS_BY_LEAGUE_ID_LOADING:
      return {
        ...state,
        getMembersLoading: true
      };
    case GET_MEMBERS_BY_LEAGUE_ID_SUCCESS:
      return {
        ...state,
        members: action.payload.reverse(),
        getMembersLoading: false
      };
    case GET_MEMBERS_BY_LEAGUE_ID_FAILED:
      return {
        ...state,
        getMembersFailed: action.payload,
        getMembersLoading: false
      };
    case GET_MEMBER_BY_MEMBER_ID_LOADING:
      return {
        ...state,
        getMemberLoading: true,
        getMemberFailed: {}
      };
    case GET_MEMBER_BY_MEMBER_ID_SUCCESS:
      return {
        ...state,
        getMemberLoading: false,
        member: { ...action.member, rounds: action.rounds }
      };
    case GET_MEMBER_BY_MEMBER_ID_FAILED:
      return {
        ...state,
        getMemberLoading: false,
        getMemberFailed: action.payload
      };
    case SUBMIT_MEMBER_TO_LEAGUE_LOADING:
      return {
        ...state,
        submitMemberLoading: true,
        submitMemberFailed: {}
      };
    case SUBMIT_MEMBER_TO_LEAGUE_SUCCESS:
      return {
        ...state,
        submitMemberLoading: false,
        members: [action.payload, ...state.members]
      };
    case SUBMIT_MEMBER_TO_LEAGUE_FAILED:
      return {
        ...state,
        submitMemberLoading: false,
        submitMemberFailed: action.payload
      };
    case REMOVE_MEMBER_FROM_LEAGUE_LOADING:
      return {
        ...state,
        removeMemberFailed: {}
      };
    case REMOVE_MEMBER_FROM_LEAGUE_SUCCESS:
      return {
        ...state,
        members: [...state.members].filter(m => m.member_id !== action.payload)
      };
    case REMOVE_MEMBER_FROM_LEAGUE_FAILED:
      return {
        ...state,
        removeMemberFailed: action.payload
      };
    case UPDATE_MEMBER_LOADING:
      return {
        ...state,
        updateMemberLoading: true,
        updateMemberFailed: {}
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        updateMemberLoading: false,
        member: { ...state.member, email: action.payload.email },
        update_success: true
      };
    case UPDATE_MEMBER_FAILED:
      return {
        ...state,
        updateMemberLoading: false,
        updateMemberFailed: action.payload
      };
    case CLEAR_MEMBER_UPDATE_SUCCESS:
      return {
        ...state,
        update_success: false
      };
    case CLEAR_MEMBERS:
      return {
        ...state,
        getMembersLoading: false,
        getMembersFailed: null,
        members: [],
        getMemberLoading: false,
        getMemberFailed: {},
        member: {},
        submitMemberLoading: false,
        submitMemberFailed: {},
        removeMemberFailed: {},
        updateMemberLoading: false,
        updateMemberFailed: {},
        update_success: false
      };
    case CLEAR_SELECTED_MEMBER_DATA:
      return {
        ...state,
        member: {}
      };
    default:
      return state;
  }
};

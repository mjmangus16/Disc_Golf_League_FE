import { axiosWithAuth } from "../../utils/axiosWithAuth";
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

export const getMembersByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_MEMBERS_BY_LEAGUE_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/members/league/${league_id}`)
    .then(res => {
      dispatch({
        type: GET_MEMBERS_BY_LEAGUE_ID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_MEMBERS_BY_LEAGUE_ID_FAILED,
        payload: err.response.data
      });
    });
};

export const getMemberByMemberId = (league_id, member_id) => async dispatch => {
  dispatch({ type: GET_MEMBER_BY_MEMBER_ID_LOADING });
  try {
    const member = await axiosWithAuth().get(
      `api/members/league/${league_id}/member/${member_id}`
    );
    const rounds = await axiosWithAuth().get(
      `api/participants/league/${league_id}/member/${member_id}`
    );

    console.log(member);
    dispatch({
      type: GET_MEMBER_BY_MEMBER_ID_SUCCESS,
      member: member.data,
      rounds: rounds.data
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: GET_MEMBER_BY_MEMBER_ID_FAILED,
      payload: err.response.data
    });
  }
};

export const submitMemberToLeague = (
  newMember,
  league_id,
  trigger,
  setNewMember
) => dispatch => {
  dispatch({
    type: SUBMIT_MEMBER_TO_LEAGUE_LOADING
  });
  axiosWithAuth()
    .post(`api/members/add/league/${league_id}`, newMember)
    .then(res => {
      dispatch({
        type: SUBMIT_MEMBER_TO_LEAGUE_SUCCESS,
        payload: { ...res.data, rounds: 0 }
      });
      setNewMember({
        f_name: "",
        l_name: "",
        email: ""
      });
      trigger(false);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: SUBMIT_MEMBER_TO_LEAGUE_FAILED,
        payload: err.response.data
      });
    });
};

export const removeMemberFromLeague = (
  member_id,
  league_id,
  redirect
) => dispatch => {
  console.log(member_id, league_id);
  if (
    window.confirm(
      "Deleting this member will remove all of this members rounds too. Are you sure you want to do this?"
    )
  ) {
    dispatch({
      type: REMOVE_MEMBER_FROM_LEAGUE_LOADING
    });
    axiosWithAuth()
      .delete(`api/members/delete/${member_id}/league/${league_id}`)
      .then(() => {
        dispatch({
          type: REMOVE_MEMBER_FROM_LEAGUE_SUCCESS,
          payload: member_id
        });
        redirect();
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({
          type: REMOVE_MEMBER_FROM_LEAGUE_FAILED,
          payload: err.response.data
        });
      });
  }
};

export const updateMember = (member_id, league_id, email) => dispatch => {
  dispatch({ type: UPDATE_MEMBER_LOADING });
  console.log(league_id, member_id);
  axiosWithAuth()
    .put(`api/members/update/${member_id}/league/${league_id}`, { email })
    .then(res => {
      dispatch({
        type: UPDATE_MEMBER_SUCCESS,
        payload: res.data
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_MEMBER_UPDATE_SUCCESS
        });
      }, 10000);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: UPDATE_MEMBER_FAILED,
        payload: err.response.data
      });
    });
};

export const clearMembersData = () => dispatch => {
  dispatch({ type: CLEAR_MEMBERS });
};

export const clearSelectedMemberData = () => dispatch => {
  dispatch({ type: CLEAR_SELECTED_MEMBER_DATA });
};

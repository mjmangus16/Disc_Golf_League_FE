import { axiosWithAuth } from "../../utils/axiosWithAuth";
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

export const getStandingsFormats = () => dispatch => {
  dispatch({
    type: GET_STANDINGS_FORMATS_LOADING
  });
  axiosWithAuth()
    .get("api/standings/formats")
    .then(res => {
      dispatch({
        type: GET_STANDINGS_FORMATS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STANDINGS_FORMATS_FAILED,
        payload: err.response.data
      });
    });
};

export const getStandingsFormatByLeagueId = league_id => dispatch => {
  dispatch({
    type: GET_STANDINGS_FORMAT_BY_LEAGUE_ID_LOADING
  });
  axiosWithAuth()
    .get(`api/standings/league/${league_id}`)
    .then(res => {
      dispatch({
        type: GET_STANDINGS_FORMAT_BY_LEAGUE_ID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STANDINGS_FORMAT_BY_LEAGUE_ID_FAILED,
        payload: err.response.data
      });
    });
};

export const getStandingsResults = (league_id, members) => dispatch => {
  dispatch({ type: GET_STANDINGS_BY_LEAGUE_ID_LOADING });
  axiosWithAuth()
    .get(`api/standings/league/${league_id}/results`)
    .then(res => {
      let adjusted = res.data.map(st => {
        let member = members.filter(mem => mem.member_id === st[0].member_id);
        return [`${member[0].l_name}, ${member[0].f_name}`, [...st]];
      });
      dispatch({
        type: GET_STANDINGS_BY_LEAGUE_ID_SUCCESS,
        payload: adjusted
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_STANDINGS_BY_LEAGUE_ID_FAILED,
        payload: err.response.data
      });
    });
};

export const connectFormatToLeague = (
  league_id,
  standings_format_id
) => dispatch => {
  dispatch({
    type: CONNECT_FORMAT_TO_LEAGUE_LOADING
  });
  axiosWithAuth()
    .post(`api/standings/league/${league_id}/add/format/${standings_format_id}`)
    .then(res => {
      dispatch({
        type: CONNECT_FORMAT_TO_LEAGUE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: CONNECT_FORMAT_TO_LEAGUE_FAILED,
        payload: err.response.data
      });
    });
};

export const updateLeagueFormat = (
  league_id,
  standings_format_id
) => dispatch => {
  dispatch({
    type: UPDATE_LEAGUE_FORMAT_LOADING
  });
  console.log(league_id, standings_format_id);
  axiosWithAuth()
    .put(
      `api/standings/league/${league_id}/update/format/${standings_format_id}`
    )
    .then(res => {
      dispatch({
        type: UPDATE_LEAGUE_FORMAT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: UPDATE_LEAGUE_FORMAT_FAILED,
        payload: err.response.data
      });
    });
};

export const deleteLeagueFormat = league_id => dispatch => {
  dispatch({
    type: DELETE_LEAGUE_FORMAT_LOADING
  });
  axiosWithAuth()
    .delete(`api/standings/league/${league_id}/delete`)
    .then(res => {
      dispatch({
        type: DELETE_LEAGUE_FORMAT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: DELETE_LEAGUE_FORMAT_FAILED,
        payload: err.response.data
      });
    });
};

export const clearStandingsResults = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_RESULTS });
};
export const clearStandingsFormats = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_FORMATS });
};
export const clearStandingsLeagueFormat = () => dispatch => {
  dispatch({ type: CLEAR_STANDINGS_LEAGUE_FORMAT });
};

export const sortStandingsByName = (standings, order) => dispatch => {
  if (order === null || order === true) {
    standings.sort((a, b) => {
      return a[0].toLowerCase() <= b[0].toLowerCase() ? -1 : 1;
    });
  } else {
    standings.sort((a, b) => {
      return a[0].toLowerCase() >= b[0].toLowerCase() ? -1 : 1;
    });
  }

  dispatch({
    type: SORT_STANDINGS_BY_NAME,
    payload: standings
  });
};

export const sortStandingsByTotal = (standings, order) => dispatch => {
  if (order === null || order === true) {
    standings.sort((a, b) => {
      let sumA = 0;
      let sumB = 0;

      a[1].forEach(r => (sumA += r.points));
      b[1].forEach(r => (sumB += r.points));

      if (sumA >= sumB) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log(standings);
  } else {
    standings.sort((a, b) => {
      let sumA = 0;
      let sumB = 0;

      a[1].forEach(r => (sumA += r.points));
      b[1].forEach(r => (sumB += r.points));

      if (sumA >= sumB) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  dispatch({
    type: SORT_STANDINGS_BY_TOTAL,
    payload: standings
  });
};

export const sortStandingsByAverage = (standings, order) => dispatch => {
  if (order === null || order === true) {
    standings.sort((a, b) => {
      let sumA = 0;
      let sumB = 0;

      a[1].forEach(r => (sumA += r.points));
      b[1].forEach(r => (sumB += r.points));

      if (sumA / a[1].length >= sumB / b[1].length) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log(standings);
  } else {
    standings.sort((a, b) => {
      let sumA = 0;
      let sumB = 0;

      a[1].forEach(r => (sumA += r.points));
      b[1].forEach(r => (sumB += r.points));

      if (sumA / a[1].length >= sumB / b[1].length) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  dispatch({
    type: SORT_STANDINGS_BY_AVERAGE,
    payload: standings
  });
};

export const sortStandingsByRound = (standings, order, dir) => dispatch => {
  if (dir === null || dir === true) {
    standings.sort((a, b) => {
      if (!a[1][order] && !b[1][order]) {
        return 0;
      } else if (!a[1][order]) {
        return 1;
      } else if (!b[1][order]) {
        return -1;
      }
      return a[1][order].points - b[1][order].points;
    });
  } else {
    standings.sort((a, b) => {
      if (!a[1][order] && !b[1][order]) {
        return 0;
      } else if (!a[1][order] || !b[1][order]) {
        return 0;
      }
      return b[1][order].points - a[1][order].points;
    });
  }

  dispatch({
    type: SORT_STANDINGS_BY_ROUND,
    payload: standings,
    round: order
  });
};

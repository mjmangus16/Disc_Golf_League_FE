import {
  ADD_BREADCRUMB,
  SELECT_BREADCRUMB,
  INIT_BREADCRUMB,
  CLEAR_BREADCRUMB
} from "../types";

export const addBreadcrumb = newCrumb => dispatch => {
  dispatch({
    type: ADD_BREADCRUMB,
    payload: newCrumb
  });
};

export const selectBreadcrumb = (crumbs, selectedCrumb) => dispatch => {
  const updatedCrumbs = crumbs.filter(
    (crumb, index) => index <= crumbs.indexOf(selectedCrumb)
  );
  dispatch({
    type: SELECT_BREADCRUMB,
    payload: updatedCrumbs
  });
};

export const initBreadcrumb = id => dispatch => {
  dispatch({
    type: INIT_BREADCRUMB,
    payload: id
  });
};

export const clearBreadcrumb = () => dispatch => {
  dispatch({
    type: CLEAR_BREADCRUMB
  });
};

import { ADD_BREADCRUMB, SELECT_BREADCRUMB } from "../types";

export const addBreadcrumb = (crumbs, newCrumb) => dispatch => {
  // const exists = crumbs.filter(crumb => crumb.name === newCrumb.name);
  // exists.length === 0 &&
  dispatch({
    type: ADD_BREADCRUMB,
    payload: { ...newCrumb, index: crumbs.length }
  });
};

export const selectBreadcrumb = (crumbs, selectedCrumb) => dispatch => {
  const updatedCrumbs = crumbs.filter(
    crumb => crumb.index <= selectedCrumb.index
  );
  dispatch({
    type: SELECT_BREADCRUMB,
    payload: updatedCrumbs
  });
};
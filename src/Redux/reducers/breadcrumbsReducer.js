import { ADD_BREADCRUMB, SELECT_BREADCRUMB } from "../types";

const initialState = {
  breadcrumbs: [{ name: "Home", url: "/", index: 0 }]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.payload]
      };
    case SELECT_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: action.payload
      };
    default:
      return state;
  }
};

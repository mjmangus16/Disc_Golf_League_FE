import { ADD_BREADCRUMB, SELECT_BREADCRUMB } from "../types";

const initialState = {
  breadcrumbs: [{ name: "Home", url: "/", index: 0 }]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: handleCrumbs(state.breadcrumbs, action.payload)
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

const handleCrumbs = (crumbs, newCrumb) => {
  let adjustedCrumbs = crumbs;
  if (newCrumb.name === "Sign Up") {
    adjustedCrumbs = crumbs.filter(crumb => crumb.name !== "Sign In");
  } else if (newCrumb.name === "Sign In") {
    adjustedCrumbs = crumbs.filter(crumb => crumb.name !== "Sign Up");
  } else if (newCrumb.name === "Profile") {
    adjustedCrumbs = crumbs.filter(
      crumb => crumb.name !== "Sign Up" && crumb.name !== "Sign In"
    );
  }

  adjustedCrumbs = [...adjustedCrumbs, newCrumb];

  return adjustedCrumbs;
};

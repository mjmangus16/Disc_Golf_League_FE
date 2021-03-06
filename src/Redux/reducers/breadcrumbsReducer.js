import {
  ADD_BREADCRUMB,
  SELECT_BREADCRUMB,
  INIT_BREADCRUMB,
  CLEAR_BREADCRUMB
} from "../types";

const initialState = {
  crumb: false,
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case ADD_BREADCRUMB:
    //   return {
    //     ...state,
    //     breadcrumbs: handleCrumbs(state.breadcrumbs, action.payload)
    //   };
    // case SELECT_BREADCRUMB:
    //   return {
    //     ...state,
    //     breadcrumbs: action.payload
    //   };
    case INIT_BREADCRUMB:
      return {
        ...state,
        crumb: true,
        id: action.payload
      };
    case CLEAR_BREADCRUMB:
      return {
        crumb: false,
        id: null
      };
    default:
      return state;
  }
};

// const handleCrumbs = (crumbs, newCrumb) => {
//   if (newCrumb.name == "Home") {
//     return [newCrumb];
//   } else if (newCrumb.name === "Sign Up") {
//     return [...crumbs.filter(crumb => crumb.name !== "Sign In"), newCrumb];
//   } else if (newCrumb.name === "Sign In") {
//     return [...crumbs.filter(crumb => crumb.name !== "Sign Up"), newCrumb];
//   } else if (newCrumb.name === "Profile") {
//     return [
//       ...crumbs.filter(
//         crumb =>
//           crumb.name !== "Sign Up" &&
//           crumb.name !== "Sign In" &&
//           crumb.name !== "Profile"
//       ),
//       newCrumb
//     ];
//   } else if (newCrumb.name === "Create League") {
//     return [
//       ...crumbs.filter(crumb => crumb.name !== "Create League"),
//       newCrumb
//     ];
//   }
// };

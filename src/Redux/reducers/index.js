import { combineReducers } from "redux";
import breadcrumbsReducer from "./breadcrumbsReducer";

export default combineReducers({
  breadcrumbs: breadcrumbsReducer
});

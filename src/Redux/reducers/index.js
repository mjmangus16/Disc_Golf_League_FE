import { combineReducers } from "redux";
import breadcrumbsReducer from "./breadcrumbsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  breadcrumbs: breadcrumbsReducer,
  auth: authReducer
});

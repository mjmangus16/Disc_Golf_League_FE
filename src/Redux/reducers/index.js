import { combineReducers } from "redux";
import breadcrumbsReducer from "./breadcrumbsReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  breadcrumbs: breadcrumbsReducer,
  auth: authReducer,
  profile: profileReducer
});

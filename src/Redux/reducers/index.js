import { combineReducers } from "redux";
import breadcrumbsReducer from "./breadcrumbsReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import leaguesReducer from "./leaguesReducer";
import scheduleReducer from "./scheduleReducer";
import membersReducer from "./membersReducer";
import roundsReducer from "./roundsReducer";

export default combineReducers({
  breadcrumbs: breadcrumbsReducer,
  auth: authReducer,
  profile: profileReducer,
  leagues: leaguesReducer,
  schedule: scheduleReducer,
  members: membersReducer,
  rounds: roundsReducer
});

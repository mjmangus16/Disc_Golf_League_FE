import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import SignIn from "./Components/AuthForms/SignIn";
import SignUp from "./Components/AuthForms/SignUp";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import League from "./Components/Leagues/League";
import CreateLeague from "./Components/Leagues/CreateLeague";
import EditLeagueHeader from "./Components/Leagues/LeagueHeader/EditLeagueHeader";
import UpdateSchedule from "./Components/Leagues/LeagueSchedule/UpdateSchedule";
import CreateRound from "./Components/Leagues/LeagueRounds/CreateRound";
import ViewRound from "./Components/Leagues/LeagueRounds/ViewRound";
import LeagueMember from "./Components/Leagues/LeagueMembers/LeagueMember";

export default () => {
  return (
    <>
      <Route
        exact
        path="/"
        render={props => <Home history={props.history} />}
      />
      <Route
        exact
        path="/home"
        render={props => <Home history={props.history} />}
      />
      <Route
        exact
        path="/signup"
        render={props => <SignUp history={props.history} />}
      />
      <Route
        exact
        path="/signin"
        render={props => <SignIn history={props.history} />}
      />
      <Route exact path="/league/:league_id" component={League} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute
        exact
        path="/league/:league_id/round/:round_id/viewRound"
        component={ViewRound}
      />
      <ProtectedRoute
        exact
        path="/league/:league_id/member/:member_id"
        component={LeagueMember}
      />
      <AdminProtectedRoute
        exact
        path="/league/:league_id/editLeague"
        component={EditLeagueHeader}
      />
      <AdminProtectedRoute
        exact
        path="/createLeague"
        component={CreateLeague}
      />
      <AdminProtectedRoute
        exact
        path="/league/:league_id/updateSchedule"
        component={UpdateSchedule}
      />
      <AdminProtectedRoute
        exact
        path="/league/:league_id/createRound"
        component={CreateRound}
      />
    </>
  );
};

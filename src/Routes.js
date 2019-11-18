import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import SignIn from "./Components/AuthForms/SignIn";
import SignUp from "./Components/AuthForms/SignUp";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import League from "./Components/Leagues/League";
import CreateLeague from "./Components/Leagues/CreateLeague";
import CreateSchedule from "./Components/Leagues/leagueTabs/CreateSchedule";
import CreateRound from "./Components/Leagues/leagueTabs/CreateRound";

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
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/createLeague" component={CreateLeague} />
      <ProtectedRoute exact path="/league/:league_id" component={League} />
      <ProtectedRoute
        exact
        path="/league/:league_id/createSchedule"
        component={CreateSchedule}
      />
      <ProtectedRoute
        exact
        path="/league/:league_id/createRound"
        component={CreateRound}
      />
    </>
  );
};

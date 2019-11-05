import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./Components/AuthForms/SignIn";
import SignUp from "./Components/AuthForms/SignUp";
import Profile from "./Components/Profile/Profile";

export default () => {
  return (
    <>
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
      <Route
        exact
        path="/profile"
        render={props => <Profile history={props.history} />}
      />
    </>
  );
};

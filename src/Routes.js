import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./Components/AuthForms/SignIn";
import SignUp from "./Components/AuthForms/SignUp";

export default () => {
  return (
    <>
      <Route exact path="/signup" render={() => <SignUp />} />
      <Route exact path="/signin" render={() => <SignIn />} />
    </>
  );
};

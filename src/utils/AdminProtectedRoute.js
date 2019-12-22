import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") &&
        jwt_decode(localStorage.getItem("token")).admin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/profile" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  return (
    <Route
      {...rest}
      render={props =>
        token && decoded.admin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/profile" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;

import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return children;
        } else {
          return (
            <Navigate
              to={{
                pathname: "/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

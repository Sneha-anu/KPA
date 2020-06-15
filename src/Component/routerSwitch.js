import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import { fakeAuth } from "../service/auth";
import KpaBoard from "./board";
import Dashboard from "./dashboard";
import Forms from "./forms";
import LoginForm from "./login";

function PrivateRoute({ children, ...rest }) {
  // console.log(rest, "rest", fakeAuth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const AppRouter = (props) => {
  // console.log(fakeAuth.isAuthenticated, "isAuthenticated");
  return (
    <div style={style}>
      <Switch>
        <Route path="/login" component={LoginForm} />
        {/* <Route path="/" component={Dashboard} /> */}
        {/* <Route path="/kpa-profile" component={KpaBoard} /> */}
        <PrivateRoute path="/kpa-profile">
          <KpaBoard />
        </PrivateRoute>
        <PrivateRoute path="/forms">
          <Forms />
        </PrivateRoute>
        <PrivateRoute path="/" exact>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

// export default AppRouter;

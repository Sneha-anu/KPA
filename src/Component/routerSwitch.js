import { Route, Switch } from "react-router-dom";
import React from "react";

import KpaBoard from "./board";
import Dashboard from "./dashboard";
import Forms from "./forms";
const AppRouter = () => {
  return (
    <div style={style}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/kpa-profile" component={KpaBoard} />
        <Route path="/forms" component={Forms} />
      </Switch>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;

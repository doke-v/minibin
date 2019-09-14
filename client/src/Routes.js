import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ViewPaste from "./components/ViewPaste";
import EnterPaste from "./components/EnterPaste";

function Routes() {
  return (
    <BrowserRouter basename="/bin">
      <Switch>
        <Route exact path="/" component={EnterPaste} />
        <Route path="/:id" component={ViewPaste} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

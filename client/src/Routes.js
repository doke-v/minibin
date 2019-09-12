import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ViewPaste from "./components/ViewPaste";
import ViewRawPaste from "./components/ViewRawPaste";
import EnterPaste from "./components/EnterPaste";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={EnterPaste} />
        <Route path="/raw/:id" component={ViewRawPaste} />
        <Route path="/:id" component={ViewPaste} />    
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

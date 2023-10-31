import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Menu from "./Menu";
import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import ObservationsCreate from "../Observations/ObservationsCreate";

function Layout() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <Switch>
          <Route path="/observations/new">
            <ObservationsCreate />
          </Route>
          <Route path="/observations/:observation_id/edit">
            <ObservationsCreate />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

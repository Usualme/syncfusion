import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

import { TreeGrid } from "./components/TreeGrid/TreeGrid";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/">
            <Redirect to = "/TreeGrid" />
          </Route>
          <Route path = "/TreeGrid" component = { TreeGrid } />
        </Switch>
      </React.Fragment>
    );
}

export default App;

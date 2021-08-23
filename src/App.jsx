import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Grid from "./components/Grid/Grid";

import Chart from "./components/Chart/Chart";

import Schedule from "./components/Schedule/Schedule";
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
          <Route path = "/Grid" component = { Grid } />
          <Route path = "/Chart" component = { Chart } />
          <Route path = "/TreeGrid" component = { TreeGrid } />
          <Route path = "/Schedule" component = { Schedule } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;

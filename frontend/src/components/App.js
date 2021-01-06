import React, { Component } from "react";
import { render } from "react-dom";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import NotFound from "./Layout/NotFound.js";
import Login from "./User/Login.js";
import Register from "./User/Register.js";
import Home from "./Main/Home.js";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

const container = document.getElementById("app");
render(<App />, container);

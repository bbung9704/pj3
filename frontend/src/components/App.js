import React, { useReducer } from "react";
import { render } from "react-dom";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import { userContext } from "../context/userContext.js";
import userReducer from "../reducers/userReducer.js";

import NotFound from "./Layout/NotFound.js";
import Login from "./User/Login.js";
import Register from "./User/Register.js";
import Home from "./Main/Home.js";

const App = () => {
  const [userstate, dispatch] = useReducer(userReducer, {
    username: null,
    nickname: null,
    token: localStorage.getItem("token"),
  });

  return (
    <>
      <userContext.Provider value={{ userstate, dispatch }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </userContext.Provider>
    </>
  );
};

const container = document.getElementById("app");
render(<App />, container);

import React, { useReducer } from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import { userContext } from "../context/userContext.js";
import { feedContext } from "../context/feedContext.js";
import userReducer from "../reducers/userReducer.js";
import feedReducer from "../reducers/feedReducer.js";

import NotFound from "./Layout/NotFound.js";
import Login from "./User/Login.js";
import Register from "./User/Register.js";
import Home from "./Main/Home.js";

const App = () => {
  const [userstate, userdispatch] = useReducer(userReducer, {
    id: null,
    username: null,
    nickname: null,
    image: null,
    token: localStorage.getItem("token"),
  });
  const [feedstate, feeddispatch] = useReducer(feedReducer, {
    feeds: [],
  });

  return (
    <>
      <userContext.Provider value={{ userstate, userdispatch }}>
        <feedContext.Provider value={{ feedstate, feeddispatch }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </feedContext.Provider>
      </userContext.Provider>
    </>
  );
};

const container = document.getElementById("app");
render(<App />, container);

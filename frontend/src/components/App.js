import React, { useReducer } from "react";
import { render } from "react-dom";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import { userContext } from "../context/userContext.js";
import { feedContext } from "../context/feedContext.js";
import { followContext } from "../context/followContext.js";
import userReducer from "../reducers/userReducer.js";
import feedReducer from "../reducers/feedReducer.js";
import followReducer from "../reducers/followReducer.js";

import NotFound from "./Layout/NotFound.js";
import Login from "./User/Login.js";
import Register from "./User/Register.js";
import Home from "./Home";

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
    pages: 1,
    page: 1,
  });
  const [followstate, followdispatch] = useReducer(followReducer, {
    feeds: [],
  });

  return (
    <>
      <userContext.Provider value={{ userstate, userdispatch }}>
        <feedContext.Provider value={{ feedstate, feeddispatch }}>
          <followContext.Provider value={{ followstate, followdispatch }}>
            <Router>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/" component={NotFound} />
              </Switch>
            </Router>
          </followContext.Provider>
        </feedContext.Provider>
      </userContext.Provider>
    </>
  );
};

const container = document.getElementById("app");
render(<App />, container);

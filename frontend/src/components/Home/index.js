import React, { useEffect, useContext, useRef } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import "./main.css";

import { userContext } from "../../context/userContext.js";
import { feedContext } from "../../context/feedContext.js";

import { getUser } from "../../api/user.js";
import { getMainFeed } from "../../api/feed.js";

import Header from "../Layout/Header.js";
import FeedDetail from "./FeedDetail.js";
import FeedList from "./FeedList.js";
import Post from "./Post.js";
import Follows from "./Follows.js";
import AlertFeed from "./AlertFeed.js";
import SearchUser from "./SearchUser.js";
import NotFound from "../Layout/NotFound.js";

const Home = ({ match }) => {
  const userstate = useContext(userContext);
  const userdispatch = userstate.userdispatch;

  const loadRef = useRef(false);

  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      loadRef.current.classList.toggle("active");
    }, 500);
    if (userstate.userstate.token) {
      getUser(userstate.userstate.token, userdispatch, history);
    } else {
      history.push("/login");
    }
  }, []);

  // console.log(userstate.userstate);
  return (
    <>
      {/* Loading */}
      <div className="loading-home" ref={loadRef}></div>

      {/* Header */}
      <Header />

      <div className="home-container">
        {/* Face-main */}
        <div className="home-feed">
          <img
            id="home-face"
            src="./media/home/face2.png"
            alt="home-face"
          ></img>
        </div>

        <div className="home-main">
          {/* Alert-feed */}
          <div className="main-tag">
            <AlertFeed token={userstate.userstate.token} />
          </div>

          {/* Feed-list */}
          <div className="main-feed">
            <Switch>
              <Route exact path={match.path}>
                <FeedList user={userstate.userstate} />
              </Route>
              <Route path={`${match.path}/post`} component={Post} />
              <Route path={`${match.path}/:id`} component={FeedDetail} />
              <Route component={NotFound} />
            </Switch>
          </div>

          {/* Search and Follow */}
          <div className="main-tag">
            <div className="sticky-side">
              <SearchUser token={userstate.userstate.token} />
              <Follows token={userstate.userstate.token} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

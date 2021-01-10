import React, { useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./main.css";

import { userContext } from "../../context/userContext.js";
import { feedContext } from "../../context/feedContext.js";

import { getUser } from "../../api/user.js";
import { getMainFeed } from "../../api/feed.js";

import Header from "../Layout/Header.js";
import Feed from "./Feed.js";
import Follows from "./Follows.js";

const Home = () => {
  const userstate = useContext(userContext);
  const userdispatch = userstate.userdispatch;

  const feedstate = useContext(feedContext);
  const feeddispatch = feedstate.feeddispatch;

  const loadRef = useRef(false);

  let history = useHistory();

  useEffect(() => {
    getMainFeed(userstate.userstate.token, feeddispatch);
    setTimeout(() => {
      loadRef.current.classList.toggle("active");
    }, 500);
    if (userstate.userstate.token) {
      getUser(userstate.userstate.token, userdispatch, history);
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <div className="loading-home" ref={loadRef}></div>
      <Header />
      <div className="home-container">
        <div className="home-feed">
          <img
            id="home-face"
            src="./media/home/face2.png"
            alt="home-face"
          ></img>
        </div>
        <div className="home-main">
          <div className="main-tag">Alerts</div>
          <div className="main-feed">
            <div className="feed">
              Feeds
              {feedstate.feedstate.feeds.map((data) => {
                return (
                  <Feed
                    key={data.id}
                    token={userstate.userstate.token}
                    data={data}
                  />
                );
              })}
            </div>
          </div>
          <div className="main-tag">
            <div className="follows">
              <Follows token={userstate.userstate.token} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

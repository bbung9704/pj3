import React, { useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./main.css";

import { userContext } from "../../context/userContext.js";
import { getUser } from "../../api/user.js";

import Header from "../Layout/Header.js";
import Feed from "./Feed.js";

const Home = () => {
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  const loadRef = useRef(false);

  let history = useHistory();

  const data = [
    {
      user: {
        username: "yoon",
        nickname: "김태윤",
        image: "/media/default_image_2PRb5vU.png",
      },
      id: 1,
      created_at: "34분 전",
      body: "개가 이상한 모자쓰고 괜찮다고 하면서 커피 마시는 짤",
      image: "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
    },
    {
      user: {
        username: "bbung97",
        nickname: "붕어",
        image: "/media/default_image.png",
      },
      id: 2,
      created_at: "56분 전",
      body: "대충 개가 귀 움직이는 짤",
      image: "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      loadRef.current.classList.toggle("active");
    }, 500);
    if (userstate.userstate.token) {
      getUser(userstate.userstate.token, dispatch, history);
    } else {
      history.push("/login");
    }
  }, []);

  console.log(userstate.userstate);
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
          <div className="main-tag">Follows</div>
          <div className="main-feed">
            <div className="feed">
              Feeds
              <Feed data={data[0]} />
              <Feed data={data[1]} />
            </div>
          </div>
          <div className="main-tag">Follows</div>
        </div>
      </div>
    </>
  );
};

export default Home;

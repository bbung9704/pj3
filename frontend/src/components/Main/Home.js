import React, { useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./main.css";

import { userContext } from "../../context/userContext.js";
import { getUser } from "../../api/user.js";

import Header from "../Layout/Header.js";

const Home = () => {
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  const loadRef = useRef(false);

  let history = useHistory();

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
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./main.css";

import { userContext } from "../../context/userContext.js";
import { getUser } from "../../api/user.js";

import Header from "../Layout/Header.js";

const Home = () => {
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  let history = useHistory();

  useEffect(() => {
    if (userstate.userstate.token) {
      getUser(userstate.userstate.token, dispatch, history);
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <>
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

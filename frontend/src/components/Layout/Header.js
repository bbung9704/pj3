import React, { useContext, useRef } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";

import "./layout.css";
import Avatar from "@material-ui/core/Avatar";

import AlertFeed from "../Home/AlertFeed.js";

import { userContext } from "../../context/userContext.js";
import { feedContext } from "../../context/feedContext.js";
import { logout } from "../../api/user.js";

const Header = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const userstate = useContext(userContext);
  const userdispatch = userstate.userdispatch;
  const feeddispatch = useContext(feedContext).feeddispatch;

  const slideRef = useRef(false);
  const logoRef = useRef(false);
  const barRef = useRef(false);
  const loadRef = useRef(false);
  const alertRef = useRef(false);

  const doLogout = () => {
    loadRef.current.classList.toggle("active");
    setTimeout(() => {
      logout(userstate.userstate.token, userdispatch, history);
      feeddispatch({
        type: "RESET_FEEDS",
      });
    }, 1000);
  };

  const slide = () => {
    barRef.current.classList.toggle("active");
    slideRef.current.classList.toggle("active");
    logoRef.current.classList.toggle("active");
  };

  const alertToggle = () => {
    alertRef.current.classList.toggle("active");
  };
  return (
    <>
      <div className="sticky-top" ref={barRef}>
        <Link to="/home">
          <h1 id="logo" ref={logoRef}>
            Project#3
          </h1>
        </Link>
        <div id="head-avatar">
          <div className="head-alert-container" onClick={alertToggle}>
            <div className="material-icons" id="head-alert">
              notifications
            </div>
            <div id="head-alert-toggle" ref={alertRef}>
              <AlertFeed token={userstate.userstate.token} />
            </div>
          </div>

          <Avatar
            alt={userstate.userstate.username}
            src={userstate.userstate.image}
            style={{ cursor: "pointer" }}
            onClick={slide}
          />
        </div>
      </div>
      <div className="slide-in" ref={slideRef}>
        <ul>
          <Link
            to={`${match.url}/user/${userstate.userstate.username}`}
            onClick={slide}
          >
            <li>{userstate.userstate.nickname}</li>
          </Link>
          <li>My Account</li>
          <li onClick={doLogout}>Logout</li>
        </ul>
      </div>
      <div className="loading" ref={loadRef}></div>
    </>
  );
};

export default Header;

import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./layout.css";
import Avatar from "@material-ui/core/Avatar";

import { userContext } from "../../context/userContext.js";
import { logout } from "../../api/user.js";

const Header = () => {
  const history = useHistory();
  const userstate = useContext(userContext);
  const userdispatch = userstate.userdispatch;

  const slideRef = useRef(false);
  const logoRef = useRef(false);
  const barRef = useRef(false);
  const loadRef = useRef(false);

  const doLogout = () => {
    loadRef.current.classList.toggle("active");
    setTimeout(
      () => logout(userstate.userstate.token, userdispatch, history),
      1000
    );
  };

  const slide = () => {
    barRef.current.classList.toggle("active");
    slideRef.current.classList.toggle("active");
    logoRef.current.classList.toggle("active");
  };
  return (
    <>
      <div className="sticky-top" ref={barRef}>
        <h1 id="logo" ref={logoRef}>
          Project#3
        </h1>
        <div id="head-avatar" style={{ position: "absolute", right: "1.5rem" }}>
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
          <li>{userstate.userstate.nickname}</li>
          <li>My Account</li>
          <li onClick={doLogout}>Logout</li>
        </ul>
      </div>
      <div className="loading" ref={loadRef}></div>
    </>
  );
};

export default Header;

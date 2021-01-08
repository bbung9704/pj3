import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./layout.css";
import Avatar from "@material-ui/core/Avatar";

import { userContext } from "../../context/userContext.js";
import { logout } from "../../api/user.js";

const Header = () => {
  const history = useHistory();
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  const slideRef = useRef(false);
  const logoRef = useRef(false);
  const loadRef = useRef(false);

  const doLogout = () => {
    logout(userstate.userstate.token, dispatch, history);
  };

  const slide = () => {
    slideRef.current.classList.toggle("active");
    logoRef.current.classList.toggle("active");
  };
  return (
    <>
      <div className="sticky-top">
        <h1 id="logo" ref={logoRef}>
          Project#3
        </h1>
        <div style={{ position: "absolute", right: "1rem" }}>
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
          <li>Profile</li>
          <li>My Account</li>
          <li onClick={doLogout}>Logout</li>
        </ul>
      </div>
    </>
  );
};

export default Header;

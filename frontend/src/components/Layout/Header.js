import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./layout.css";
import Avatar from "@material-ui/core/Avatar";

import { userContext } from "../../context/userContext.js";
import { logout } from "../../api/user.js";

const Header = () => {
  const history = useHistory();
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  const doLogout = () => {
    logout(userstate.userstate.token, dispatch, history);
  };

  return (
    <>
      <div className="sticky-top">
        <h1 style={{ color: "pink", margin: "0" }}>Project#3</h1>
        <div style={{ position: "absolute", right: "1rem" }}>
          <Avatar
            alt={userstate.userstate.username}
            src={userstate.userstate.image}
            style={{ cursor: "pointer" }}
            onClick={doLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

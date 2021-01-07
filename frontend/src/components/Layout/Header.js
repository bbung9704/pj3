import React, { useContext } from "react";

import "./layout.css";
import Avatar from "@material-ui/core/Avatar";

import { userContext } from "../../context/userContext.js";

const Header = () => {
  const userstate = useContext(userContext);

  return (
    <>
      <div className="sticky-top">
        <h1 style={{ color: "pink", margin: "0" }}>Project#3</h1>
        <div style={{ position: "absolute", right: "1rem" }}>
          <Avatar
            alt={userstate.userstate.username}
            src={userstate.userstate.image}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

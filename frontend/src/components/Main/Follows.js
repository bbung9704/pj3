import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import "./follows.css";

import { getFollows } from "../../api/user.js";

const Follows = (token) => {
  const [users, setFollow] = useState([]);

  useEffect(() => {
    getFollows(token, setFollow);
  }, []);

  return (
    <>
      <div className="follow-container">
        <ul>
          <div id="follow-container-title">Follow</div>
          {users.map((follow) => {
            return (
              <li key={follow.id} className="follow-user">
                <Avatar
                  alt={follow.username}
                  src={follow.image}
                  style={{ width: "30px", height: "30px" }}
                />
                <span className="user-nick">{follow.nickname}</span>
                <span className="user-time">{`@${follow.username}`}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Follows;

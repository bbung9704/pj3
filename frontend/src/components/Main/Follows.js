import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import "./follows.css";

import { follows } from "../../api/user.js";

const Follows = (token) => {
  const [users, setFollow] = useState([]);

  useEffect(() => {
    follows(token, setFollow);
  }, []);

  return (
    <>
      <div className="follow-container">
        <ul>
          <span style={{ padding: "0.5rem" }}>Follow</span>
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

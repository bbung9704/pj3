import React, { useEffect, useContext } from "react";

import Avatar from "@material-ui/core/Avatar";
import "./follows.css";

import { followContext } from "../../context/followContext.js";

import { getFollows } from "../../api/user.js";

const Follows = (token) => {
  const follow_context = useContext(followContext);
  const follows = follow_context.followstate.feeds;

  useEffect(() => {
    getFollows(token.token, follow_context.followdispatch);
  }, []);

  return (
    <>
      <div className="follow-container">
        <ul>
          <div id="follow-container-title">Follow</div>
          {follows.map((follow) => {
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

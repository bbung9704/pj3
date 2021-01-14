import React, { useEffect, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import "./follows.css";

import { followContext } from "../../context/followContext.js";

import { getFollows } from "../../api/user.js";

const Follows = (token) => {
  const match = useRouteMatch();
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
              <Link key={follow.id} to={`${match.url}/user/${follow.username}`}>
                <li className="follow-user">
                  <Avatar
                    alt={follow.username}
                    src={follow.image}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="user-nick">{follow.nickname}</span>
                  <span className="user-time">{`@${follow.username}`}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Follows;

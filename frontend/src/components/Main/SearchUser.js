import React, { useState, useRef, useContext } from "react";

import "./searchuser.css";

import { followContext } from "../../context/followContext.js";
import { feedContext } from "../../context/feedContext.js";

import { searchUser, makeFollow, getFollows } from "../../api/user.js";
import { getMainFeed } from "../../api/feed.js";

const SearchUser = (token) => {
  const [results, setResult] = useState([]);
  const searchRef = useRef(false);
  const follow_context = useContext(followContext);
  const feed_context = useContext(feedContext);

  const search = () => {
    const text = searchRef.current.value;
    if (text[0] !== " " && text !== "" && text.length >= 2) {
      searchUser(token.token, text, setResult);
    }
  };

  const follow = async (id) => {
    await makeFollow(token.token, id);
    await setTimeout(() => {
      getFollows(token.token, follow_context.followdispatch);
      getMainFeed(token.token, feed_context.feeddispatch);
    }, 100);
  };

  return (
    <>
      <div className="search-container">
        <div id="search-container-title">Search</div>
        <div id="search-container-text">
          <input type="text" className="search-text" ref={searchRef} />
          <span className="material-icons" id="person_search" onClick={search}>
            person_search
          </span>
        </div>
        <ul>
          {results.map((user) => {
            return (
              <li key={user.id} className="follow-user">
                <span
                  className="material-icons"
                  id="person_add"
                  onClick={() => {
                    follow(user.id);
                  }}
                >
                  person_add
                </span>
                <span className="user-nick">{user.nickname}</span>
                <span className="user-time">{`@${user.username}`}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchUser;

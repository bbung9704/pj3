import React, { useState, useRef } from "react";

import "./searchuser.css";

import { searchUser, makeFollow } from "../../api/user.js";

const SearchUser = (token) => {
  const [results, setResult] = useState([]);
  const searchRef = useRef(false);

  const search = () => {
    searchUser(token.token, searchRef.current.value, setResult);
  };

  const follow = (id) => {
    makeFollow(token.token, id);
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

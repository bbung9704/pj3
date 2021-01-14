import React, { useState, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import "./searchuser.css";

import { searchUser } from "../../api/user.js";

const SearchUser = (token) => {
  const match = useRouteMatch();
  const [results, setResult] = useState([]);
  const searchRef = useRef(false);

  const search = () => {
    const text = searchRef.current.value;
    if (text[0] !== " " && text !== "" && text.length >= 2) {
      searchUser(token.token, text, setResult);
      searchRef.current.value = "";
    } else {
      console.error("2자 이상 입력하세요.");
    }
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
              <Link key={user.id} to={`${match.url}/user/${user.username}`}>
                <li className="follow-user">
                  <Avatar
                    alt={user.username}
                    src={user.image}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="user-nick">{user.nickname}</span>
                  <span className="user-time">{`@${user.username}`}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchUser;

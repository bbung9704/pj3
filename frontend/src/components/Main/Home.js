import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { userContext } from "../../context/userContext.js";

import { getUser } from "../../api/user.js";

import Header from "../Layout/Header.js";

const Home = () => {
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  let history = useHistory();

  useEffect(() => {
    if (userstate.userstate.token) {
      getUser(userstate.userstate.token)
        .then((res) =>
          dispatch({
            type: "GET_USER",
            payload: res.data,
          })
        )
        .catch((err) => {
          dispatch({
            type: "RESET_USERSTATE",
          });
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div>Hello, {userstate.userstate.nickname}</div>
    </>
  );
};

export default Home;

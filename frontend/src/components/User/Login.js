import React, { useRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";
import "./user.css";

import { userContext } from "../../context/userContext.js";

import { login } from "../../api/user.js";

const Login = () => {
  let history = useHistory();
  const usernameRef = useRef(false);
  const passwordRef = useRef(false);
  const loadRef = useRef(false);

  const userstate = useContext(userContext);
  const userdispatch = userstate.userdispatch;

  const doLogin = () => {
    loadRef.current.classList.toggle("active");
    setTimeout(() => {
      login(
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        userdispatch,
        history
      );
    }, 500);
  };

  return (
    <>
      <div className="fullscreen-center">
        <div className="col-half-center">
          <h1 style={{ color: "#f50057" }}>Project#3</h1>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Username"
              color="secondary"
              size="small"
              inputRef={usernameRef}
              fullWidth={true}
            />
            <TextField
              id="standard-password-input"
              type="password"
              label="Password"
              color="secondary"
              size="small"
              inputRef={passwordRef}
              fullWidth={true}
            />
            <div className="space-between" style={{ marginTop: "1.5rem" }}>
              <Link to="/register" style={{ textDecorationLine: "none" }}>
                <Button variant="contained" color="secondary" size="small">
                  Register
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={doLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="loading-login" ref={loadRef}></div>
    </>
  );
};

export default Login;

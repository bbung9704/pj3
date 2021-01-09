import React, { useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";
import "./user.css";

import { userContext } from "../../context/userContext.js";
import { register } from "../../api/user.js";

const Register = () => {
  const history = useHistory();
  const userstate = useContext(userContext);
  const dispatch = userstate.dispatch;

  const usernameRef = useRef(false);
  const passwordRef = useRef(false);
  const password2Ref = useRef(false);
  const emailRef = useRef(false);
  const nicknameRef = useRef(false);

  const doRegister = () => {
    if (passwordRef.current.value === password2Ref.current.value) {
      register(
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
          nickname: nicknameRef.current.value,
        },
        dispatch,
        history
      );
    } else {
      console.error("Reconfirm password");
    }
  };

  return (
    <>
      <div className="fullscreen-center">
        <div className="col-half-center">
          <h1 style={{ color: "#f50057" }}>Register</h1>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-username"
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
            <TextField
              id="standard-password2-input"
              type="password"
              label="Confirm Password"
              color="secondary"
              size="small"
              inputRef={password2Ref}
              fullWidth={true}
            />
            <TextField
              id="standard-email"
              type="email"
              label="Email"
              color="secondary"
              size="small"
              inputRef={emailRef}
              fullWidth={true}
            />
            <TextField
              id="standard-nickname"
              label="Nickname"
              color="secondary"
              size="small"
              inputRef={nicknameRef}
              fullWidth={true}
            />
            <div className="space-between" style={{ marginTop: "1.5rem" }}>
              <Link to="/login" style={{ textDecorationLine: "none" }}>
                <Button variant="contained" color="secondary" size="small">
                  Back
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={doRegister}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

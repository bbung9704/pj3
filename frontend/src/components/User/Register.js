import React, { useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./user.css";

import { userContext } from "../../context/userContext.js";
import { register } from "../../api/user.js";

const Register = () => {
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "var(--main-color)",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "var(--main-color)",
      },
    },
  })(TextField);

  const history = useHistory();
  const userstate = useContext(userContext);
  const userdispatch = userstate.userdispatch;

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
        userdispatch,
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
          <h1 style={{ color: "var(--main-color)" }}>Register</h1>
          <form noValidate autoComplete="off">
            <CssTextField
              id="standard-username"
              label="Username"
              color="secondary"
              size="small"
              inputRef={usernameRef}
              fullWidth={true}
            />
            <CssTextField
              id="standard-password-input"
              type="password"
              label="Password"
              color="secondary"
              size="small"
              inputRef={passwordRef}
              fullWidth={true}
            />
            <CssTextField
              id="standard-password2-input"
              type="password"
              label="Confirm Password"
              color="secondary"
              size="small"
              inputRef={password2Ref}
              fullWidth={true}
            />
            <CssTextField
              id="standard-email"
              type="email"
              label="Email"
              color="secondary"
              size="small"
              inputRef={emailRef}
              fullWidth={true}
            />
            <CssTextField
              id="standard-nickname"
              label="Nickname"
              color="secondary"
              size="small"
              inputRef={nicknameRef}
              fullWidth={true}
            />
            <div className="space-between" style={{ marginTop: "1.5rem" }}>
              <Link to="/login" style={{ textDecorationLine: "none" }}>
                <Button variant="contained" size="small">
                  Back
                </Button>
              </Link>
              <Button variant="contained" size="small" onClick={doRegister}>
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

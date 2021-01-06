import React from "react";
import { Link } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";
import "./user.css";

const Login = () => {
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
              fullWidth={true}
            />
            <TextField
              id="standard-password-input"
              type="password"
              label="Password"
              color="secondary"
              size="small"
              fullWidth={true}
            />
            <div className="space-between" style={{ marginTop: "1.5rem" }}>
              <Link to="/register" style={{ textDecorationLine: "none" }}>
                <Button variant="contained" color="secondary" size="small">
                  Register
                </Button>
              </Link>
              <Button variant="contained" color="secondary" size="small">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

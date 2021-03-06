import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../User/user.css";

const NotFound = () => {
  return (
    <>
      <Redirect to="/home" />
      <div className="fullscreen-center">
        <h1 style={{ color: "#f50057" }}>Not Found Page</h1>
        <Link
          to="/"
          style={{
            color: "#f50057",
            textDecoration: "none",
            textDecorationLine: "underline",
          }}
        >
          Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

const UserMain = ({ match }) => {
  return (
    <>
      <div>UserMain</div>
      <Link to={`${match.url}/yoon`}>Yoon</Link>
    </>
  );
};

export default UserMain;

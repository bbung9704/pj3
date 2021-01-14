import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import UserMain from "./UserMain.js";
import UserDetail from "./UserDetail.js";

const UserPage = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.path} component={UserMain} />
        <Route exact path={`${match.path}/:username`} component={UserDetail} />
      </Switch>
    </>
  );
};

export default UserPage;

import React, { Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Feed from "./Feed.js";

const FeedList = (data) => {
  const user = data.user;
  const feeds = data.feeds;
  const match = useRouteMatch();

  return (
    <div className="feed">
      <div className="feed-pencil">
        Feed
        <Link to={`${match.url}/post`}>
          <span id="pencil" className="material-icons">
            create
          </span>
        </Link>
      </div>
      {feeds.map((feed) => {
        return <Feed key={feed.id} token={user.token} data={feed} />;
      })}
    </div>
  );
};

export default FeedList;

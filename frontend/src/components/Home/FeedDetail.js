import React, { useContext, useEffect, useState } from "react";

import "./feed.css";

import { userContext } from "../../context/userContext.js";
import { getOneFeed } from "../../api/feed.js";
import Feed from "./Feed.js";

const FeedDetail = ({ match, history }) => {
  const userstate = useContext(userContext);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getOneFeed(userstate.userstate.token, match.params.id, setFeed);
  }, []);

  return (
    <>
      <div className="feed">
        FeedDetail
        {feed.map((data) => {
          return (
            <Feed key={data.id} token={userstate.userstate.token} data={data} />
          );
        })}
      </div>
    </>
  );
};

export default FeedDetail;

import React, { useContext, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import "./feed.css";

import { userContext } from "../../context/userContext.js";
import { getOneFeed } from "../../api/feed.js";
import Feed from "./Feed.js";

const FeedDetail = ({ match, history }) => {
  const userstate = useContext(userContext);

  const [feed, setFeed] = useState([]);

  const moveBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getOneFeed(userstate.userstate.token, match.params.id, setFeed);
  }, [match]);

  return (
    <>
      <div className="feed">
        <div id="feed-detail-head">
          FeedDetail
          <Button
            variant="outlined"
            size="small"
            onClick={moveBack}
            id="bottom-icon-btn"
          >
            Back
          </Button>
        </div>
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

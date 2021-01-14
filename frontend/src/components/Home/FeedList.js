import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { feedContext } from "../../context/feedContext.js";

import Feed from "./Feed.js";
import { getMainFeed } from "../../api/feed.js";

const FeedList = (data) => {
  const feedstate = useContext(feedContext);
  const feeddispatch = feedstate.feeddispatch;

  const user = data.user;
  const feeds = feedstate.feedstate.feeds;
  const match = useRouteMatch();
  const page = feedstate.feedstate.page;

  const moreFeed = () => {
    if (page <= feedstate.feedstate.pages) {
      getMainFeed(user.token, page, feeddispatch);
    }
  };
  const loader = useRef(moreFeed);
  const observer = useRef(
    new IntersectionObserver(
      (entry) => {
        const first = entry[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );

  const [element, setElement] = useState(null);

  useEffect(() => {
    feeddispatch({
      type: "RESET_FEED",
    });
  }, []);

  useEffect(() => {
    loader.current = moreFeed;
  }, [moreFeed]);

  useEffect(() => {
    const currentElement = element;
    const currentObserveer = observer.current;

    if (currentElement) {
      currentObserveer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserveer.unobserve(currentElement);
      }
    };
  }, [element]);

  const refreshFeed = () => {
    feeddispatch({
      type: "RESET_FEEDS",
    });
  };

  return (
    <>
      <div className="feed">
        <div className="feed-pencil">
          Feed
          <div>
            <span id="pencil" className="material-icons" onClick={refreshFeed}>
              refresh
            </span>
            <Link to={`${match.url}/post`}>
              <span id="pencil" className="material-icons">
                create
              </span>
            </Link>
          </div>
        </div>
        {feeds.map((feed) => {
          return (
            <div key={feed.id} id={`feed-${feed.id}`}>
              <Feed token={user.token} data={feed} match={match} />
            </div>
          );
        })}
        <div ref={setElement}></div>
      </div>
    </>
  );
};

export default FeedList;

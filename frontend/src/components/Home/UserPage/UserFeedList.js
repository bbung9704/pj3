import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Feed from "../Feed.js";
import { getUserFeed } from "../../../api/feed.js";

const UserFeedList = (data) => {
  const [userfeed, setUserFeed] = useState({
    pages: 1,
    page: 1,
    feeds: [],
  });

  const user = data.user;
  const feeds = userfeed.feeds;
  const page = userfeed.page;

  const moreFeed = () => {
    if (page <= userfeed.pages) {
      getUserFeed(user.token, data.username, userfeed.page, setUserFeed);
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
      { threshold: 0.5 }
    )
  );

  const [element, setElement] = useState(null);

  useEffect(() => {
    document.getElementById("app").scrollTo(0, 0);
    setUserFeed({
      pages: 1,
      page: 1,
      feeds: [],
    });
  }, [data]);

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

  return (
    <>
      {feeds.map((feed) => {
        return (
          <div key={feed.id} id={`feed-${feed.id}`}>
            <Feed token={user.token} data={feed} />
          </div>
        );
      })}
      <div ref={setElement}></div>
    </>
  );
};

export default UserFeedList;

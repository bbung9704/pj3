// 작성자(닉네임, 아이디), 작성자 아바타, 작성일시, 내용, 사진(여러장 가능), 댓글, 좋아요
import React, { useRef, useContext } from "react";

import Avatar from "@material-ui/core/Avatar";
import "./feed.css";

import { feedContext } from "../../context/feedContext.js";
import { timeForToday } from "../../api/time.js";
import { deleteFeed, getMainFeed } from "../../api/feed.js";

const Feed = (data) => {
  const feedstate = useContext(feedContext);

  const moreToggleRef = useRef(false);
  const moreToggle = () => {
    moreToggleRef.current.classList.toggle("active");
  };

  const handleDeleteFeed = () => {
    deleteFeed(data.token, data.data.id, getMainFeed, feedstate.feeddispatch);
  };

  return (
    <>
      <div className="feed-container">
        <div className="user">
          <div id="feed-user">
            <Avatar
              alt={data.data.username}
              src={data.data.userimage}
              style={{ width: "35px", height: "35px" }}
            />
            <span className="user-nick">{data.data.nickname}</span>
            <span className="user-time">{`@${
              data.data.username
            }・${timeForToday(data.data.created_at)}`}</span>
          </div>
          <div id="feed-toggle" onClick={moreToggle}>
            <span id="icons" className="material-icons">
              more_horiz
            </span>
            <ul id="more-toggle" ref={moreToggleRef}>
              <div id="more-item">
                <li onClick={handleDeleteFeed}>Delete</li>
                <li>Modify</li>
              </div>
            </ul>
          </div>
        </div>
        <p>{data.data.body}</p>
        <div className="image-container">
          <img
            src={data.data.image[0]}
            style={{ width: "100%", maxWidth: "100%" }}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Feed;

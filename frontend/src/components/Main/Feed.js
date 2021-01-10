// 작성자(닉네임, 아이디), 작성자 아바타, 작성일시, 내용, 사진(여러장 가능), 댓글, 좋아요
import React, { useRef, useContext } from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import "./feed.css";

import { feedContext } from "../../context/feedContext.js";
import { timeForToday } from "../../api/time.js";
import { deleteFeed, getMainFeed } from "../../api/feed.js";
import Comment from "./Comment.js";

const Feed = (data) => {
  const feedstate = useContext(feedContext);

  const moreToggleRef = useRef(false);
  const moreToggle = () => {
    moreToggleRef.current.classList.toggle("active");
  };

  const commentToggleRef = useRef(false);
  const commentToggle = () => {
    commentToggleRef.current.classList.toggle("active");
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
                <li>{data.data.id}</li>
              </div>
            </ul>
          </div>
        </div>
        <p>{data.data.body}</p>
        <div className="image-container">
          {data.data.image.map((img) => {
            return (
              <img
                key={img}
                src={img}
                style={{ width: "100%", maxWidth: "100%" }}
              ></img>
            );
          })}
        </div>
        <div className="bottom-container">
          <div className="comment-container">
            <Button variant="outlined" size="small" onClick={commentToggle}>
              <span className="material-icons" id="bottom-icon">
                comment
              </span>{" "}
              {"  Comment"}
            </Button>
            <ul id="comment-toggle" ref={commentToggleRef}>
              <Comment id={data.data.id} token={data.token} />
            </ul>
          </div>
          <Button variant="outlined" size="small">
            <span className="material-icons" id="bottom-icon">
              favorite
            </span>{" "}
            {data.data.like}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Feed;

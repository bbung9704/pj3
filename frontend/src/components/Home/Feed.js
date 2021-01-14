// 작성자(닉네임, 아이디), 작성자 아바타, 작성일시, 내용, 사진(여러장 가능), 댓글, 좋아요
import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import "./feed.css";

import { feedContext } from "../../context/feedContext.js";
import { timeForToday } from "../../api/time.js";
import { deleteFeed, getMainFeed, makeLike } from "../../api/feed.js";
import Comment from "./Comment.js";

const Feed = (data) => {
  const feedstate = useContext(feedContext);

  const match = useRouteMatch();

  const [like_count, setLike] = useState(0);
  const imgContainerRef = useRef(false);

  useEffect(() => {
    imgContainerRef.current.style.width = `${data.data.image.length * 100}%`;
    setLike(data.data.like);
  }, []);

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

  const handleLike = () => {
    makeLike(data.token, data.data.id, setLike);
  };

  const [counter, setCounter] = useState(1);
  const getPrev = () => {
    if (counter > 1) {
      const size = 100 / data.data.image.length;
      imgContainerRef.current.style.transform =
        "translateX(" + -size * (counter - 2) + "%)";
      setCounter((prev) => prev - 1);
    }
  };

  const getNext = () => {
    if (counter < data.data.image.length) {
      const size = 100 / data.data.image.length;
      imgContainerRef.current.style.transform =
        "translateX(" + -size * counter + "%)";
      setCounter((prev) => prev + 1);
    }
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
        <div className="overflow-hidden">
          <div className="image-container" ref={imgContainerRef}>
            {data.data.image.map((img) => {
              return (
                <div key={img} className="image-wrapper">
                  <img id="image-sizing" src={img} />
                </div>
              );
            })}
          </div>
          {data.data.image.length > 1 ? (
            <>
              <div id="prevBtn" onClick={getPrev}>
                <img src="/media/home/prev.png" />
              </div>
              <div id="nextBtn" onClick={getNext}>
                <img src="/media/home/next.png" />
              </div>
            </>
          ) : null}
        </div>
        <div className="bottom-container">
          <div className="comment-container">
            <Button variant="outlined" size="small" onClick={commentToggle}>
              <span className="material-icons" id="bottom-icon">
                <span>comment</span>
              </span>{" "}
              {"  Comment"}
            </Button>
            <ul id="comment-toggle" ref={commentToggleRef}>
              <Comment id={data.data.id} token={data.token} static={false} />
            </ul>
          </div>
          <Button
            variant="outlined"
            size="small"
            onClick={handleLike}
            id="bottom-icon-btn"
          >
            <span className="material-icons" id="bottom-icon">
              favorite
            </span>{" "}
            {like_count}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Feed;

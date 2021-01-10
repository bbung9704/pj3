import React, { useRef } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import "./comment.css";

const Comment = (id) => {
  const textRef = useRef(false);

  function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = obj.scrollHeight + "px";
  }

  return (
    <>
      <div id="comment-item">
        <li key="key">
          <div className="follow-user">
            <Avatar
              alt="username"
              src="/media/default_image.png"
              style={{ width: "25px", height: "25px" }}
            />
            <span
              className="user-nick"
              style={{ marginLeft: "0.3rem", fontSize: "80%" }}
            >
              nickname
            </span>
            <span className="user-time" style={{ fontSize: "80%" }}>
              @username・35분 전
            </span>
          </div>
          <p>comments body.</p>
        </li>
        <div id="text-margin">
          <textarea
            id="comment-text"
            placeholder="Comment"
            ref={textRef}
            onChange={() => {
              resize(textRef.current);
            }}
          />
          <Button variant="outlined" size="small">
            Comment
          </Button>
        </div>
      </div>
    </>
  );
};

export default Comment;

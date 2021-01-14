import React, { useRef, useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import "./comment.css";

import { getComment, postComment, deleteComment } from "../../api/feed.js";
import { timeForToday } from "../../api/time.js";

const Comment = (data) => {
  const textRef = useRef(false);
  const cssRef = useRef(false);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data.static) {
      cssRef.current.style.position = "static";
      cssRef.current.style.width = "100%";
    }
    getComment(data.token, data.id, setComments);
  }, []);

  function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = obj.scrollHeight + "px";
  }

  const postCommentBtn = async () => {
    if (textRef.current.value !== "") {
      await postComment(data.token, data.id, textRef.current.value);
      await setTimeout(() => {
        getComment(data.token, data.id, setComments);
      }, 100);
    }

    textRef.current.value = "";
    textRef.current.style.height = "1.8rem";
  };

  const deleteCommentBtn = async (id) => {
    await deleteComment(data.token, id);
    await setTimeout(() => {
      getComment(data.token, data.id, setComments);
    }, 100);
  };

  return (
    <>
      <div id="comment-item" ref={cssRef}>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <div className="follow-user">
                <Avatar
                  alt={comment.username}
                  src={comment.userimage}
                  style={{ width: "25px", height: "25px" }}
                />
                <span className="comment-nick">{comment.nickname}</span>
                <span className="comment-time">{`@${
                  comment.username
                }・${timeForToday(comment.created_at)}`}</span>
                <div
                  className="comment-delete"
                  onClick={() => {
                    deleteCommentBtn(comment.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  삭제
                </div>
              </div>
              <p>{comment.body}</p>
            </li>
          );
        })}
        <div id="text-margin">
          <textarea
            id="comment-text"
            placeholder="Comment"
            ref={textRef}
            onChange={() => {
              resize(textRef.current);
            }}
          />
          <Button variant="outlined" size="small" onClick={postCommentBtn}>
            Comment
          </Button>
        </div>
      </div>
    </>
  );
};

export default Comment;

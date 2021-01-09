// 작성자(닉네임, 아이디), 작성자 아바타, 작성일시, 내용, 사진(여러장 가능), 댓글, 좋아요
import React, { useContext } from "react";

import Avatar from "@material-ui/core/Avatar";

import { userContext } from "../../context/userContext.js";

const Feed = () => {
  const userstate = useContext(userContext);
  return (
    <>
      <div className="feed">
        <div className="user">
          <Avatar
            alt={userstate.userstate.username}
            src={userstate.userstate.image}
            style={{ width: "35px", height: "35px" }}
          />
          <span className="user-nick">{userstate.userstate.nickname}</span>
          <span className="user-time">{`@${userstate.userstate.username}・34분 전`}</span>
        </div>
        <p>
          글 내용을 적는 부분입니다. 글 내용을 적는 부분입니다. 글 내용을 적는
          부분입니다. 글 내용을 적는 부분입니다. 글 내용을 적는 부분입니다.글
          내용을 적는 부분입니다. 글 내용을 적는 부분입니다. 글 내용을 적는
          부분입니다. 글 내용을 적는 부분입니다. 글 내용을 적는 부분입니다.
        </p>
        <div className="image-container">
          <img
            src="https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif"
            style={{ maxWidth: "100%" }}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Feed;

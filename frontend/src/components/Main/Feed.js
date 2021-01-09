// 작성자(닉네임, 아이디), 작성자 아바타, 작성일시, 내용, 사진(여러장 가능), 댓글, 좋아요
import React from "react";

import Avatar from "@material-ui/core/Avatar";

const Feed = (data) => {
  return (
    <>
      <div
        style={{
          marginTop: "0.5rem",
          borderBottom: "1px solid var(--sub-color)",
        }}
      >
        <div className="user">
          <Avatar
            alt={data.data.username}
            src={data.data.userimage}
            style={{ width: "35px", height: "35px" }}
          />
          <span className="user-nick">{data.data.nickname}</span>
          <span className="user-time">{`@${data.data.username}・${data.data.created_at}`}</span>
        </div>
        <p>{data.data.body}</p>
        <div className="image-container">
          <img src={data.data.image[0]} style={{ maxWidth: "100%" }}></img>
        </div>
      </div>
    </>
  );
};

export default Feed;

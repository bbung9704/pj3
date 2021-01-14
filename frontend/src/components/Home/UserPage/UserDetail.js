import React, { useEffect, useState, useContext } from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import "../feed.css";
import "./userdetail.css";

import { userContext } from "../../../context/userContext.js";
import { userDetail } from "../../../api/user.js";
import { getUserFeed } from "../../../api/feed.js";

import UserFeedList from "./UserFeedList.js";

// 프로필, 유저 피드, 피드 개수, 팔로우, 팔로워
// 팔로잉, 언팔로잉
const UserDetail = ({ match, history }) => {
  const userstate = useContext(userContext).userstate;

  const [userinfo, setUserInfo] = useState({
    id: null,
    username: null,
    nickname: null,
    image: null,
    follow: 0,
    follower: 0,
  });

  const [userfeed, setUserFeed] = useState({
    pages: 1,
    page: 1,
    feeds: [],
  });

  useEffect(() => {
    userDetail(userstate.token, match.params.username, setUserInfo);
  }, [match]);

  const moveBack = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="feed">
        <div id="feed-detail-head">
          UserDetail
          <Button
            variant="outlined"
            size="small"
            onClick={moveBack}
            id="bottom-icon-btn"
          >
            Home
          </Button>
        </div>
        <div className="user-profile">
          <Avatar
            alt={userinfo.username}
            src={userinfo.image}
            style={{ width: "100px", height: "100px" }}
          />
          <span className="user-bold">{userinfo.nickname}</span>
          <span>{`@${userinfo.username}`}</span>
          <div className="user-usernum">
            <div className="col">
              <div>Follow</div>
              <div className="user-bold">{userinfo.follow}</div>
            </div>
            <div className="col">
              <div>Follower</div>
              <div className="user-bold">{userinfo.follower}</div>
            </div>
            <div className="col">
              <div>Feed</div>
              <div className="user-bold">{userinfo.feed}</div>
            </div>
          </div>
        </div>
        <div>
          <UserFeedList user={userstate} username={match.params.username} />
        </div>
      </div>
    </>
  );
};

export default UserDetail;

import React, { useEffect, useState, useContext } from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import "../feed.css";
import "./userdetail.css";

import { userContext } from "../../../context/userContext.js";
import { followContext } from "../../../context/followContext.js";
import { feedContext } from "../../../context/feedContext";
import {
  userDetail,
  makeFollow,
  deleteFollow,
  getFollows,
} from "../../../api/user.js";

import UserFeedList from "./UserFeedList.js";

// 프로필, 유저 피드, 피드 개수, 팔로우, 팔로워
// 팔로잉, 언팔로잉
const UserDetail = ({ match, history }) => {
  const userstate = useContext(userContext).userstate;
  const followdispatch = useContext(followContext).followdispatch;
  const feeddispatch = useContext(feedContext).feeddispatch;
  const [userinfo, setUserInfo] = useState({
    id: null,
    username: null,
    nickname: null,
    image: null,
    follow: 0,
    follower: 0,
    relation: false,
  });

  useEffect(() => {
    userDetail(userstate.token, match.params.username, setUserInfo);
  }, [match]);

  const moveBack = () => {
    history.push("/home");
  };

  const follow = async (id) => {
    await makeFollow(userstate.token, id);
    await setTimeout(() => {
      getFollows(userstate.token, followdispatch);
      feeddispatch({
        type: "RESET_FEEDS",
      });
    }, 100);
  };

  const unFollow = async (id) => {
    await deleteFollow(userstate.token, id);
    await setTimeout(() => {
      getFollows(userstate.token, followdispatch);
      feeddispatch({
        type: "RESET_FEEDS",
      });
    }, 100);
  };

  return (
    <>
      <div className="feed">
        <div id="feed-detail-head">
          UserDetail
          <div>
            {userinfo.username ===
            userstate.username ? null : userinfo.relation ? (
              <Button
                variant="outlined"
                size="small"
                id="user-btn"
                onClick={() => unFollow(userinfo.id)}
              >
                <span className="material-icons" id="person_disadd">
                  person_add_disabled
                </span>
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                id="user-btn"
                onClick={() => follow(userinfo.id)}
              >
                <span className="material-icons" id="person_add">
                  person_add
                </span>
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              onClick={moveBack}
              id="user-btn"
            >
              Home
            </Button>
          </div>
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

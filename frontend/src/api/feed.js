import axios from "axios";

export const getMainFeed = (token, dispatch) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  axios
    .get("api/feed/", config)
    .then((res) => {
      dispatch({
        type: "GET_MAINFEED",
        payload: res.data,
      });
    })
    .catch((err) => console.error(err.response.data, err.response.status));
};

export const postFeed = (token, form) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post("api/feed/", form, config)
    .then()
    .catch((err) => console.error(err.response.data));
};

export const deleteFeed = (token, id, getMainFeed, feeddispatch) => {
  const config = {
    headers: { Authorization: `Token ${token}` },
    data: { id: id },
  };
  axios
    .delete("api/feed/", config)
    .then(() => getMainFeed(token, feeddispatch))
    .catch((err) => console.error(err.response.data));
};

export const getComment = (token, id, setComments) => {
  const config = {
    headers: { Authorization: `Token ${token}` },
    params: { id: id },
  };

  axios
    .get("api/comment/", config)
    .then((res) => {
      setComments(res.data);
      console.log("GET_COMMENTS");
    })
    .catch((err) => console.error("Cannot load comments"));
};

export const postComment = (token, id, content) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  const body = { id: id, body: content };

  axios
    .post("api/comment/", body, config)
    .then(console.log("POST_COMMENT"))
    .catch((err) => console.error(err.response.data));
};

export const deleteComment = (token, id) => {
  const config = {
    headers: { Authorization: `Token ${token}` },
    data: { id: id },
  };

  axios
    .delete("api/comment/", config)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err.response.data));
};

export const makeLike = (token, id, setLike) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  const body = { id: id };

  console.log("HANDLE_LIKE");
  axios
    .post("api/like/", body, config)
    .then((res) => setLike(res.data.like))
    .catch((err) => console.error(err.response.data));
};

export const getAlertFeed = (token, setAlertFeed) => {
  const config = { headers: { Authorization: `Token ${token}` } };

  console.log("GET_ALERTFEED");
  axios
    .get("api/alertfeed/", config)
    .then((res) => setAlertFeed(res.data))
    .catch((err) => console.error(err.response.data));
};

export const checkAlertFeed = (token, id) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  const body = { id: id };

  console.log("CHECK_ALERTFEED");
  axios
    .post("api/alertfeed/", body, config)
    .then()
    .catch((err) => console.error(err.response.data));
};

export const deleteAlertFeed = (token, id) => {
  const config = {
    headers: { Authorization: `Token ${token}` },
    data: { id: id },
  };

  console.log("DELETE_ALERTFEED");
  axios
    .delete("api/alertfeed/", config)
    .then()
    .catch((err) => console.error(err.response.data));
};

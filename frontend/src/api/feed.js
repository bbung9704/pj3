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
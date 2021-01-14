import axios from "axios";

export const login = ({ username, password }, dispatch, history) => {
  const body = { username, password };
  axios
    .post("api/auth/login/", body)
    .then((res) => {
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err.response.data, err.response.status);
      history.push("/");
      setTimeout(() => {
        console.error("잘못된 아이디 또는 비밀번호");
      }, 300);
    });
};

export const logout = (token, dispatch, history) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  axios
    .post("api/auth/logout/", null, config)
    .then((res) => {
      dispatch({
        type: "LOGOUT",
      });
      history.push("/login");
    })
    .catch((err) => console.error(err));
};

export const getUser = (token, dispatch, history) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  axios
    .get("api/auth/userinfo/", config)
    .then((res) =>
      dispatch({
        type: "GET_USER",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: "RESET_USERSTATE",
      });
      history.push("/login");
    });
};

export const register = (
  { username, password, email, nickname },
  dispatch,
  history
) => {
  const body = { username, password, email, nickname };
  axios
    .post("api/auth/signup/", body)
    .then((res) => {
      dispatch({
        type: "REGISTER",
      });
      history.push("/login");
    })
    .catch((err) => console.error("signup error"));
};

export const getFollows = (token, dispatch) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  axios
    .get("api/auth/follow/", config)
    .then((res) => {
      dispatch({
        type: "GET_FOLLOWS",
        payload: res.data,
      });
    })
    .catch((err) => console.error("follow error"));
};

export const makeFollow = (token, id) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  const body = { id: id };
  console.log("MAKE_FOLLOW");
  axios
    .post("api/auth/follow/", body, config)
    .then()
    .catch((err) => console.error(err.response.data));
};

export const searchUser = (token, content, setResult) => {
  const config = { headers: { Authorization: `Token ${token}` } };

  console.log("SEARCH_USER");
  axios
    .get(`api/auth/searchuser?search=${content}`, config)
    .then((res) => setResult(res.data))
    .catch((err) => console.error(err.response.data));
};

export const userDetail = (token, username, setUserInfo) => {
  const config = {
    headers: { Authorization: `Token ${token}` },
    params: { username: username },
  };

  axios
    .get("api/auth/userdetail/", config)
    .then((res) => setUserInfo(res.data))
    .catch((err) => console.error(err.response.data));
};

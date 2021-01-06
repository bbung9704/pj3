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
    .catch((err) => console.log(err.response.data, err.response.status));
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

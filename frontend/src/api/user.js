import axios from "axios";

export const login = ({ username, password }) => {
  const body = { username, password };
  return axios.post("api/auth/login/", body);
};

export const getUser = (token) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  return axios.get("api/auth/userinfo/", config);
};

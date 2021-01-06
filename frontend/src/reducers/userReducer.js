function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case "GET_USER":
      console.log("GET_USER");
      return {
        ...state,
        username: action.payload.username,
        nickname: action.payload.nickname,
      };
    case "RESET_USERSTATE":
      console.log("RESET_USERSTATE");
      localStorage.removeItem("token");
      return {
        username: null,
        nickname: null,
        token: null,
      };
    default:
      return { ...state };
  }
}

export default reducer;

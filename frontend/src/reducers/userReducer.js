function userReducer(state, action) {
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
        id: action.payload.id,
        username: action.payload.username,
        nickname: action.payload.nickname,
        image: action.payload.image,
      };
    case "RESET_USERSTATE":
    case "LOGOUT":
      console.log("RESET_USERSTATE", "LOGOUT");
      localStorage.removeItem("token");
      return {
        id: null,
        username: null,
        nickname: null,
        image: null,
        token: null,
      };
    default:
      return { ...state };
  }
}

export default userReducer;

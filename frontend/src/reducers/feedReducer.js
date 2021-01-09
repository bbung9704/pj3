function feedReducer(state, action) {
  switch (action.type) {
    case "GET_MAINFEED":
      console.log("GET_MAINFEED");
      return {
        ...state,
        feeds: action.payload,
      };
    default:
      return { ...state };
  }
}

export default feedReducer;

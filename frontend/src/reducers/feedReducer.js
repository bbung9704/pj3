function feedReducer(state, action) {
  switch (action.type) {
    case "GET_MAINFEED":
      console.log("GET_MAINFEED");
      return {
        ...state,
        feeds: state.feeds.concat(action.payload.results),
        pages: Math.ceil(action.payload.count / 5),
        page: state.page + 1,
      };
    case "RESET_FEEDS":
      return {
        ...state,
        feeds: [],
        pages: 1,
        page: 1,
      };
    default:
      return { ...state };
  }
}

export default feedReducer;

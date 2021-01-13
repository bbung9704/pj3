function feedReducer(state, action) {
  switch (action.type) {
    case "GET_MAINFEED":
      console.log("GET_MAINFEED");
      return {
        ...state,
        feeds: state.feeds.concat(action.payload.results),
        pages: Math.ceil(action.payload.count / 3),
      };
    default:
      return { ...state };
  }
}

export default feedReducer;

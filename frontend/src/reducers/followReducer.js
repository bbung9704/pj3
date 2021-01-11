function followReducer(state, action) {
  switch (action.type) {
    case "GET_FOLLOWS":
      console.log("GET_FOLLOWS");
      return {
        ...state,
        feeds: action.payload,
      };
    default:
      return { ...state };
  }
}

export default followReducer;

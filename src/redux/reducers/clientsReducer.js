let INITIAL_STATE = {
  clients: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SOME_ACTION":
    default:
      return state;
  }
};
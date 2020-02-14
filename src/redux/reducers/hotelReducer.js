const initialState = {
  list: [
    { name: "Hotel 1", id: 1 },
    { name: "Hotel 2", id: 2 },
    { name: "Hotel 3", id: 3 },
    { name: "Hotel 4", id: 4 },
    { name: "Hotel 5", id: 5 },
  ]
};
export default (state = initialState, { type, payload }) => {
  switch (type) {

    case "LIST":
      return { ...state, ...payload };

    default:
      return state;
  }
};

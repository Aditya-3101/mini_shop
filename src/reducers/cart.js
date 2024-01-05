export const cart = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((px) => px.id !== action.payload);
    default:
      return state;
  }
};

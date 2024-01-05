export const User = (para) => {
  return {
    type: "ADD_USER",
    payload: para,
  };
};

export const add_item = (para) => {
  return {
    type: "ADD_ITEM",
    payload: para,
  };
};

export const remove_item = (para) => {
  return {
    type: "REMOVE_ITEM",
    payload: para,
  };
};

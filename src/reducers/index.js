import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cart } from "./cart";

export const allReducer = combineReducers({
  userReducer,
  cart,
});

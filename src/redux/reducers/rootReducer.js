import { combineReducers } from "redux";
import userReducer from "./userReducer";
import accountReducer from "./accountReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
});

import { combineReducers } from "redux";
import movies from "./movies";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  movies,
  errors,
  messages,
  auth
});

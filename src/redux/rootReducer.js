import { combineReducers } from "redux";
import { authReducer } from "../slice/authSlice";
export const rootReducer = combineReducers({
  auth: authReducer,
});

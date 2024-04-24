import { combineReducers } from "redux";
import userSlice from "../stores/userSlice";

const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
});

export default rootReducer;

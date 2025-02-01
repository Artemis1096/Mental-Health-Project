import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Features/User/UserSlice";

const store = configureStore({
  reducer: UserReducer,
});

export default store;

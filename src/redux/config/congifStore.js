import { configureStore } from "@reduxjs/toolkit";
import videos from "../modules/videoSlice";
import photos from "../modules/photoSlice";
// import logins from "../modules/loginSlice";

const store = configureStore({
  reducer: { videos, photos },
});

export default store;

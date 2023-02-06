import { configureStore } from "@reduxjs/toolkit";
import videos from "../modules/videoSlice";
import photos from "../modules/photoSlice";

const store = configureStore({
    reducer: { videos, photos },
});

export default store;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../lib/axios";

const initialState = {
    videoRooms: [],
    videoRoomLists: [],
    photos: [],
    isLoading: true,
    error: null,
};

export const __takePhoto = createAsyncThunk(
    "takePhoto",
    async (payload, thunkAPI) => {
        console.log("payload :", payload);
        try {
            // const form = new FormData();
            // form.append("file", payload.file); //form데이터가 객체라 form만 보내면됨
            // form.append("roomId", payload.roomId);

            const data = await apis.Shoot_Photo(payload);

            console.log("POST 추가 데이터", data);
            // return thunkAPI.fulfillWithValue(data);
        } catch (err) {
            console.log(err);

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {},
    extraReducers: {
        [__takePhoto.pending]: (state) => {
            state.isLoading = true;
        },
        [__takePhoto.fulfilled]: (state, action) => {
            // 액션으로 받은 값 = payload 추가해준다.
            state.isLoading = false;
            state.photos = action.payload;
            console.log("action-서버값", action.payload);
            console.log("state값", state);
        },
        [__takePhoto.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default photoSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../lib/axios";

const initialState = {
    videoRooms: [],
    videoRoomLists: [],
    frames: [],
    sessionId: [],
    token: [],
    photos: [],
    photoinfo: [],
    isLoading: true,
    error: null,
};

// photo 저장 관련
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
            return thunkAPI.fulfillWithValue(data);
        } catch (err) {
            console.log(err);

            return thunkAPI.rejectWithValue(err);
        }
    }
);

// frame 저장 관련
export const __chooseFrame = createAsyncThunk(
    "chooseFrame",
    async (payload, thunkAPI) => {
        console.log("payload :", payload);
        try {
            const data = await apis.chooseFrame(payload);
            console.log("POST 추가 데이터", data);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// frame 가져오기 관련
export const __takeFrame = createAsyncThunk(
    "takeFrame",
    async (payload, thunkAPI) => {
        console.log("payload :", payload);
        try {
            const data = await apis.takeFrame(payload);
            console.log("POST 추가 데이터", data);
            return thunkAPI.fulfillWithValue(data.data);
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
        // photo 저장 관련
        [__takePhoto.pending]: (state) => {
            state.isLoading = true;
        },
        [__takePhoto.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.photos = action.payload;
            console.log("action-서버값", action.payload);
            // console.log("state값", state);
        },
        [__takePhoto.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // frame 저장 관련
        [__chooseFrame.pending]: (state) => {
            state.isLoading = true;
        },
        [__chooseFrame.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.frames = action.payload;
            console.log("action-서버값", action.payload);
            // console.log("state값", state);
        },
        [__chooseFrame.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // frame 가져오기 관련
        [__takeFrame.pending]: (state) => {
            state.isLoading = true;
        },
        [__takeFrame.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.photoinfo = action.payload;
            console.log("action-서버값", action.payload);
            // console.log("state값", state);
        },
        [__takeFrame.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default photoSlice.reducer;

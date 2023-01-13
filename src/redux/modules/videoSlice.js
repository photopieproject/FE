import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../lib/axios";

const initialState = {
    videoRooms: [],
    videoRoomLists: [],
    isLoading: true,
    error: null,
};

// 포토부스 방 만들기
export const __createRoom = createAsyncThunk(
    "createRoom",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.createRoom(payload);
            console.log("payload: ", payload);
            console.log("creatRoom data: ", data);
            console.log("creatRoom data.data: ", data.data);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// 포토부스 방 코드로 입장
export const __enterPhotoRoom = createAsyncThunk(
    "enterPhotoRoom",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.enterPhotoRoom(payload);
            console.log("payload: ", payload); // roomCode 넘겨받아야 함
            console.log("enterPhotoRoom: ", data);
            return thunkAPI.fulfillWithValue(data.data); // 필요한 최소한의 정보만 넣어줘야함
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.error.message);
        }
    }
);

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: {
        // 포토부스 방 만들기
        [__createRoom.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__createRoom.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.videoRooms = action.payload.data;
            // state.videoRooms = [...state.videoRooms, action.payload];
            console.log("action.payload: ", action.payload);
            // console.log("state.posts: ", state.posts);
        },
        [__createRoom.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload;
            console.log(action.payload);
            // catch 된 error 객체를 state.error에 넣습니다.
        },

        // 포토부스 방 코드로 입장
        [__enterPhotoRoom.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__enterPhotoRoom.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.videoRooms = action.payload.data;
            console.log("action.payload: ", action.payload);
            // console.log("state.posts: ", state.posts);
        },
        [__enterPhotoRoom.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload;
            console.log(action.payload);
            // catch 된 error 객체를 state.error에 넣습니다.
        },
    },
});

export default videoSlice.reducer;

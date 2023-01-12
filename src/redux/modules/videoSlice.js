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
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// 포토부스 방 코드로 입장
export const __getPhotoRoom = createAsyncThunk(
    "getChatRoom",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.getPhotoRoom(payload);
            console.log("payload: ", payload); // roomCode 넘겨받아야 함
            console.log("getIddata:: ", data);
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
        // 채팅방 생성
        [__createRoom.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__createRoom.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.chats = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
            // console.log("action.payload: ", action.payload);
            // console.log("state.posts: ", state.posts);
        },
        [__createRoom.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload;
            console.log(action.payload);
            // catch 된 error 객체를 state.error에 넣습니다.
        },

        // 채팅방 목록 조회
        [__getPhotoRoom.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getPhotoRoom.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.chats = action.payload.data; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
            // console.log("action.payload: ", action.payload);
            // console.log("state.posts: ", state.posts);
        },
        [__getPhotoRoom.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload;
            console.log(action.payload);
            // catch 된 error 객체를 state.error에 넣습니다.
        },
    },
});

export default videoSlice.reducer;

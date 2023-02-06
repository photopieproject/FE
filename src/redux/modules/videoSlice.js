import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../lib/axios";

const initialState = {
    videoRooms: [],
    videoInfos: [
        {
            sessionId: {},
            token: {},
            role: {},
        },
    ],
    isLoading: true,
    error: null,
};

// 포토부스 방 만들기
export const __createRoom = createAsyncThunk(
    "createRoom",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.createRoom(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

// 포토부스 방 코드로 입장
export const __enterPhotoRoom = createAsyncThunk(
    "enterPhotoRoom",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.enterPhotoRoom(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

// 방 나가기
export const __outPhotoRoom = createAsyncThunk(
    "outPhotoRoom",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.outPhotoRoom(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response);
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
            state.isLoading = true;
        },
        [__createRoom.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.videoRooms = action.payload.data1;
            state.videoInfos = [
                {
                    sessionId: action.payload.data1.sessionId,
                    token: action.payload.data1.token,
                    role: action.payload.data1.role,
                },
            ];
        },
        [__createRoom.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // 포토부스 방 코드로 입장
        [__enterPhotoRoom.pending]: (state) => {
            state.isLoading = true;
        },
        [__enterPhotoRoom.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.videoRooms = action.payload.data1;
            state.videoInfos = [
                {
                    sessionId: action.payload.data1.sessionId,
                    token: action.payload.data1.token,
                    role: action.payload.data1.role,
                },
            ];
        },
        [__enterPhotoRoom.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // 방 종료
        [__outPhotoRoom.pending]: (state) => {
            state.isLoading = true;
        },
        [__outPhotoRoom.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.videoRooms = action.payload;
        },
        [__outPhotoRoom.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default videoSlice.reducer;

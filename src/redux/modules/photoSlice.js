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
    loadRoomInfo: [],
    qrcodeSend: [],
    getQrcode: [],
    kakaoMsg: [],
    isLoading: true,
    error: null,
};

// photo 저장 관련
export const __takePhoto = createAsyncThunk(
    "takePhoto",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.Shoot_Photo(payload);
            return thunkAPI.fulfillWithValue(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// frame 저장 관련
export const __chooseFrame = createAsyncThunk(
    "chooseFrame",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.chooseFrame(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// frame 가져오기 관련
export const __takeFrame = createAsyncThunk(
    "takeFrame",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.takeFrame(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// 전체 사진 가져오기 관련
export const __completePhoto = createAsyncThunk(
    "completePhoto",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.completePhoto(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// 전체 사진 QR 코드 생성 관련
export const __qrcodeSend = createAsyncThunk(
    "qrcodeSend",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.qrcodeSend(payload);
            return thunkAPI.fulfillWithValue(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// 생성된 QR 코드 불러오기
export const __qrcodeGet = createAsyncThunk(
    "qrcodeGet",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.qrcodeGet(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// 생성된 이미지 카카오 전송하기
export const __kakaoMsgSend = createAsyncThunk(
    "kakaoMsgSend",
    async (payload, thunkAPI) => {
        try {
            const data = await apis.kakaoMsgSend(payload);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (err) {
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
        },
        [__takeFrame.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // 전체 사진 가져오기 관련
        [__completePhoto.pending]: (state) => {
            state.isLoading = true;
        },
        [__completePhoto.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.loadRoomInfo = action.payload;
        },
        [__completePhoto.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // 전체 사진 QR 코드 생성 관련
        [__qrcodeSend.pending]: (state) => {
            state.isLoading = true;
        },
        [__qrcodeSend.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.qrcodeSend = action.payload;
        },
        [__qrcodeSend.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // 생성된 QR 코드 불러오기
        [__qrcodeGet.pending]: (state) => {
            state.isLoading = true;
        },
        [__qrcodeGet.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.getQrcode = action.payload;
        },
        [__qrcodeGet.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // 생성된 이미지 카카오 전송하기
        [__qrcodeGet.pending]: (state) => {
            state.isLoading = true;
        },
        [__qrcodeGet.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.kakaoMsg = action.payload;
        },
        [__qrcodeGet.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default photoSlice.reducer;

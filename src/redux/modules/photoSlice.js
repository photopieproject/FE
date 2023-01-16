import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apis } from "../../lib/axios";

export const __takePhoto = createAsyncThunk(
  "addPosting",
  async (payload, thunkAPI) => {
    console.log("payload :", payload);
    try {
      const form = new FormData();
      form.append("file", payload.file); //form데이터가 객체라 form만 보내면됨
      form.append("roomCode", payload.roomCode);
      form.append("photoNum", payload.photoNum);

      // 여기부터
      console.log(Array.from(form));
      for (let obj of form) {
        console.log(obj);
      }
      // 여기까지

      const data = await axios.post("https://photo-pie.shop/api", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("id"),
        },
      });

      console.log("POST 추가 데이터", data);
      //   return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  // initialState,
  reducers: {},
  extraReducers: {
    [__takePhoto.pending]: (state) => {
      state.isLoading = true;
    },
    [__takePhoto.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.

      console.log("action-서버값", action.payload);
      console.log("state값", state);
      state.isLoading = false;
      state.post.data.postList = [...state.post.data.postList, action.payload];
    },
    [__takePhoto.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

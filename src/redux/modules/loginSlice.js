import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../lib/axios";
import Swal from "sweetalert2";

const initialState = {
  phoneNum: "",
};

// id 중복체크
export const __checkUserId = async (userId) => {
  try {
    const data = await apis.checkUserId(userId);
    console.log("userId: ", userId);
    console.log("data: ", data);
    // if (data.data.statusCode === 200) {
    //   // alert(data.data.msg);
    //   Swal.fire("Success", data.data.statusMsg, "success");
    // } else if (data.data.statusCode === 400) {
    //   Swal.fire("Error", data.data.statusMsg, "error");
    // } else {
    //   alert("사용 불가한 아이디입니다.");
    // }
    return data.data.statusCode;
  } catch (error) {
    console.log(error);
    // Swal.fire("Error", "이미 사용중인 아이디입니다", "error");
    // Swal.fire("Error", error.response.data.msg, "error");
    // alert(error);
    // useSweet(1000, "error", error.response.data.msg);
  }
};

export const __postLogin = async (post) => {
  try {
    const data = await apis.postLogin(post);
    // console.log("post: ", post);
    // console.log("data: ", data);
    return data;
  } catch (error) {
    console.log("error", error);
    Swal.fire("Error", error.response.data.statusMsg, "error");
  }
};

export const __postSignup = async (post) => {
  try {
    const data = await apis.postSignup(post);
    // console.log("post: ", post);
    // console.log("data: ", data);
    Swal.fire("Success", data.data.msg, "success");
    // alert("회원가입 성공!");
    return data;
  } catch (error) {
    Swal.fire("Error", error.response.data.statusMsg, "error");
    console.log(error.response.data.statusMsg);
    // alert("error", error.response.data.msg);
  }
};

export const __checkOkConfirm = async (get) => {
  try {
    const data = await apis.checkOkConfirm(get);
    Swal.fire("Success", data.data.msg, "success");
    return data;
  } catch (error) {
    Swal.fire("Error", error.response.data.statusMsg, "error");
    console.log(error.response.data.statusMsg);
  }
};

export const __SMSSend = async (post) => {
  try {
    const data = await apis.smsSend(post);
    Swal.fire("Success", data.data.msg, "success");
    console.log(data);
    return data;
  } catch (error) {
    Swal.fire("Error", error.response.data.statusMsg, "error");
    console.log(error.response.data.statusMsg);
  }
};

export const __SMSSends = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    console.log("payload :", payload);
    try {
      const data = await apis.smsSend(payload);
      console.log("POST 추가 데이터", data.payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [__SMSSends.pending]: (state) => {
      state.isLoading = true;
    },
    [__SMSSends.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.phoneNum(action.payload);
      console.log(action.payload);
    },
    [__SMSSends.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { SMSSends } = loginSlice.actions;
export default loginSlice.reducer;
// -----------------
// import { apis } from "../../lib/axios";
// import Swal from "sweetalert2";

// // id 중복체크
// export const __checkUserId = async (userId) => {
//   try {
//     const data = await apis.checkUserId(userId);
//     console.log("userId: ", userId);
//     console.log("data: ", data);
//     // if (data.data.statusCode === 200) {
//     //   // alert(data.data.msg);
//     //   Swal.fire("Success", data.data.statusMsg, "success");
//     // } else if (data.data.statusCode === 400) {
//     //   Swal.fire("Error", data.data.statusMsg, "error");
//     // } else {
//     //   alert("사용 불가한 아이디입니다.");
//     // }
//     return data.data.statusCode;
//   } catch (error) {
//     console.log(error);
//     // Swal.fire("Error", "이미 사용중인 아이디입니다", "error");
//     // Swal.fire("Error", error.response.data.msg, "error");
//     // alert(error);
//     // useSweet(1000, "error", error.response.data.msg);
//   }
// };

// export const __postLogin = async (post) => {
//   try {
//     const data = await apis.postLogin(post);
//     // console.log("post: ", post);
//     // console.log("data: ", data);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//     Swal.fire("Error", error.response.data.statusMsg, "error");
//   }
// };

// export const __postSignup = async (post) => {
//   try {
//     const data = await apis.postSignup(post);
//     // console.log("post: ", post);
//     // console.log("data: ", data);
//     Swal.fire("Success", data.data.msg, "success");
//     // alert("회원가입 성공!");
//     return data;
//   } catch (error) {
//     Swal.fire("Error", error.response.data.statusMsg, "error");
//     console.log(error.response.data.statusMsg);
//     // alert("error", error.response.data.msg);
//   }
// };

// export const __checkOkConfirm = async (get) => {
//   try {
//     const data = await apis.checkOkConfirm(get);
//     Swal.fire("Success", data.data.msg, "success");
//     return data;
//   } catch (error) {
//     Swal.fire("Error", error.response.data.statusMsg, "error");
//     console.log(error.response.data.statusMsg);
//   }
// };

// export const __SMSSend = async (post) => {
//   try {
//     const data = await apis.smsSend(post);
//     Swal.fire("Success", data.data.msg, "success");
//     console.log(data);
//     return data;
//   } catch (error) {
//     Swal.fire("Error", error.response.data.statusMsg, "error");
//     console.log(error.response.data.statusMsg);
//   }
// };

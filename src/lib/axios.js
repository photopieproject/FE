import axios from "axios";

// 기본 URL
const instance = axios.create({
    baseURL: "https://photo-pie.shop/api",
    header: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

// baseURL
export const baseURL = axios.create({
    baseURL: "https://photo-pie.shop/api",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export const socialLogin = axios.create({
    baseURL: "https://photo-pie.shop/api",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

//인스턴스 request header
baseURL.interceptors.request.use((config) => {
    if (config.headers === undefined) return;
    const token = localStorage.getItem("id");
    const auth = localStorage.getItem("Authorization");
    config.headers["Authorization"] = token === null ? `${auth}` : `${token}`;
    // 혹시 3항 연산자가 안먹히면 수정
    return config;
});

// apis
export const apis = {
    // 로그인 관련
    postLogin: (login) => instance.post("/user/login", login),
    postSignup: (signup) => instance.post("/user/signup", signup),
    checkUserId: (userId) => instance.get(`/user/id-check/${userId}`),
    //   checkNickname: (nickname) => instance.get(`/user/nicknamecheck/${nickname}`),
    checkOkConfirm: () => instance.post("/user/smsmessage"),
    smsSend: (phoneNum) =>
        instance.post(`/user/smsmessage?phoneNumber=${phoneNum}`),
    // 소셜 로그인 관련
    kakaoLogin: (code) => socialLogin.get(`/user/kakao/callback?code=${code}`),
    googleLogin: (code) =>
        socialLogin.get(`/user/google/callback?code=${code}`),

    // 포토부스 방 관련
    createRoom: (roomName) => baseURL.post("/photo/room", roomName),
    enterPhotoRoom: (roomCode) =>
        baseURL.post("/photo/room/roomCode", roomCode),

    // 사진촬영 관련
    Shoot_Photo: (payload) =>
        baseURL.post(`/photo/room/${payload.roomId}/shoot`, payload.formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    chooseFrame: (payload) =>
        baseURL.put(`/photo/room/${payload.roomId}`, payload.frameNum),
    takeFrame: (roomId) => baseURL.get(`/photo/room/${roomId}`),
};

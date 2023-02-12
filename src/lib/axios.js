import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 기본 URL
const instance = axios.create({
    baseURL: `${BASE_URL}/api`,
    header: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

// baseURL
export const baseURL = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

// social 로그인
export const socialLogin = axios.create({
    baseURL: `${BASE_URL}/api`,
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
    smsSend: (phoneNumber) =>
        instance.post(`/user/smsmessage?phoneNumber=${phoneNumber}`),
    sendEmail: (email) => instance.post("/user/emailCheck/", email),
    sendEmailCode: (post) => instance.post("/user/emailCode/", post),
    // 아이디, 비밀번호 찾기, 비밀번호 재설정
    findID: (payload) =>
        instance.post(`/user/find-id?phoneNumber=${payload.phoneNumber}`),
    findPW: (payload) =>
        instance.post(`/user/find-pw?phoneNumber=${payload.phoneNumber}`, {
            userId: payload.userId,
        }),
    resetPW: (password, userId) =>
        instance.put("/user/reset-pw", password, userId),
    outUser: () =>
        baseURL.delete("user/mypage/deleteUser", {
            headers: {
                Authorization: localStorage.getItem("id"),
            },
        }),

    // 소셜 로그인 관련
    kakaoLogin: (code) => socialLogin.get(`/user/kakao/callback?code=${code}`),
    googleLogin: (code) =>
        socialLogin.get(`/user/google/callback?code=${code}`),

    // 포토부스 방 관련
    createRoom: (roomName) => baseURL.post("/photo/room", roomName),
    enterPhotoRoom: (roomCode) =>
        baseURL.post("/photo/room/roomCode", roomCode),
    outPhotoRoom: (roomId) => baseURL.delete(`/photo/room/${roomId}/exit`),

    // 사진촬영 관련
    // 403 error 토큰 에러 / baseURL 적용하면 잘됨
    mainTopFrame: () => instance.get("photo/frameRanking"),
    Shoot_Photo: (payload) => {
        baseURL.post(`/photo/room/${payload.roomId}/shoot`, payload.formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
    chooseFrame: (payload) =>
        baseURL.put(`/photo/room/${payload.roomId}`, payload),
    takeFrame: (roomId) => baseURL.get(`/photo/room/${roomId}`),
    completePhoto: (roomId) => baseURL.get(`/photo/room/${roomId}/shoot`),
    qrcodeSend: (payload) => {
        baseURL.post(
            `/photo/room/${payload.roomId}/completePhoto`,
            payload.formdata,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    },
    qrcodeGet: (roomId) => baseURL.get(`/photo/room/${roomId}/qrCode`),
    kakaoMsgSend: (roomId) => baseURL.get(`/photo/room/${roomId}/kakaoUrl`),
};

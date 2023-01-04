import axios from "axios";

// 기본 URL
const instance = axios.create({
    baseURL: "https://jong-10.shop/api",
    header: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

// baseURL
export const baseURL = axios.create({
    baseURL: "https://jong-10.shop/api",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export const kakaoLogin = axios.create({
    baseURL: "https://jong-10.shop/api",
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
    checkUserName: (username) => instance.get(`/user/idcheck/${username}`),
    checkNickname: (nickname) =>
        instance.get(`/user/nicknamecheck/${nickname}`),

    kakaoLigin: (code) => kakaoLogin.get(`/user/kakao/callback?code=${code}`),
};

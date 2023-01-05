import axios from "axios";

// 기본 URL
const instance = axios.create({
  baseURL: "https://13.124.85.30/api",
  header: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// baseURL
export const baseURL = axios.create({
  baseURL: "https://13.124.85.30/api",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const kakaoLogin = axios.create({
  baseURL: "https://13.124.85.30/api",
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

  kakaoLogin: (code) => kakaoLogin.get(`/user/kakao/callback?code=${code}`),
};

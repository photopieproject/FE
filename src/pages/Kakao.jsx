import React from "react";
import Main from "./Main";
import { apis } from "../lib/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// 리다이렉트될 화면
const Kakao = () => {
    const navigate = useNavigate();
    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");

    apis.kakaoLigin(code)
        .then((res) => {
            console.log(res); // 토큰이 넘어올 것임
            if (res.data.statusCode === 200) {
                const ACCESS_TOKEN = res.headers.authorization;

                localStorage.setItem("Authorization", ACCESS_TOKEN); //예시로 로컬에 저장함
                localStorage.setItem("nickname", res.data.data); //예시로 로컬에 저장함
                Swal.fire(
                    res.data.msg,
                    "카카오 로그인을 성공했습니다!",
                    "success"
                );
                // alert(res.data.msg);
                navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
            }
        })
        .catch((err) => {
            if (err.response.data.status === 500) {
                console.log("소셜로그인 에러", err);
                Swal.fire(
                    "로그인 실패",
                    "카카오 로그인에 실패했습니다!",
                    "error"
                );
                // window.alert("로그인에 실패하였습니다.");
                navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
            }
        });

    return (
        <Main
            display="flex"
            state="loading"
            imgWidth="25%"
            height="100vh"
            text="로그인 중입니다."
        />
    );
};

export default Kakao;

import React from "react";
import Main from "./Main";
import { apis } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 리다이렉트될 화면
const Google = () => {
    const navigate = useNavigate();

    let code = new URL(window.location.href).searchParams.get("code");

    apis.googleLogin(code)
        .then((res) => {
            if (res.data.statusCode === 200) {
                const ACCESS_TOKEN = res.headers.authorization;
                const nickname = res.data.data1.nickname;

                localStorage.setItem("Authorization", ACCESS_TOKEN);
                localStorage.setItem("nickname", nickname);

                toast.success("구글 로그인을 성공했습니다!", {
                    style: {
                        borderRadius: "10px",
                        background: "#3a3232",
                        color: "#fffaf2",
                    },
                    iconTheme: {
                        primary: "#fffaf2",
                        secondary: "#3a3232",
                    },
                    duration: 4000,
                });

                navigate("/");
            }
        })
        .catch((err) => {
            if (err.response.data.status === 500) {
                toast.error("구글 로그인에 실패했습니다!", {
                    style: {
                        borderRadius: "10px",
                        background: "#fffaf2",
                        color: "#3a3232",
                    },
                    iconTheme: {
                        primary: "#3a3232",
                        secondary: "#fffaf2",
                    },
                    duration: 4000,
                });

                navigate("/login");
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

export default Google;

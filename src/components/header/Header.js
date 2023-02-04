import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Span from "../button/Span";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
    const navigate = useNavigate();
    const nickname = localStorage.getItem("nickname");
    const logout = () => {
        toast.success("로그아웃 되었습니다", {
            icon: "👋🏻",
            style: {
                borderRadius: "50px",
                background: "#3a3232",
                color: "#fffaf2",
            },
        });
    };
    const removeStorage = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("nickname");
        localStorage.removeItem("Authorization");
        navigate("/");
    };

    return (
        <StDiv style={{ backgroundColor: "#fffaf2" }}>
            <StDiv nav_main>
                <Span onClick={() => navigate("/")}>
                    <StImg src="/image/photopie_logo_1.png" alt="logo" />
                </Span>
                <StDiv log_sign>
                    {nickname ? (
                        <Span hello>
                            Hello!
                            <Span nick>{nickname}님</Span>
                        </Span>
                    ) : null}
                    {/* 토큰이 있으면 로그아웃으로 버튼 변경(누르면 쿠키삭제) / 토큰 없으면 로그인 버튼 */}
                    {!localStorage.getItem("id") &&
                    !localStorage.getItem("Authorization") ? (
                        <Span onClick={() => navigate("/login")}>로그인</Span>
                    ) : (
                        <>
                            <Span
                                onClick={() => {
                                    logout();
                                    removeStorage();
                                }}
                            >
                                로그아웃
                            </Span>
                            <Toaster />
                        </>
                    )}
                    <Span onClick={() => navigate("/signup")}>회원가입</Span>
                </StDiv>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.nav_main &&
        css`
            width: 1200px;
            /* width: 95%; */
            height: 55px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            margin: 0 auto;
        `}
    ${(props) =>
        props.cate_gory &&
        css`
            display: flex;
            gap: 30px;
        `}
    ${(props) =>
        props.log_sign &&
        css`
            display: flex;
            align-items: center;
            gap: 15px;
        `}
`;

const StImg = styled.img`
    margin: 10px;
    width: 100px;
`;

export default Header;

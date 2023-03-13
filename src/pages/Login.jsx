import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInput } from "../lib/utils/useInput";
import { __postLogin } from "../redux/modules/loginSlice";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/button/Button";
import kakaoBtn from "../images/login/kakao_login2.png";
import googleBtn from "../images/login/google_login.png";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useInput();
    const [password, setPassword] = useInput();

    const KAKAO_AUTH = process.env.REACT_APP_KAKAO_AUTH;
    const GOOGLE_AUTH = process.env.REACT_APP_GOOGLE_AUTH;

    const onSubmitLogin = (e) => {
        e.preventDefault();
        __postLogin({
            userId,
            password,
        })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    toast.success(res.data.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#3a3232",
                            color: "#fffaf2",
                        },
                        iconTheme: {
                            primary: "#fffaf2",
                            secondary: "#3a3232",
                        },
                    });

                    localStorage.setItem("id", res.headers.authorization);
                    localStorage.setItem("nickname", res.data.data1.nickname);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            })
            .catch((err) => {});
    };

    return (
        <StDiv LoginPage>
            <Toaster />
            <StDiv LoginBox>
                <form onSubmit={onSubmitLogin}>
                    <StDiv IDPWBox>
                        <StDiv Login>LOGIN</StDiv>
                        <StDiv social_login>
                            <a href={KAKAO_AUTH}>
                                <img
                                    src={kakaoBtn}
                                    alt="kakao_login2"
                                    style={{ width: "195px", height: "48px" }}
                                />
                            </a>
                            <a href={GOOGLE_AUTH}>
                                <img
                                    src={googleBtn}
                                    alt="google_login"
                                    style={{ width: "200px", height: "48px" }}
                                />
                            </a>
                        </StDiv>
                        <StDiv>───────── OR ─────────</StDiv>
                        <StDiv IdPw>
                            <StP subTit>아이디</StP>
                            <StInput
                                LoginInput
                                type="text"
                                id="userId"
                                value={userId}
                                onChange={setUserId}
                                placeholder="ID"
                            />
                        </StDiv>
                        <StDiv IdPw>
                            <StP subTit>비밀번호</StP>
                            <StInput
                                LoginInput
                                type="password"
                                id="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Password"
                            />
                        </StDiv>
                    </StDiv>
                    <StDiv LoginBtnBox>
                        <Button MainLoginBtn>Login</Button>
                    </StDiv>
                    <StDiv ForgotBox>
                        <Button ForgotID onClick={() => navigate("/findid")}>
                            ID 찾기
                        </Button>
                        /
                        <Button ForgotPW onClick={() => navigate("/findpw")}>
                            Password 찾기
                        </Button>
                    </StDiv>
                </form>
            </StDiv>
            <StDiv RightBox>
                <StDiv LogoBox>
                    <StImg
                        src="/image/photopie_logo_1.png"
                        alt="home_logo"
                        onClick={() => navigate("/")}
                    />
                </StDiv>
                <StDiv TxtBox>
                    <StP RightTxt1>Welcome Back!</StP>
                    <StP RightTxt2>안녕하세요. 포토파이입니다.</StP>
                </StDiv>
                <StDiv>
                    <Button RightSignUpbtn onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                </StDiv>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.LoginPage &&
        css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
        `}
    ${(props) =>
        props.LoginBox &&
        css`
            width: 55%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `}
    ${(props) =>
        props.RightBox &&
        css`
            width: 45%;
            height: 100vh;
            background: #3a3232;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `}
    ${(props) =>
        props.Login &&
        css`
            font-size: 70px;
            display: flex;
            justify-content: center;
            margin: 30px 0;
            color: black;
            font-family: Belleza;
        `}
    ${(props) =>
        props.LogoBox &&
        css`
            margin-bottom: 80px;
        `}
    ${(props) =>
        props.TxtBox &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.IDPWBox &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.IdPw &&
        css`
            font-size: 15px;
            font-weight: bold;
            color: #6b6462;
            padding-top: 30px;
        `}
    ${(props) =>
        props.LoginBtnBox &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 25px;
        `}
        ${(props) =>
        props.social_login &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
        ${(props) =>
        props.ForgotBox &&
        css`
            margin: 10px auto;
            width: 155px;
            height: 20px;
            display: flex;
        `}
`;

const StImg = styled.img`
    width: 140px;
    cursor: pointer;
`;

const StInput = styled.input`
    ${(props) =>
        props.LoginInput &&
        css`
            ::placeholder {
                color: #b9b8b8;
            }
            border: none;
            width: 300px;
            height: 40px;
            background-color: #f2eeee;
            border-radius: 10px;
            &:focus {
                outline: none;
            }
        `}
`;

const StP = styled.p`
    ${(props) =>
        props.RightTxt1 &&
        css`
            font-size: 50px;
            color: #fffaf2;
            margin-top: -60px;
            font-family: "Belleza";
            margin-bottom: 10px;
        `}
    ${(props) =>
        props.RightTxt2 &&
        css`
            font-size: 24px;
            color: #fffaf2;
            margin: 0px auto 60px auto;
        `}
    ${(props) =>
        props.subTit &&
        css`
            margin: 0 0 5px 0;
        `}
`;

export default Login;

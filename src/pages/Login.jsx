import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInput } from "../lib/utils/useInput";
import { __postLogin } from "../redux/modules/loginSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useInput();
    const [password, setPassword] = useInput();

    const KAKAO_AUTH =
        "https://kauth.kakao.com/oauth/authorize?client_id=fe65192e7b1e6f392649c07eb62021aa&redirect_uri=https://photo-pie.store/api/user/kakao/callback&response_type=code";
    const GOOGLE_AUTH =
        "https://accounts.google.com/o/oauth2/v2/auth?client_id=963085836422-fl7eegrisc0bm2ttkubaltkagb0jajrg.apps.googleusercontent.com&redirect_uri=https://photo-pie.store/api/user/google/callback&response_type=code&scope=profile";

    // LOGIN
    const onSubmitLogin = (e) => {
        e.preventDefault();
        __postLogin({
            userId,
            password,
        })
            .then((res) => {
                console.log("res: ", res);
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
            .catch((err) => {
                console.log(err);
            });
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
                                    src="/image/kakao_login2.png"
                                    alt="kakao_login2"
                                    style={{ width: "195px" }}
                                />
                            </a>
                            <a href={GOOGLE_AUTH}>
                                <img
                                    src="/image/google_login.png"
                                    alt="google_login"
                                    style={{ width: "200px" }}
                                />
                            </a>
                        </StDiv>
                        <StDiv>───────── OR ─────────</StDiv>
                        <StDiv IdPw>
                            아이디
                            <br />
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
                            비밀번호
                            <br />
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
                        <StBtn LoginBtn>Login</StBtn>
                    </StDiv>
                    <StDiv ForgotBox>
                        <StBtn ForgotID onClick={() => navigate("/findid")}>
                            ID 찾기
                        </StBtn>
                        /
                        <StBtn ForgotPW onClick={() => navigate("/findpw")}>
                            Password 찾기
                        </StBtn>
                    </StDiv>
                </form>
            </StDiv>
            <StDiv RightBox>
                <StDiv LogoBox>
                    <img
                        src="/image/photopie_logo_1.png"
                        alt="home_logo"
                        style={{ width: "140px", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    />
                </StDiv>
                <StDiv TxtBox>
                    <StP RightTxt1>Welcome Back!</StP>
                    <StP RightTxt2>안녕하세요. 포토파이입니다.</StP>
                </StDiv>
                <StDiv>
                    <StBtn RightSignUpbtn onClick={() => navigate("/signup")}>
                        Sign Up
                    </StBtn>
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
        props.SignUpGoBox &&
        css`
            font-size: 13px;
            display: flex;
            justify-content: center;
            margin-top: 10px;
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
            color: white;
            margin-top: -60px;
            font-family: "Belleza";
            margin-bottom: 10px;
        `}

    ${(props) =>
        props.RightTxt2 &&
        css`
            font-size: 24px;
            color: white;
            margin: 0px auto 60px auto;
        `}
`;
const StBtn = styled.button`
    ${(props) =>
        props.RightSignUpbtn &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            margin-top: -10px;
            border: 1px solid #fffaf2;
            background-color: #3a3232;
            color: white;
            &:hover {
                cursor: pointer;
                background-color: #fffaf2;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.ForgotID &&
        css`
            width: 50px;
            display: flex;
            padding: 0px;
            font-size: 13px;
            background-color: transparent;
            color: #3a3232;
            border: none;
            /* margin: 5px 0px -5px 220px; */
            font-weight: bold;
            &:hover {
                cursor: pointer;
            }
        `}
  ${(props) =>
        props.ForgotPW &&
        css`
            width: 100px;
            padding: 0 0 0 5px;
            display: flex;
            font-size: 13px;
            background-color: transparent;
            color: #3a3232;
            border: none;
            /* margin: 5px 0px -5px 220px; */
            font-weight: bold;
            &:hover {
                cursor: pointer;
            }
        `}
  ${(props) =>
        props.LoginBtn &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            margin-bottom: 10px;
            background-color: #fffaf2;
            border: 2px solid #3a3232;
            /* transition: 500ms; */
            color: #3a3232;
            &:hover {
                cursor: pointer;
                background-color: #3a3232;
                color: #fffaf2;
                /* font-size: 15px; */
            }
        `}
  ${(props) =>
        props.LoginBtnKakao &&
        css`
            width: 300px;
            height: 40px;
            border-radius: 15px;
            margin-bottom: 10px;
            background: linear-gradient(120deg, #fee102, #fff8a8, #fee102);
            background-size: 200%;
            transition: 500ms;
            border: none;
            /* background-color: #fee102; */
            color: black;
            font-weight: bold;
            &:hover {
                cursor: pointer;
                background-position: right;
            }
        `}

  ${(props) =>
        props.LoginBtnGoogle &&
        css`
            width: 300px;
            height: 40px;
            border-radius: 15px;
            margin-bottom: 5px;
            background: linear-gradient(120deg, #000000, #7b7b7b, #000000);
            background-size: 200%;
            transition: 500ms;
            border: none;
            color: white;
            font-weight: bold;
            &:hover {
                cursor: pointer;
                background-position: right;
            }
        `}
  
  ${(props) =>
        props.SignUpGoBtn &&
        css`
            border: none;
            background-color: transparent;
            font-weight: bold;
            color: #7d6945;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        `}
`;
export default Login;

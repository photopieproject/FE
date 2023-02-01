import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInput } from "../lib/utils/useInput";
import { __postLogin } from "../redux/modules/loginSlice";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useInput();
    const [password, setPassword] = useInput();

    const KAKAO_AUTH =
        "https://kauth.kakao.com/oauth/authorize?client_id=fe65192e7b1e6f392649c07eb62021aa&redirect_uri=https://dev.djcf93g3uh9mz.amplifyapp.com/api/user/kakao/callback&response_type=code";
    const GOOGLE_AUTH =
        "https://accounts.google.com/o/oauth2/v2/auth?client_id=963085836422-fl7eegrisc0bm2ttkubaltkagb0jajrg.apps.googleusercontent.com&redirect_uri=https://dev.djcf93g3uh9mz.amplifyapp.com/api/user/google/callback&response_type=code&scope=profile";

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
                    // alert("로그인 성공!");
                    Swal.fire("Success", res.data.statusMsg, "success");
                }
                localStorage.setItem("id", res.headers.authorization);
                // localStorage.setItem("userId", res.data.userId);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                // alert("ID 또는 Password가 틀립니다");
            });
        // .catch((error) => alert(error.response.data.msg));
    };

    return (
        <div>
            <StDiv LoginBox>
                <form onSubmit={onSubmitLogin}>
                    <StDiv IDPWBox>
                        <StDiv Login>로그인</StDiv>
                        <StDiv IdPw>
                            ID
                            <br />
                            <StInput
                                LoginInput
                                type="text"
                                id="userId"
                                value={userId}
                                onChange={setUserId}
                                placeholder="ID를 입력해주세요"
                            />
                        </StDiv>
                        <StDiv IdPw>
                            Password
                            <br />
                            <StInput
                                LoginInput
                                type="password"
                                id="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Password를 입력해주세요."
                            />
                        </StDiv>
                        {/* <StBtn Forgot onClick={() => navigate("/findid")}>
              아이디 찾기
            </StBtn>
            <StBtn Forgot onClick={() => navigate("/findpw")}>
              비밀번호 찾기
            </StBtn> */}
                    </StDiv>
                    <StDiv LoginBtnBox>
                        <StBtn LoginBtn>ID 로그인</StBtn>
                    </StDiv>
                </form>
                <StDiv social_login>
                    <a href={KAKAO_AUTH}>
                        <StBtn LoginBtnKakao>Kakao 로그인</StBtn>
                    </a>
                    {/* <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=963085836422-fl7eegrisc0bm2ttkubaltkagb0jajrg.apps.googleusercontent.com&redirect_uri=https://dev.djcf93g3uh9mz.amplifyapp.com/api/user/google/callback&scope=https://www.googleapis.com/auth/userinfo.profile&https://www.googleapis.com/auth/userinfo.email&response_type=code"> */}
                    <a href={GOOGLE_AUTH}>
                        <StBtn LoginBtnGoogle>Google 로그인</StBtn>
                        {/* `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BASEURL}oauth/google/callback&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code`; */}
                    </a>
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
                <StDiv SignUpGoBox>
                    계정이 없으신가요?
                    <StBtn SignUpGoBtn onClick={() => navigate("/signup")}>
                        회원가입
                    </StBtn>
                </StDiv>
            </StDiv>
        </div>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.LoginBox &&
        css`
            width: 400px;
            height: 600px;
            border: 1px solid black;
            color: black;
        `}

    ${(props) =>
        props.Login &&
        css`
            font-size: 30px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            margin: 50px 0 10px 0;
            color: #7d6945;
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
            color: gray;
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
                color: #cacaca;
            }
            border: none;
            border-bottom: solid 2px black;
            width: 300px;
            height: 40px;
            &:focus {
                outline: none;
                border-bottom: solid 4px #ecdfc8;
            }
        `}
`;

const StBtn = styled.button`
    ${(props) =>
        props.ForgotID &&
        css`
            width: 50px;
            display: flex;
            padding: 0px;
            font-size: 13px;
            background-color: transparent;
            color: #7d6945;
            border: none;
            /* margin: 5px 0px -5px 220px; */
            font-weight: bold;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
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
            color: #7d6945;
            border: none;
            /* margin: 5px 0px -5px 220px; */
            font-weight: bold;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        `}
  ${(props) =>
        props.LoginBtn &&
        css`
            width: 300px;
            height: 40px;
            border-radius: 15px;
            margin-bottom: 10px;
            background: linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945);
            background-size: 200%;
            border: none;
            transition: 500ms;
            color: white;
            font-weight: bold;
            &:hover {
                cursor: pointer;
                background-position: right;
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

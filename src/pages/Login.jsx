import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInput } from "../lib/utils/useInput";
import { __postLogin } from "../redux/modules/loginSlice";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useInput();
    const [password, setPassword] = useInput();

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
                    alert("로그인 성공!");
                }
                localStorage.setItem("id", res.headers.authorization);
                localStorage.setItem("userId", res.data.userId);
                navigate("/");
            })
            .catch((error) => alert("ID 또는 Password가 틀립니다"));
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
                        <StBtn Forgot>비밀번호 찾기</StBtn>
                    </StDiv>
                    <StDiv LoginBtnBox>
                        <StBtn LoginBtn>ID 로그인</StBtn>
                    </StDiv>
                </form>

                <a href="https://kauth.kakao.com/oauth/authorize?client_id=fe65192e7b1e6f392649c07eb62021aa&redirect_uri=https://dev.djcf93g3uh9mz.amplifyapp.com/api/user/kakao/callback&response_type=code">
                    <StBtn LoginBtnKakao>Kakao 로그인</StBtn>
                </a>
                <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=963085836422-fl7eegrisc0bm2ttkubaltkagb0jajrg.apps.googleusercontent.com&redirect_uri=https://dev.djcf93g3uh9mz.amplifyapp.com/api/user/google/callback&response_type=code&scope=profile">
                    <StBtn LoginBtnGoogle>Google 로그인</StBtn>
                </a>
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
            color: #706fd3;
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
            margin-top: 10px;
        `}

${(props) =>
        props.SignUpGoBox &&
        css`
            font-size: 13px;
            display: flex;
            justify-content: center;
            margin-top: 10px;
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
                border-bottom: solid 4px #a7a5ff;
            }
        `}
`;

const StBtn = styled.button`
    ${(props) =>
        props.Forgot &&
        css`
            background-color: transparent;
            color: #706fd3;
            border: none;
            margin: 10px 0px 10px 220px;
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
            background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
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
            color: #706fd3;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        `}
`;
export default Login;

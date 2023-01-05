import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { __postSignup } from "../redux/modules/loginSlice";
import { useInput } from "../lib/utils/useInput";

const SignUp = () => {
  const [userId, setUserId] = useInput();
  const [nickname, setNickName] = useInput();
  const [password, setPassword] = useInput();
  const [passwordCheck, setPasswordCheck] = useInput();

  const navigate = useNavigate();

  const onSubmitSignup = (e) => {
    e.preventDefault();
    __postSignup({
      userId,
      nickname,
      password,
      passwordCheck,
    })
      .then((res) => {
        // console.log("signup res: ", res);
        // alert(res.data.msg);
        localStorage.setItem("id", res.headers.authorization);
        navigate("/login");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  return (
    <div>
      <StDiv SingUpBox>
        <StDiv SingUp>회원가입</StDiv>
        <StDiv IDPWBox>
          <form onSubmit={onSubmitSignup}>
            <StDiv IdPw>
              ID
              <br />
              <StInput
                LoginInput2
                type="text"
                id="userId"
                value={userId}
                onChange={setUserId}
                placeholder="5~10자 영문 소문자, 숫자"
              />
              <StBtn IdCheckBtn>중복체크</StBtn>
            </StDiv>

            <StDiv IdPw>
              Nickname
              <br />
              <StInput
                LoginInput
                type="text"
                id="nickname"
                value={nickname}
                onChange={setNickName}
                placeholder="닉네임을 입력해주세요."
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
                autoComplete="off"
                placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
              />
            </StDiv>
            <StDiv IdPw>
              Password Check
              <br />
              <StInput
                LoginInput
                type="password"
                id="password"
                value={passwordCheck}
                onChange={setPasswordCheck}
                autoComplete="off"
                placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
              />
            </StDiv>
          </form>
        </StDiv>

        <StDiv LoginBtnBox>
          <StBtn LoginBtn>회원가입</StBtn>
        </StDiv>
        <StDiv SignUpGoBox>
          계정이 이미 있으신가요?
          <StBtn SignUpGoBtn onClick={() => navigate("/login")}>
            로그인
          </StBtn>
        </StDiv>
      </StDiv>
    </div>
  );
};

const StDiv = styled.div`
  ${(props) =>
    props.SingUpBox &&
    css`
      width: 400px;
      height: 600px;
      border: 1px solid black;
      color: black;
    `}

  ${(props) =>
    props.SingUp &&
    css`
      font-size: 30px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin: 30px 0 0px 0;
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

// const StP = styled.p`
//   margin: 0;
//   font-size: 13px;
//   color: gray;
// `;

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
  ${(props) =>
    props.LoginInput2 &&
    css`
      ::placeholder {
        color: #cacaca;
      }
      border: none;
      border-bottom: solid 2px black;
      width: 200px;
      height: 40px;
      &:focus {
        outline: none;
        border-bottom: solid 4px #a7a5ff;
      }
    `}
`;

const StBtn = styled.button`
  /* ${(props) =>
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
    `} */

  ${(props) =>
    props.IdCheckBtn &&
    css`
      width: 80px;
      height: 35px;
      border-radius: 10px;
      margin: 0 0 0 20px;
      background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
      background-size: 200%;
      border: none;
      transition: 500ms;
      color: white;
      font-weight: bold;
      &:hover {
        cursor: pointer;
        background-position: right;
      }
    `}
  ${(props) =>
    props.LoginBtn &&
    css`
      width: 300px;
      height: 40px;
      border-radius: 15px;
      margin: 10px auto;
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
export default SignUp;

import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { __postSignup, __checkUserId } from "../../redux/modules/loginSlice";
import { useInput } from "../../lib/utils/useInput";
import { useState } from "react";

const Registration = () => {
  const [userId, setUserId] = useInput();
  const [nickname, setNickName] = useInput();
  const [password, setPassword] = useInput();
  const [passwordCheck, setPasswordCheck] = useInput();
  const [checkUserId, setCheckUserId] = useState(false);
  const [checkP, setCheckP] = useState();
  const [registDisabled, setRegistDisabled] = useState(true);
  const [PWPtag, setPWPtag] = useState();
  const [PWConfirm, setPWConfirm] = useState("");
  const [PWConfirmP, setPWConfirmP] = useState(false);

  function isPassword(asValue) {
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return regExp.test(asValue);
  }

  const PWChk = () => {
    if (!isPassword(password)) {
      setPWPtag(
        <StPs>영문대문자+소문자/숫자/특수문자를 모두포함한, 8-15자</StPs>
      );
    } else {
      setPWPtag(<StPs2>사용가능한 비밀번호 입니다</StPs2>);
    }
  };

  const PWConfirmChk = () => {
    if (password === PWConfirm) {
      setPWConfirmP(<StPs2>비밀번호 확인되었습니다.</StPs2>);
      setRegistDisabled(false);
    } else {
      setPWConfirmP(<StPs>비밀번호가 일치하지않습니다</StPs>);
      setRegistDisabled(true);
    }
  };

  const navigate = useNavigate();

  function isId(userId) {
    var regExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g;
    return regExp.test(userId);
  }

  const onSubmitSignup = (e) => {
    e.preventDefault();
    console.log("checkUserId:", checkUserId);
    if (checkUserId === false) {
      alert("중복체크를 확인해주세요!");
      return;
    }
    __postSignup({
      //서버로 요청하는 부분
      userId,
      nickname,
      password,
      // passwordCheck,
      PWConfirm,
      // params: { phoneNum: "" },
      // 전역상태
      // 부모컴포넌트에서 자식컴포넌트 useState
    })
      .then((res) => {
        //서버에서 받아온 부분

        console.log("signup res: ", res);
        // alert(res.data.msg);
        localStorage.setItem("id", res.headers.authorization);
        navigate("/login");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  ///^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g 아이디정규식
  const checkUserIdHandler = (userId) => {
    __checkUserId(userId).then((res) => {
      if (isId(userId) === false) {
        alert("ID는 영문 소문자, 숫자로 5~10자입니다.");
      } else {
        console.log(res);
        if (res === 200) {
          setCheckUserId(true);
          setCheckP("사용 가능한 ID입니다");
        } else if (res === 400) {
          setCheckUserId(false);
          setCheckP("이미 사용중인 ID입니다");
        }
      }
    });
  };

  return (
    <div>
      <StDiv SingUpBox>
        <StDiv SingUp>회원가입</StDiv>
        <StDiv IDPWBox>
          <div>
            <StDiv IdPw>
              ID
              <br />
              <StInput
                LoginInput2
                type="text"
                id="userId"
                value={userId}
                disabled={checkUserId}
                onChange={setUserId}
                placeholder="5~10자 영문 소문자, 숫자"
              />
              <StBtn
                IdCheckBtn
                disabled={checkUserId}
                checkUserId={checkUserId}
                onClick={() => checkUserIdHandler(userId)}
              >
                중복체크
              </StBtn>
              <StP>{checkP}</StP>
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
                onBlur={PWChk}
                value={password}
                onChange={setPassword}
                autoComplete="off"
                placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
              />
              <StP>{PWPtag}</StP>
            </StDiv>
            <StDiv IdPw>
              Password Check
              <br />
              <StInput
                LoginInput
                onBlur={PWConfirmChk}
                type="password"
                id="password"
                required
                // value={passwordCheck}
                // onChange={setPasswordCheck}
                value={PWConfirm}
                onChange={(e) => {
                  setPWConfirm(e.target.value);
                }}
                autoComplete="off"
                placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
              />
            </StDiv>

            <StP>{PWConfirmP}</StP>
          </div>
        </StDiv>

        <StDiv LoginBtnBox>
          <StBtn
            LoginBtn
            disabled={registDisabled}
            registDisabled={registDisabled}
            onClick={onSubmitSignup}
          >
            회원가입
          </StBtn>
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
      width: 500px;
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
      padding-top: 20px;
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

const StP = styled.p`
  font-size: 13px;
  font-weight: lighter;
  margin-top: 5px;
  color: gray;
  margin-bottom: -10px;
`;

const StPs = styled.p`
  margin-top: 7px;
  font-size: 12px;
  color: red;
`;

const StPs2 = styled.p`
  margin-top: 7px;
  font-size: 12px;
  color: limegreen;
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
        border-bottom: solid 4px #ecdfc8;
      }
    `}
`;

const StBtn = styled.button`
  /* ${(props) =>
    props.Forgot &&
    css`
      background-color: transparent;
      color: #9f8759;
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
      /* background: linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945); */
      background-size: 200%;
      border: none;
      transition: 500ms;
      /* color: white; */
      font-weight: bold;
      background: ${({ checkUserId }) =>
        checkUserId
          ? "#d9d9d9"
          : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
      color: ${({ checkUserId }) => (checkUserId ? "#7d6945" : "white")};
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
      background: ${({ registDisabled }) =>
        registDisabled
          ? "#d9d9d9"
          : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
      color: ${({ registDisabled }) => (registDisabled ? "#7d6945" : "white")};
      background-size: 200%;
      transition: 500ms;
      border: none;
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
      color: #7d6945;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    `}
`;

export default Registration;

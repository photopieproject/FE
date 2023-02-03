import styled, { css } from "styled-components";
import { useInput } from "../../lib/utils/useInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { __resetPW } from "../../redux/modules/loginSlice";

function ResetPW({ userId, setUserId }) {
  const [password, setPassword] = useInput();
  const [PWConfirm, setPWConfirm] = useState("");
  const [PWPtag, setPWPtag] = useState();
  const [PWConfirmP, setPWConfirmP] = useState(false);
  // const [okConfirm, setOkConfirm] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const navigate = useNavigate();

  console.log("userId : ", userId);

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
    if (password !== PWConfirm || password === "") {
      setPWConfirmP(<StPs>입력한 비밀번호와 일치하지 않습니다.</StPs>);
    } else if (password === PWConfirm) {
      setPWConfirmP(<StPs2>비밀번호 확인되었습니다.</StPs2>);
      setNextDisabled(false);
    }
  };

  const ResetPWHandler = (password, userId) => {
    console.log(userId);

    navigate("/login");
    __resetPW({
      //서버로 요청하는 부분
      userId,
      password, //나중에 없애야함, 나중에 phoneNumber랑 CodeNumber를 백한테 같이보내줘야함 백은 트루, 폴스를 보내줌 status===200 인증성공, statusCode로 판단
    })
      .then((res) => {
        if (res === 200) {
          setUserId();
          // setCheckP("사용 가능한 ID입니다");
        } else if (res === 400) {
          // setCheckP("이미 사용중인 ID입니다");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  return (
    <div>
      <StDiv ResetPWBox>
        <StDiv FindPWMsg>
          <StDiv FindPw>비밀번호 변경하기</StDiv>
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
          <StDiv NextGoBtnBox>
            <StBtn
              NextGoBtn
              onClick={() => ResetPWHandler(password, userId)}
              disabled={nextDisabled}
              nextDisabled={nextDisabled}
              type="button"
              name="checkbutton"
              value=""
            >
              다음
            </StBtn>
          </StDiv>
        </StDiv>
      </StDiv>
    </div>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.ResetPWBox &&
    css`
      width: 500px;
      height: 600px;
      border: 1px solid black;
      color: black;
    `}
  ${(props) =>
    props.FindPWMsg &&
    css`
      width: 500px;
      height: 600px;
      border: 1px solid black;
      color: black;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

  ${(props) =>
    props.FindPw &&
    css`
      font-size: 30px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin: 50px 0 20px 0;
      color: #7d6945;
    `}
    ${(props) =>
    props.IdPw &&
    css`
      font-size: 15px;
      font-weight: bold;
      color: gray;
      margin-top: 20px;
    `}
     ${(props) =>
    props.NextGoBtnBox &&
    css`
      display: flex;
      justify-content: center;
      margin-top: 20px;
    `}
`;
const StBtn = styled.button`
  ${(props) =>
    props.NextGoBtn &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 40px;
      border-radius: 15px;
      background: ${({ nextDisabled }) =>
        nextDisabled
          ? "#d9d9d9"
          : // : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
            "#402c00"};
      &:hover {
        background-color: #af9462;
      }
      color: ${({ nextDisabled }) => (nextDisabled ? "#402c00" : "white")};
      background-size: 200%;
      transition: 500ms;
      border: none;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      &:disabled {
        background-color: #ddd8d8;
      }
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
export default ResetPW;

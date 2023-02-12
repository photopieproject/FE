import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useInput } from "../../lib/utils/useInput";
import Button from "../button/Button";
import SmsMessage from "../SMS/SmsMessage";

function FindPWMsg({ setShow, userId, setUserId }) {
  const [nextDisabled, setNextDisabled] = useState(true);
  const [okConfirm, setOkConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useInput();
  const navigate = useNavigate();

  const nextResetGoBtn = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const nextFindIDBtn = () => {
    navigate("/findid");
  };

  useEffect(() => {
    if (okConfirm === true) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [okConfirm]);

  return (
    <StDiv FindPWMsgPage>
      <StDiv FindPWMsg>
        <StDiv FindPw>Find Password</StDiv>
        <StDiv IdPw>
          <p>ID</p>
          <StInput
            LoginInput2
            type="text"
            id="myID"
            value={userId}
            onChange={setUserId}
            placeholder="ID를 입력해주세요"
          />
        </StDiv>
        <StDiv smsspace>
          <SmsMessage
            setOkConfirm={setOkConfirm}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            userId={userId}
          />
        </StDiv>
        <StDiv NextGoBtnBox>
          <Button NextGoBtn1 onClick={nextFindIDBtn}>
            아이디찾기
          </Button>
          <Button
            NextGoBtn
            onClick={nextResetGoBtn}
            disabled={!okConfirm}
            nextDisabled={!okConfirm}
          >
            Next
          </Button>
        </StDiv>
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
          <Button RightLoginbtn onClick={() => navigate("/login")}>
            Login
          </Button>
        </StDiv>
      </StDiv>
    </StDiv>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.FindPWMsgPage &&
    css`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
  ${(props) =>
    props.FindPWMsg &&
    css`
      width: 55%;
      height: 100vh;
      color: black;
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
    props.FindPw &&
    css`
      font-size: 70px;
      display: flex;
      justify-content: center;
      font-family: "Belleza";
      margin: 30px 0 0px 0;
      color: black;
    `}
    ${(props) =>
    props.IdPw &&
    css`
      font-size: 15px;
      font-weight: bold;
      color: #6b6462;
      padding-top: 20px;
    `}
    ${(props) =>
    props.smsspace &&
    css`
      color: #7d6945;
      font-weight: bold;
      margin-top: 20px;
    `}
    ${(props) =>
    props.NextGoBtnBox &&
    css`
      display: flex;
      justify-content: center;
      margin-top: 20px;
      gap: 10px;
    `}
`;

const StInput = styled.input`
  ${(props) =>
    props.LoginInput2 &&
    css`
      ::placeholder {
        color: #b9b8b8;
      }
      background-color: #f2eeee;
      border-radius: 10px;
      border: none;
      width: 335px;
      height: 40px;
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
      font-family: Belleza;
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

const StImg = styled.img`
  width: 140px;
  cursor: pointer;
`;

export default FindPWMsg;

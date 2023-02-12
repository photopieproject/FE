import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useInput } from "../../lib/utils/useInput";
import Button from "../button/Button";
import SmsMessage from "../SMS/SmsMessage";

function FindId1({ setShow }) {
  const [nextDisabled, setNextDisabled] = useState(true);
  const [okConfirm, setOkConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useInput();
  const [isShow, setIsShow] = useState();
  const [isUserId, setIsUserId] = useState();
  const navigate = useNavigate();

  const onSubmitFindId = (e) => {
    e.preventDefault();
    setIsShow(true);
  };

  const GoFindPWBtn = () => {
    navigate("/findpw");
  };

  useEffect(() => {
    if (okConfirm === true) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [okConfirm]);

  const GoLoginBtn = () => {
    navigate("/login");
  };

  return (
    <div>
      <StDiv FindIdPage>
        <StDiv FindIdMsg>
          <StDiv FindId>Find ID</StDiv>
          <StDiv smsspace>
            <SmsMessage
              setOkConfirm={setOkConfirm}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setIsUserId={setIsUserId}
              setIsShow={setIsShow}
              style={{ width: "350px" }}
            />
          </StDiv>
          <StDiv NextGoBtnBox>
            <Button
              NextGoBtn
              onClick={onSubmitFindId}
              disabled={!okConfirm}
              nextDisabled={!okConfirm}
            >
              아이디 확인하기
            </Button>
          </StDiv>
          <StDiv IDBox>
            {isShow === true ? <p>고객님의 ID는 "{isUserId}" 입니다.</p> : null}
          </StDiv>

          <StDiv NextGoBtnBox>
            <Button NextGoBtn2 onClick={GoFindPWBtn}>
              비밀번호 찾기
            </Button>
            <Button NextGoBtn2 onClick={GoLoginBtn}>
              Login
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
            <Button RightFindIdBtn onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </StDiv>
        </StDiv>
      </StDiv>
    </div>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.FindIdPage &&
    css`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
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
    props.FindIdMsg &&
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
    props.FindId &&
    css`
      font-size: 70px;
      display: flex;
      justify-content: center;
      margin: 30px 0 0px 0;
      color: black;
      font-family: "Belleza";
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

const StImg = styled.img`
  width: 140px;
  cursor: pointer;
`;

export default FindId1;

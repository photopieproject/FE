import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Terms from "../../pages/Terms";
import Registration from "./Registration";
import Private from "../../pages/Private";
import {
  // SMSSends,
  __SMSSend,
  // __SMSSends,
} from "../../redux/modules/loginSlice";
import { useInput } from "../../lib/utils/useInput";
import { hover } from "@testing-library/user-event/dist/hover";
// import { useDispatch } from "react-redux";

function Agree2({ setShow }) {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  // const navigate = useNavigate();
  const outside = useRef();
  // const [checkP, setCheckP] = useState();
  const navigate = useNavigate();

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
      setPrivacyCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
      setPrivacyCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const usePrivacyEvent = () => {
    if (privacyCheck === false) {
      setPrivacyCheck(true);
    } else {
      setPrivacyCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (
      ageCheck === true &&
      privacyCheck === true &&
      useCheck === true &&
      marketingCheck === true
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, privacyCheck, useCheck, marketingCheck]);

  useEffect(() => {
    if (ageCheck === true && privacyCheck === true && useCheck === true) {
      setNextDisabled(!nextDisabled);
    } else {
      setNextDisabled(true);
    }
  }, [ageCheck, privacyCheck, useCheck]);

  //삼항연산자

  return (
    <StDiv AgreePage>
      <StDiv LeftBox>
        <StDiv LogoBox>
          <img
            src="/image/photopie_logo_1.png"
            alt="home_logo"
            style={{ width: "140px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </StDiv>
        <StDiv TxtBox>
          <StP LeftTxt1>WelCome To</StP>
          <StP LeftTxt1>Photo-Pie</StP>
          <StP LeftTxt2>안녕하세요. 포토파이입니다.</StP>
        </StDiv>
        <StDiv>
          <StBtn LeftSignUpbtn onClick={() => navigate("/login")}>
            Login
          </StBtn>
        </StDiv>
      </StDiv>
      <StDiv CenterBox>
        <StDiv Agree>Create Account</StDiv>
        <Stlabel Stlabel>Photo-Pie 서비스 이용약관에 동의해주세요.</Stlabel>
        <StDiv AllAgree>
          <StInput
            AgreeBigCheckBox
            type="checkbox"
            id="all-check"
            checked={allCheck}
            onChange={allBtnEvent}
          />
          &nbsp;
          <label htmlFor="all-check">전체 동의</label>
        </StDiv>
        <div>
          <StDiv AgreeBody>
            <StDiv CheckBox>
              <StInput
                AgreeCheckBox
                type="checkbox"
                id="check1"
                checked={ageCheck}
                onChange={ageBtnEvent}
              />
              <Stlabel StChecklabel htmlFor="check1">
                <span>(필수)</span>&nbsp;만 14세 이상
              </Stlabel>
            </StDiv>
            <StDiv CheckBox>
              <StInput
                AgreeCheckBox
                type="checkbox"
                id="check2"
                checked={privacyCheck}
                onChange={usePrivacyEvent}
              />
              <Stlabel StChecklabel htmlFor="check2">
                <span>(필수)</span>&nbsp;개인정보 취급 방침
                <StBtn AgreeBtn onClick={() => setModal1(true)}>
                  약관보기
                </StBtn>
                {modal1 && (
                  <StDiv
                    ModalBg
                    ref={outside}
                    onClick={(e) => {
                      if (e.target === outside.current) setModal1(false);
                    }}
                  >
                    <StDiv Modal1>
                      <Private />
                      <StBtn ModalCancleBtn onClick={() => setModal1(false)}>
                        돌아가기
                      </StBtn>
                    </StDiv>
                  </StDiv>
                )}
              </Stlabel>
            </StDiv>
            <StDiv CheckBox>
              <StInput
                AgreeCheckBox
                type="checkbox"
                id="check3"
                checked={useCheck}
                onChange={useBtnEvent}
              />
              <Stlabel StChecklabel htmlFor="check3">
                <span>(필수)</span>&nbsp;이용약관
                <StBtn AgreeBtn onClick={() => setModal2(true)}>
                  약관보기
                </StBtn>
                {modal2 && (
                  <StDiv
                    ModalBg
                    ref={outside}
                    onClick={(e) => {
                      if (e.target === outside.current) setModal2(false);
                    }}
                  >
                    <StDiv Modal2>
                      <Terms />
                      <StBtn ModalCancleBtn onClick={() => setModal2(false)}>
                        돌아가기
                      </StBtn>
                    </StDiv>
                  </StDiv>
                )}
              </Stlabel>
            </StDiv>
            <StDiv CheckBox>
              <StInput
                AgreeCheckBox
                type="checkbox"
                id="check4"
                checked={marketingCheck}
                onChange={marketingBtnEvent}
              />
              <Stlabel StChecklabel htmlFor="check4">
                <span>(선택)</span>&nbsp;광고성 정보 수신 및 마케팅 활용동의
                {/* 마케팅 할거면 백에 보내줘야함 */}
                <StBtn AgreeBtn onClick={() => setModal3(true)}>
                  약관보기
                </StBtn>
                {modal3 && (
                  <StDiv
                    ModalBg
                    ref={outside}
                    onClick={(e) => {
                      if (e.target === outside.current) setModal3(false);
                    }}
                  >
                    <StDiv Modal3>
                      <Private />
                      <StBtn ModalCancleBtn onClick={() => setModal3(false)}>
                        돌아가기
                      </StBtn>
                    </StDiv>
                  </StDiv>
                )}
              </Stlabel>
            </StDiv>
          </StDiv>
          <StDiv NextGoBtnBox>
            <StBtn
              NextGoBtn
              onClick={() => setShow(true)}
              // onClick={() => navigate("/signup")}
              disabled={nextDisabled}
              nextDisabled={nextDisabled}
              type="button"
              name="checkbutton"
              value=""
            >
              다음
            </StBtn>
          </StDiv>
        </div>
      </StDiv>
      {/* <StDiv NextGoBtnBox>
        <StBtn
          NextGoBtn
          onClick={() => setShow(true)}
          // onClick={() => navigate("/signup")}
          disabled={nextDisabled}
          nextDisabled={nextDisabled}
          type="button"
          name="checkbutton"
          value=""
        >
          다음
        </StBtn>
      </StDiv> */}
    </StDiv>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.AgreePage &&
    css`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    `}

  ${(props) =>
    props.LeftBox &&
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
    props.CenterBox &&
    css`
      width: 55%;
      height: 100vh;
      border: 0;
      border-radius: 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; ;
    `}

  ${(props) =>
    props.Modal1 &&
    css`
      width: 600px;
      height: 600px;
      padding: 5px 20px;
      border: 1px solid gray;
      background-color: #faf7f2;
      position: fixed;
      flex-direction: column;
      overflow: scroll;
      margin-top: -290px;
      display: flex;
      ::-webkit-scrollbar {
        width: 15px;
        height: 15%;
        background-color: #7d6945;
        border-radius: 15px;
      }
    `}
  ${(props) =>
    props.Modal2 &&
    css`
      width: 600px;
      height: 600px;
      padding: 5px 20px;
      border: 1px solid gray;
      background-color: #faf7f2;
      position: fixed;
      flex-direction: column;
      overflow: scroll;
      margin-top: -340px;
      display: flex;
      ::-webkit-scrollbar {
        width: 15px;
        height: 15%;
        background-color: #7d6945;
        border-radius: 15px;
      }
    `}
  ${(props) =>
    props.Modal3 &&
    css`
      width: 600px;
      height: 600px;
      padding: 5px 20px;
      border: 1px solid gray;
      background-color: #faf7f2;
      position: fixed;
      flex-direction: column;
      overflow: scroll;
      margin-top: -380px;
      display: flex;
      ::-webkit-scrollbar {
        width: 15px;
        height: 15%;
        background-color: #7d6945;
        border-radius: 15px;
      }
    `}
      
  ${(props) =>
    props.AgreeBody &&
    css`
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 10px;
      border-top: 2px solid #7d6945;
    `}
      
  ${(props) =>
    props.Agree &&
    css`
      font-size: 70px;
      display: flex;
      justify-content: center;
      margin: 30px 0 0px 0;
      color: black;
      font-family: "Belleza";
    `}
  ${(props) =>
    props.NextGoBtnBox &&
    css`
      display: flex;
      justify-content: center;
    `}

    ${(props) =>
    props.AllAgree &&
    css`
      width: 450px;
      height: 45px;
      margin-top: 10px;
      display: flex;
      align-items: center;
    `};
  ${(props) =>
    props.CheckBox &&
    css`
      width: 450px;
      height: 45px;
      display: flex;
      align-items: center;
    `};
`;

const StP = styled.p`
  ${(props) =>
    props.LeftTxt1 &&
    css`
      font-size: 50px;
      color: white;
      margin-top: -60px;
      font-family: "Belleza";
      margin-bottom: 55px;
    `}

  ${(props) =>
    props.LeftTxt2 &&
    css`
      font-size: 24px;
      color: white;
      margin: -20px auto 60px auto;
    `}
`;

const Stlabel = styled.label`
  ${(props) =>
    props.Stlabel &&
    css`
      font-size: 17px;
      font-weight: bold;
      margin-top: 5px;
      display: flex;
      letter-spacing: -0.1em;
    `};

  ${(props) =>
    props.StChecklabel &&
    css`
      font-size: 16px;
      letter-spacing: 0.02em;
    `};
`;
const StInput = styled.input`
  ${(props) =>
    props.AgreeCheckBox &&
    css`
      margin-right: 10px;
      width: 20px;
      height: 20px;
    `};
  ${(props) =>
    props.AgreeBigCheckBox &&
    css`
      width: 20px;
      height: 20px;
    `};
`;
const StBtn = styled.button`
  ${(props) =>
    props.LeftSignUpbtn &&
    css`
      font-family: "Belleza";
      font-size: 20px;
      width: 250px;
      height: 60px;
      margin-top: -10px;
      border-radius: 50px;
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
    props.NextGoBtn &&
    css`
      width: 150px;
      height: 40px;
      border-radius: 20px;
      margin-top: 10px;
      /*background-color: #fffaf2;*/
      /* border: 2px solid #3a3232; */
      font-weight: bold;
      &:hover {
        cursor: pointer;
        background-color: #3a3232;
        color: #fffaf2;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({ nextDisabled }) =>
        nextDisabled ? "#d9d9d9" : "#fffaf2"};
      color: ${({ nextDisabled }) => (nextDisabled ? "#fffaf2" : "#3a3232")};
      border: ${({ nextDisabled }) =>
        nextDisabled ? "none" : "2px solid #3a3232"};
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      &:disabled {
        background-color: #ddd8d8;
      }
    `}

  ${(props) =>
    props.AgreeBtn &&
    css`
      width: 80px;
      height: 30px;
      border-radius: 8px;
      margin: 10px 0 10px 10px;
      background-color: #402c00;
      background-size: 200%;
      transition: 500ms;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        /* background-position: right; */
        background-color: #af9462;
        /* font-size: 15px; */
      }
    `}

    ${(props) =>
    props.PnBtn &&
    css`
      width: 50px;
      height: 30px;
      border-radius: 10px;
      margin: 10px auto;
      background: ${({ pnDisabled }) => (pnDisabled ? "#d9d9d9" : "#402c00")};
      &:hover {
        background-color: #af9462;
      }
      color: ${({ pnDisabled }) => (pnDisabled ? "#402c00" : "white")};
      background-size: 200%;
      transition: 500ms;
      border: none;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        background-position: right;
        /* font-size: 15px; */
      }
    `}

    ${(props) =>
    props.SMSBtn &&
    css`
      width: 50px;
      height: 30px;
      border-radius: 10px;
      margin: 10px auto;
      background: ${({ msgDisabled }) => (msgDisabled ? "#d9d9d9" : "#402c00")};
      &:hover {
        background-color: #af9462;
      }
      color: ${({ msgDisabled }) => (msgDisabled ? "#402c00" : "white")};
      background-size: 200%;
      transition: 500ms;
      border: none;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        background-position: right;
        /* font-size: 15px; */
      }
    `}
    
    ${(props) =>
    props.ModalCancleBtn &&
    css`
      margin-top: 10px;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      margin: 10px auto;
      background-color: #402c00;
      background-size: 200%;
      transition: 500ms;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        background-position: right;
        /* font-size: 15px; */
      }
    `}
`;

export default Agree2;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Terms from "../../pages/Terms";
import Registration from "./Registration";
import Private from "../../pages/Private";
import { __checkOkConfirm } from "../../redux/modules/loginSlice";

function Agree2() {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const navigate = useNavigate();
  const outside = useRef();
  const [okConfirm, setOkConfirm] = useState(false);
  const [okConfirmP, setOkConfirmP] = useState(false);
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
      setDisabled(!disabled);
    } else {
      setDisabled(true);
    }
  }, [ageCheck, privacyCheck, useCheck]);

  //인증번호 맞는지 안맞는지 확인, userId고치기★
  // const checkOkConfirmHandler = (userId) => {
  //   __checkOkConfirm(userId).then((res) => {
  //     if (res === 200) {
  //       setOkConfirm(true);
  //       setOkConfirmP("인증되었습니다.");
  //     } else if (res === 400) {
  //       setOkConfirm(false);
  //       setOkConfirmP("인증번호를 확인해주세요.");
  //     }
  //   });
  // };
  //
  //
  //   useEffect(
  //     (checkbutton) => {
  //       if (ageCheck == true && privacyCheck == true && useCheck == true) {
  //         setDisabled(true);
  //       } else {
  //         setDisabled(false);
  //       }
  //     },
  //     [ageCheck, privacyCheck, useCheck]
  //   );

  // function agreeCheck(e) {
  //   if (ageCheck === true && privacyCheck === true && useCheck === true) {
  //     e.checkButton.disabled = true;
  //   } else {
  //     e.checkButton.disabled = false;
  //   }
  // }

  // const ConfirmTogle = () => {
  //   if (SMSBtn === false) {
  //   }
  // };

  return (
    <div>
      <StDiv AgreeBox>
        {/* <StContainer> */}
        <StCenterBox>
          <StDiv Agree>회원가입</StDiv>
          <Stlabel>Photo-Pie 서비스 이용약관에 동의해주세요.</Stlabel>
          <AllAgree>
            <AgreeBigCheckBox
              type="checkbox"
              id="all-check"
              checked={allCheck}
              onChange={allBtnEvent}
            />
            &nbsp;
            <label htmlFor="all-check">전체 동의</label>
          </AllAgree>
          <div>
            <StDiv AgreeBody>
              <StCheckBox>
                <AgreeCheckBox
                  type="checkbox"
                  id="check1"
                  checked={ageCheck}
                  onChange={ageBtnEvent}
                />
                <StChecklabel htmlFor="check1">
                  <span>(필수)</span>&nbsp;만 14세 이상
                </StChecklabel>
              </StCheckBox>
              <StCheckBox>
                <AgreeCheckBox
                  type="checkbox"
                  id="check2"
                  checked={privacyCheck}
                  onChange={usePrivacyEvent}
                />
                <StChecklabel htmlFor="check2">
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
                </StChecklabel>
              </StCheckBox>
              <StCheckBox>
                <AgreeCheckBox
                  type="checkbox"
                  id="check3"
                  checked={useCheck}
                  onChange={useBtnEvent}
                />
                <StChecklabel htmlFor="check3">
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
                </StChecklabel>
              </StCheckBox>
              <StCheckBox>
                <AgreeCheckBox
                  type="checkbox"
                  id="check4"
                  checked={marketingCheck}
                  onChange={marketingBtnEvent}
                />
                <StChecklabel htmlFor="check4">
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
                </StChecklabel>
              </StCheckBox>
            </StDiv>
          </div>
        </StCenterBox>
        <StDiv SMSSend>
          <StP SMSMsg>SMS 문자 인증</StP>
          <div>
            <StInput SMSInput placeholder="'-' 없이 기입해주세요"></StInput>
            <StBtn
              SMSBtn
              // onClick={() => checkOkConfirmHandler(userId)}
            >
              전송
            </StBtn>
          </div>
          <div>
            <StInput SMSInput placeholder="숫자 6자리"></StInput>
            <StBtn SMSBtn>인증</StBtn>
          </div>
          <StP OkConfirmP>인증되었습니다.</StP>
          <StBtn
            NextGoBtn
            onClick={() => navigate(<Registration />)}
            // onClick={() => navigate("/signup")}
            disabled={disabled}
            type="button"
            name="checkbutton"
            value=""
          >
            다음
          </StBtn>
        </StDiv>
        {/* </StContainer> */}
      </StDiv>
    </div>
  );
}

const StInput = styled.input`
  ${(props) =>
    props.SMSInput &&
    css`
      width: 200px;
      height: 35px;
      margin-right: 5px;
      background-color: #dad2ff91;
      border: none;
    `}
`;

const StP = styled.p`
  ${(props) =>
    props.SMSMsg &&
    css`
      margin: 15px 0 5px 0;
      font-weight: bold;
      font-size: 18px;
    `}
  ${(props) =>
    props.OkConfirmP &&
    css`
      font-size: 15px;
      color: gray;
      margin: 0 auto;
    `}
`;

const StDiv = styled.div`
  ${(props) =>
    props.AgreeBox &&
    css`
      width: 500px;
      height: 600px;
      border: 1px solid black;
      color: black;
    `}
  ${(props) =>
    props.Modal1 &&
    css`
      width: 600px;
      height: 600px;
      padding: 5px 20px;
      border: 1px solid gray;
      background-color: #f1eeff;
      position: fixed;
      flex-direction: column;
      overflow: scroll;
      margin-top: -290px;
      display: flex;
      ::-webkit-scrollbar {
        width: 15px;
        height: 15%;
        background-color: #706fd3;
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
      background-color: #f1eeff;
      position: fixed;
      flex-direction: column;
      overflow: scroll;
      margin-top: -340px;
      display: flex;
      ::-webkit-scrollbar {
        width: 15px;
        height: 15%;
        background-color: #706fd3;
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
      background-color: #f1eeff;
      position: fixed;
      flex-direction: column;
      overflow: scroll;
      margin-top: -380px;
      display: flex;
      ::-webkit-scrollbar {
        width: 15px;
        height: 15%;
        background-color: #706fd3;
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
      border-top: 2px solid #706fd3;
      border-bottom: 2px solid #706fd3;
    `}
      
      ${(props) =>
    props.SMSSend &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `};
  ${(props) =>
    props.Agree &&
    css`
      font-size: 30px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin: 30px 0 0px 0;
      color: #706fd3;
    `}
`;
const StButton = styled.button`
  margin-top: 40px;
  margin-bottom: 10px;
  width: 380px;
  height: 48px;
  border: 0;
  font-size: 18px;
  border-radius: 4px;
  background-color: #b5b5b5;
  font-family: georgia;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ddd8d8;
  }
`;
const StBtn = styled.button`
  ${(props) =>
    props.NextGoBtn &&
    css`
      width: 90px;
      height: 40px;
      border-radius: 15px;
      margin: 10px auto;
      background: ${({ disabled }) =>
        disabled
          ? "#d9d9d9"
          : "linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3)"};
      color: ${({ disabled }) => (disabled ? "#706fd3" : "white")};
      /* background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
      color: white; */
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
  ${(props) =>
    props.AgreeBtn &&
    css`
      width: 80px;
      height: 30px;
      border-radius: 8px;
      margin: 10px 0 10px 10px;
      background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
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

    ${(props) =>
    props.SMSBtn &&
    css`
      width: 50px;
      height: 30px;
      border-radius: 10px;
      margin: 10px auto;
      background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
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
    
    ${(props) =>
    props.ModalCancleBtn &&
    css`
      margin-top: 10px;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      margin: 10px auto;
      background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
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

const StContainer = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

const StCenterBox = styled.div`
  /* width: 400px;
  height: 850px; */
  align-items: center;
  padding-bottom: 10px;
  border: 0;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
`;

const AllAgree = styled.div`
  width: 450px;
  height: 45px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const StSignBox = styled.div`
  letter-spacing: -0.1em;
  width: 400px;
  height: 80px;
  font-size: 45px;
  margin-bottom: 30px;
  margin-top: 50px;
  display: flex;
  padding-top: 0px;
  border-bottom: 6px solid #dcdcdc;
  justify-content: center;
`;
const StSmaillBox = styled.div`
  width: 400px;
  height: 200px;
  padding-left: 10px;
  margin-top: 20px;
`;
const Stlabel = styled.label`
  font-size: 17px;
  font-weight: bold;
  margin-top: 5px;
  display: flex;
  letter-spacing: -0.1em;
`;

const StCheckBox = styled.div`
  width: 450px;
  height: 45px;
  display: flex;
  align-items: center;
`;
const StChecklabel = styled.label`
  font-size: 16px;
  letter-spacing: 0.02em;
`;

const AgreeCheckBox = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const AgreeBigCheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

export default Agree2;

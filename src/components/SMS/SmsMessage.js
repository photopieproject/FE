import styled, { css } from "styled-components";
import { useState } from "react";
import { useInput } from "../../lib/utils/useInput";
import SmsCount from "../Count/SmsCount";
import { __SMSSend } from "../../redux/modules/loginSlice";

const SmsMessage = ({ setOkConfirm, setPhoneNumber, phoneNumber }) => {
  console.log(setOkConfirm);
  const [msgDisabled, setMsgDisabled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [pnDisabled, setPnDisabled] = useState(false);
  const [confirmNumber, setConfirmNumber] = useInput();
  //   const [okConfirm, setOkConfirm] = useState(false);
  const [codeNumber, setCodeNumber] = useState();
  const [checkP, setCheckP] = useState();

  console.log(codeNumber);

  const sendMessageHandler = (phoneNumber) => {
    __SMSSend(phoneNumber)
      .then((res) => {
        setCodeNumber(res.data.data1);
        setPnDisabled(true);
        setShowInput(true);
        console.log(res.data.data1);
      })
      .catch((error) => console.log(error));
    // dispatch(__SMSSend(Number(message)));
    // console.log(message);
    // if(res === 200){
    //   setShowInput()
    // }
  };

  const MessageConfirmHandler = () => {
    console.log(setOkConfirm);
    if (codeNumber === confirmNumber) {
      setCheckP("인증되었습니다.");
      setOkConfirm(true);
      setMsgDisabled(true);
    } else if (codeNumber !== confirmNumber) {
      setCheckP("인증번호를 확인해주세요.");
      setOkConfirm(false);
      setMsgDisabled(false);
    }
  };
  return (
    <StDiv SMSSend>
      <StP SMSMsg>SMS 문자 인증</StP>
      <div>
        <StInput
          SMSInput
          type="text"
          placeholder="'-' 없이 기입해주세요"
          onChange={setPhoneNumber}
          value={phoneNumber}
          disabled={pnDisabled}
          pnDisabled={pnDisabled}
        ></StInput>
        <StBtn
          PnBtn
          disabled={pnDisabled}
          pnDisabled={pnDisabled}
          onClick={() => sendMessageHandler(phoneNumber)}
        >
          전송
        </StBtn>
      </div>
      {showInput && (
        <StDiv ShowInputBox>
          <StInput
            SMSInput
            placeholder="숫자 6자리"
            onChange={setConfirmNumber}
            value={confirmNumber}
            disabled={msgDisabled}
            msgDisabled={msgDisabled}
          ></StInput>
          <StBtn
            SMSBtn
            onClick={MessageConfirmHandler}
            disabled={msgDisabled}
            msgDisabled={msgDisabled}
          >
            인증
          </StBtn>
          <StDiv StSmsCount>
            <SmsCount disabled={msgDisabled} msgDisabled={msgDisabled} />
          </StDiv>
        </StDiv>
      )}
      <StP OkConfirmP>{checkP}</StP>
    </StDiv>
  );
};
const StDiv = styled.div`
  ${(props) =>
    props.StSmsCount &&
    css`
      margin: -10px auto -15px auto;
      font-size: 12px;
    `}

  ${(props) =>
    props.SMSSend &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;
const StInput = styled.input`
  ${(props) =>
    props.SMSInput &&
    css`
      width: 200px;
      height: 35px;
      margin-right: 5px;
      background-color: #f2ebde;
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
      font-size: 13px;
      color: gray;
      margin: 0 auto;
    `}
`;

const StBtn = styled.button`
  ${(props) =>
    props.PnBtn &&
    css`
      width: 50px;
      height: 30px;
      border-radius: 10px;
      margin: 10px auto;
      background: ${({ pnDisabled }) =>
        pnDisabled
          ? "#d9d9d9"
          : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
      color: ${({ pnDisabled }) => (pnDisabled ? "#7d6945" : "white")};
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
      background: ${({ msgDisabled }) =>
        msgDisabled
          ? "#d9d9d9"
          : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
      color: ${({ msgDisabled }) => (msgDisabled ? "#7d6945" : "white")};
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
`;
export default SmsMessage;

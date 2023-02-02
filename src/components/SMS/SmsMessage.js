import styled, { css } from "styled-components";
import { useState } from "react";
import { useInput } from "../../lib/utils/useInput";
import SmsCount from "../Count/SmsCount";
import { __findID, __SMSSend } from "../../redux/modules/loginSlice";

const SmsMessage = ({
  setOkConfirm,
  phoneNumber,
  setPhoneNumber,
  // codeNumber,
  // setCodeNumber,
}) => {
  console.log(setOkConfirm);
  const [msgDisabled, setMsgDisabled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [pnDisabled, setPnDisabled] = useState(false);
  const [confirmNumber, setConfirmNumber] = useInput();
  const [checkP, setCheckP] = useState();
  const [codeNumber, setCodeNumber] = useState();
  //   const [okConfirm, setOkConfirm] = useState(false);

  console.log(codeNumber);

  // 백에서 data1에 넣어주면 안돼고
  // 프론트에서 휴대폰번호랑 인증번호를 보냈을 때
  // 그 휴대폰번호에 대한 인증번호를 둘 다 백이 갖고있으면
  // 휴대폰이랑 인증번호를 우리한테 보내서
  // 그게 대조했을 떄 맞으면 빽에서 ㅇㅋ 해야함

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

  const findIdHandler = (phoneNumber) => {
    __findID({
      //서버로 요청하는 부분
      // codeNumber,
      phoneNumber, //나중에 없애야함, 나중에 phoneNumber랑 CodeNumber를 백한테 같이보내줘야함 백은 트루, 폴스를 보내줌 status===200 인증성공, statusCode로 판단
    })
      .then((res) => {
        //서버에서 받아온 부분

        // if (res.data.statusCode === 200) {
        console.log("findid res: ", res.data);
        // alert(res.data.msg);
        //   Swal.fire(res.data.statusMsg, res.data.statusCode, "success");
        // } else {
        //   Swal.fire(res.data.msg, "아이디가 없습니다.", "error");
        //   // navigate("/login");
        // }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
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
        {window.location.href === "http://localhost:3000/findid" ? (
          <StBtn
            PnBtn
            disabled={pnDisabled}
            pnDisabled={pnDisabled}
            onClick={() => findIdHandler(phoneNumber)}
          >
            전송
          </StBtn>
        ) : (
          <StBtn
            PnBtn
            disabled={pnDisabled}
            pnDisabled={pnDisabled}
            onClick={() => sendMessageHandler(phoneNumber)}
          >
            사인업
            {/* 다 하고나서 전송으로 바꾸기 */}
          </StBtn>
        )}
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

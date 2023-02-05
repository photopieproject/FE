import styled, { css } from "styled-components";
import { useState } from "react";
import { useInput } from "../../lib/utils/useInput";
import SmsCount from "../Count/SmsCount";
import { __findID, __findPW, __SMSSend } from "../../redux/modules/loginSlice";
import { useEffect } from "react";

const SmsMessage = ({
  setOkConfirm,
  phoneNumber,
  setPhoneNumber,
  setIsShow,
  setIsUserId,
  userId,
}) => {
  console.log(setOkConfirm);
  const [msgDisabled, setMsgDisabled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [pnDisabled, setPnDisabled] = useState(false);
  const [confirmNumber, setConfirmNumber] = useInput();
  const [checkP, setCheckP] = useState();
  const [codeNumber, setCodeNumber] = useState();
  //   const [okConfirm, setOkConfirm] = useState(false);
  // const [userId, setUserId] = useInput();

  console.log(codeNumber); //찐인증번호
  console.log(confirmNumber); //내가 입력한 인증번호

  // function checkPhone(phoneNumber) {
  //   var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  //   return regExp.test(phoneNumber);
  // }
  // const checkPhoneNum = (phoneNumber) => {
  //   if (checkPhone(phoneNumber) === false) {
  //     alert("'-'를 뺀 숫자만 입력해주세요.");
  //   }
  // };

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
        setCodeNumber(res.data.data1);
        setShowInput(true);
        console.log("findid res: ", res.data);
        setIsUserId(res.data.data2);
        if (res.data.statusCode === 200) {
          // console.log("1234");
          // alert(res.data.msg);
          // Swal.fire(res.data.statusMsg, res.data.statusCode, "success");
          alert(res.data.statusMsg, res.data.statusCode, "success");
        } else {
          alert("핸드폰 번호를 입력해주세요.");
          // Swal.fire(res.data.msg, "아이디가 없습니다.", "error");
          // navigate("/login");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  // useEffect(() => {
  //   if (setPhoneNumber !== null) {
  //     setPnDisabled(false);
  //   } else {
  //     setPnDisabled(true);
  //   }
  // }, [setPhoneNumber]);

  const findPwHandler = () => {
    __findPW({
      //서버로 요청하는 부분
      userId,
      phoneNumber, //나중에 없애야함, 나중에 phoneNumber랑 CodeNumber를 백한테 같이보내줘야함 백은 트루, 폴스를 보내줌 status===200 인증성공, statusCode로 판단
    })
      .then((res) => {
        //서버에서 받아온 부분
        // console.log(userId);

        setCodeNumber(res.data.data1);
        setShowInput(true);
        console.log("findid res: ", res.data);
        if (res.data.statusCode === 200) {
          console.log("1234");
          alert(res.data.statusMsg, res.data.statusCode, "success");
          setIsShow(true);
        } else {
          alert("아이디를 입력해주세요.");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  const MessageConfirmHandler = () => {
    console.log("codeNumber : ", codeNumber);
    console.log("confirmNumber : ", confirmNumber);
    if (codeNumber !== confirmNumber) {
      setCheckP("인증번호를 확인해주세요.");
      setOkConfirm(false);
      setMsgDisabled(false);
    } else if (codeNumber === confirmNumber) {
      setCheckP("인증되었습니다.");
      setOkConfirm(true);
      setMsgDisabled(true);
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
            인증번호 전송
          </StBtn>
        ) : window.location.href === "http://localhost:3000/signup" ? (
          //사항연산자 안되면 if
          <StBtn
            PnBtn
            disabled={pnDisabled}
            pnDisabled={pnDisabled}
            onClick={() => sendMessageHandler(phoneNumber)}
          >
            인증번호 전송
            {/* 다 하고나서 전송으로 바꾸기 */}
          </StBtn>
        ) : (
          <StBtn
            PnBtn
            disabled={pnDisabled}
            pnDisabled={pnDisabled}
            onClick={findPwHandler}
          >
            인증번호 전송
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
          {/* <StDiv StSmsCount>
            <SmsCount disabled={msgDisabled} msgDisabled={msgDisabled} />
          </StDiv> */}
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
      width: 100%;
      height: 131px;
    `}
  ${(props) =>
    props.ShowInputBox &&
    css`
      margin-top: 10px;
    `}
`;
const StInput = styled.input`
  ${(props) =>
    props.SMSInput &&
    css`
      width: 200px;
      height: 35px;
      margin-right: 5px;
      background-color: #f2eeee;
      border-radius: 10px;
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
      width: 120px;
      height: 40px;
      border-radius: 10px;
      margin-left: 10px;
      /*background-color: #fffaf2;*/
      /* border: 2px solid #3a3232; */
      font-weight: bold;
      &:hover {
        cursor: pointer;
        background-color: #3a3232;
        color: #fffaf2;
      }
      /* display: flex;
      justify-content: center;
      align-items: center; */
      background: ${({ pnDisabled }) => (pnDisabled ? "#d9d9d9" : "#fffaf2")};
      color: ${({ pnDisabled }) => (pnDisabled ? "#fffaf2" : "#3a3232")};
      border: ${({ pnDisabled }) =>
        pnDisabled ? "none" : "2px solid #3a3232"};
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      &:disabled {
        background-color: #ddd8d8;
      }
    `}

  ${(props) =>
    props.SMSBtn &&
    css`
      width: 120px;
      height: 40px;
      border-radius: 10px;
      margin-left: 10px;
      /*background-color: #fffaf2;*/
      /* border: 2px solid #3a3232; */
      font-weight: bold;
      &:hover {
        cursor: pointer;
        background-color: #3a3232;
        color: #fffaf2;
      }
      background: ${({ msgDisabled }) => (msgDisabled ? "#d9d9d9" : "#fffaf2")};
      color: ${({ msgDisabled }) => (msgDisabled ? "#fffaf2" : "#3a3232")};
      border: ${({ msgDisabled }) =>
        msgDisabled ? "none" : "2px solid #3a3232"};
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      &:disabled {
        background-color: #ddd8d8;
      }
    `}
`;
export default SmsMessage;

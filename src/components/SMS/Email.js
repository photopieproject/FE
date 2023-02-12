import styled, { css } from "styled-components";
import { useState } from "react";
import { useInput } from "../../lib/utils/useInput";
import { __emailcode, __emailsend } from "../../redux/modules/loginSlice";

const Email = () => {
  const [email, setEmail] = useInput();
  const [emailCode, setEmailCode] = useInput();
  const [isemail, setIsemail] = useState();
  const [visible, setVisible] = useState(false);
  const [emailP, setEmailP] = useState();
  const [emailDisable, setEmailDisable] = useState(false);

  const onEmailCode = (e) => {
    // e.preventDefault();
    __emailcode({
      email,
      emailCode,
    }).then((res) => {
      console.log(isemail);
      if (res.data.statusCode === 200) {
        console.log(isemail, emailCode);
        alert(res.data.msg, "인증완료", "success");
      } else {
        alert(res.data.msg, "인증번호를 확인해주세요", "error");
      }
    });
  };

  //이메일코드 전송
  const onSendEmail = (e) => {
    __emailsend({
      email,
    }).then((res) => {
      setIsemail(res.data);
      setEmailP(res.data.msg);
      console.log("emailP:", emailP);
      console.log(res);
      if (res.data.statusCode === 200) {
        alert(
          res.data.msg,
          "해당 메일함에서 인증번호를 확인해주세요.",
          "success"
        );
        return;
      } else {
        if (visible) {
          return;
        }
        alert(res.data.msg, "이메일을 다시 확인해주세요!", "error");
      }
    });
  };

  // 이메일 유효성 검사
  function emailCheck(email) {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test;
  }

  const disabledHandle = () => {
    setEmailDisable(!emailDisable);
  };

  function validEmail(email) {
    console.log(email);
    if (emailCheck(email) === false) {
      alert("올바른 이메일 주소를 입력해주세요.");
      email.value = "";
      email.focus();
      return false;
    }
  }

  return (
    <>
      <StLabel OnLabel htmlFor="email">
        이메일
      </StLabel>
      <StDiv MailBox>
        <StInput
          EmailInput
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          onClick={emailCheck}
          placeholder="이메일을 입력해주세요."
          required
          disabled={emailDisable}
          minLength={5}
          maxLength={30}
        />
        <StBtn
          EmailBtn
          checkbtn
          onClick={(e, res) => {
            onSendEmail(email);
            disabledHandle();
            setVisible(!visible);
          }}
          type="button"
        >
          {visible ? "다시 보내기" : "인증번호 전송"}
        </StBtn>
      </StDiv>
      <StDiv Timer>{visible && <StP>{emailP}</StP>}</StDiv>
      <StLabel OnLabel2 htmlFor="emailcode">
        인증번호
      </StLabel>
      <StDiv MailBox>
        <StInput
          EmailInput
          id="emailcode"
          type="text"
          value={emailCode}
          onChange={setEmailCode}
          placeholder="인증번호를 입력해주세요."
          required
          minLength={6}
          maxLength={6}
        />
        <StBtn
          EmailBtn
          checkbtn
          onClick={(e) => {
            e.preventDefault();
            onEmailCode(emailCode);
          }}
          type="button"
        >
          확인
        </StBtn>
      </StDiv>
    </>
  );
};

const StLabel = styled.label`
  ${(props) =>
    props.OnLabel &&
    css`
      margin-bottom: 5px;
      justify-content: left;
      font-size: 14px;
      display: flex;
      margin-right: 340px;
      font-weight: 600;
      font-family: "Pretendard";
    `}
  ${(props) =>
    props.OnLabel2 &&
    css`
      font-size: 14px;
      margin-bottom: 5px;
      justify-content: left;
      display: flex;
      margin-right: 330px;
      font-weight: 600;
      font-family: "Pretendard";
    `}
`;
const StDiv = styled.div`
  ${(props) =>
    props.MailBox &&
    css`
      width: 380px;
      display: flex;
      font-family: "Pretendard";
    `}
  ${(props) =>
    props.ShowInputBox &&
    css`
      margin-top: 10px;
    `}
`;

const StInput = styled.input`
  ${(props) =>
    props.EmailInput &&
    css`
      width: 274px;
      height: 48px;
      border: 1px solid #d9d9d9;
      padding-left: 10px;
      border-radius: 4px;
      margin-top: 5px;
      font-family: "Pretendard";
      &:disabled {
        background-color: #c2c2c2;
        font-family: "Pretendard";
      }
      font-size: 14px;
      &:focus {
        border: 1px solid #ffd665;
        outline: 1px solid #ffd665;
      }
    `}
`;

const StBtn = styled.button`
  ${(props) =>
    props.EmailBtn &&
    css`
      width: 100px;
      height: 48px;
      margin-top: 4px;
      margin-left: 10px;
      border: 1px solid black;
      border-radius: 4px;
      font-weight: 600;
      background-color: white;
      font-family: "Pretendard";
      cursor: pointer;
      &:hover {
        border: 0;
        color: black;
        background-color: #ffd665;
      }
    `}
`;
const StP = styled.p`
  ${(props) =>
    props.SMSMsg &&
    css`
      margin: 15px 0 5px 0;
      font-weight: bold;
      font-size: 18px;
      color: #3a3232;
    `}
  ${(props) =>
    props.good &&
    css`
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      margin-top: 5px;
      color: #3a3232;
      margin-bottom: -10px;
    `}
    ${(props) =>
    props.notGood &&
    css`
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      margin-top: 5px;
      color: red;
      margin-bottom: -10px;
    `}
`;

export default Email;

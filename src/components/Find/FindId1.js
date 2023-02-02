import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
import { useInput } from "../../lib/utils/useInput";
import { __findID } from "../../redux/modules/loginSlice";
import SmsMessage from "../SMS/SmsMessage";

function FindId1({ setShow }) {
  const [nextDisabled, setNextDisabled] = useState(true);
  // const [userId, setUserId] = useInput();
  const [okConfirm, setOkConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useInput();
  // const [codeNumber, setCodeNumber] = useInput();
  // const [confirmNumber, setConfirmNumber] = useInput();
  const [isShow, setIsShow] = useState();
  const [isUserId, setIsUserId] = useState();

  const onSubmitFindId = (e) => {
    e.preventDefault();

    __findID({
      //서버로 요청하는 부분
      // codeNumber,
      phoneNumber, //나중에 없애야함, 나중에 phoneNumber랑 CodeNumber를 백한테 같이보내줘야함 백은 트루, 폴스를 보내줌 status===200 인증성공, statusCode로 판단
    })
      .then((res) => {
        //서버에서 받아온 부분

        console.log("findid res: ", res);
        // alert(res.data.msg);
        if (res.data.statusCode === 200) {
          Swal.fire(res.data.statusMsg, res.data.statusCode, "success");
          setShow(true);
        } else {
          Swal.fire(res.data.statusMsg, "아이디가 없습니다.", "error");
          // navigate("/login");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  console.log(okConfirm);
  useEffect(() => {
    if (okConfirm === true) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [okConfirm]);

  return (
    <div>
      <StDiv FindIdMsgBox>
        <StDiv FindIdMsg>
          <StDiv FindId>아이디 찾기</StDiv>

          <StDiv smsspace>
            <SmsMessage
              setOkConfirm={setOkConfirm}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setIsUserId={setIsUserId}
              setIsShow={setIsShow}
              // codeNumber={codeNumber}
              // setCodeNumber={setCodeNumber}
            />
          </StDiv>
          <StDiv NextGoBtnBox>
            <StBtn
              NextGoBtn
              onClick={onSubmitFindId}
              disabled={!okConfirm}
              nextDisabled={!okConfirm}
              type="button"
              name="nextgobutton"
              value=""
            >
              다음
            </StBtn>
          </StDiv>
          <StDiv IDBox>
            {isShow === true ? (
              <p>
                고객님의 ID는
                {isUserId}입니다.
              </p>
            ) : null}
          </StDiv>

          {/* <StDiv smsspace>
            <SmsMessage
              setOkConfirm={setOkConfirm}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          </StDiv> */}
          <StDiv NextGoBtnBox>
            <StBtn
              NextGoBtn2
              // onClick={onSubmitFoundId}
              // onClick={() => setShow(false)}
              // disabled={nextDisabled}
              // nextDisabled={nextDisabled}
              // type="button"
              // name="checkbutton"
              // value=""
            >
              로그인하러 가기
            </StBtn>
          </StDiv>
        </StDiv>
      </StDiv>
    </div>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.FindIdMsg &&
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
    props.FindId &&
    css`
      font-size: 30px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin: 50px 0 0px 0;
      color: #7d6945;
    `}

    ${(props) =>
    props.IdPw &&
    css`
      font-size: 15px;
      font-weight: bold;
      color: gray;
      margin-top: 50px;
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
    `}
`;

const StInput = styled.input`
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
          : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
      color: ${({ nextDisabled }) => (nextDisabled ? "#7d6945" : "white")};
      /* background: linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945);
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
    props.NextGoBtn2 &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 40px;
      border-radius: 15px;
      background: ${({ nextDisabled }) =>
        nextDisabled
          ? "#d9d9d9"
          : "linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945)"};
      color: ${({ nextDisabled }) => (nextDisabled ? "#7d6945" : "white")};
      /* background: linear-gradient(120deg, #7d6945, #ecdfc8, #7d6945);
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
`;
export default FindId1;

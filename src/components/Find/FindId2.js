// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
// import { useInput } from "../../lib/utils/useInput";
// import { __findID } from "../../redux/modules/loginSlice";
// import SmsMessage from "../SMS/SmsMessage";

function FindId2({ setShow }) {
  // const [nextDisabled, setNextDisabled] = useState(true);
  // const [userId, setUserId] = useInput();
  // const [okConfirm, setOkConfirm] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useInput();
  const navigate = useNavigate();

  const userIdList = [
    {
      id: "asdasd1",
    },
  ];

  const onSubmitFoundId = (e) => {
    // console.log("myID:", userId);
    // e.preventDefault();
    // if (okConfirm === true) {
    //   setShow(true);
    //   return;
    // }
    // __findID({
    //   //서버로 요청하는 부분
    //   userId,
    //   phoneNumber,
    // })
    //   .then((res) => {
    //     //서버에서 받아온 부분

    //     console.log("findid res: ", res);
    //     // alert(res.data.msg);
    //     localStorage.setItem("id", res.headers.authorization);
    navigate("/login");
    //     })
    //     .catch((err) => {
    //       console.log("error: ", err);
    //     });
  };

  // useEffect(() => {
  //   console.log(okConfirm);
  //   if (okConfirm === true) {
  //     setNextDisabled(!setNextDisabled);
  //   } else {
  //     setNextDisabled(true);
  //   }
  // }, [okConfirm]);

  return (
    <div>
      <StDiv FindIdMsgBox>
        <StDiv FindIdMsg>
          <StDiv FindId>아이디 찾기</StDiv>
          <StDiv IDBox>
            <p>고객님의 ID는</p>
            {/* map돌려야하는가? */}
            {userIdList.map((Id) => (
              <StDiv IDList>
                <StP
                  Ids
                  //  id={Id.userId} value={Id.userId}
                />
                asdasd1
              </StDiv>
            ))}

            <p>입니다.</p>
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
              NextGoBtn
              onClick={onSubmitFoundId}
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
    props.IDList &&
    css`
      width: 200px;
      height: 100px;
      background-color: #f2ebde;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
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
const StP = styled.p`
  ${(props) =>
    props.Ids &&
    css`
      color: red;
    `}
`;
const StBtn = styled.button`
  ${(props) =>
    props.NextGoBtn &&
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
export default FindId2;

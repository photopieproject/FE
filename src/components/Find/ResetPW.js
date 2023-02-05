import styled, { css } from "styled-components";
import { useInput } from "../../lib/utils/useInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { __resetPW } from "../../redux/modules/loginSlice";

function ResetPW({ userId, setUserId }) {
  const [password, setPassword] = useInput();
  const [PWConfirm, setPWConfirm] = useState("");
  const [PWPtag, setPWPtag] = useState();
  const [PWConfirmP, setPWConfirmP] = useState(false);
  // const [okConfirm, setOkConfirm] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const navigate = useNavigate();

  console.log("userId : ", userId);

  function isPassword(asValue) {
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return regExp.test(asValue);
  }

  const PWChk = () => {
    if (!isPassword(password)) {
      setPWPtag(
        <StPs>영문대문자+소문자/숫자/특수문자를 모두포함한, 8-15자</StPs>
      );
    } else {
      setPWPtag(<StPs2>사용가능한 비밀번호 입니다</StPs2>);
    }
  };

  const PWConfirmChk = () => {
    if (password !== PWConfirm || password === "") {
      setPWConfirmP(<StPs>입력한 비밀번호와 일치하지 않습니다.</StPs>);
    } else if (password === PWConfirm) {
      setPWConfirmP(<StPs2>비밀번호 확인되었습니다.</StPs2>);
      setNextDisabled(false);
    }
  };

  const ResetPWHandler = (password, userId) => {
    console.log(userId);

    navigate("/login");
    __resetPW({
      //서버로 요청하는 부분
      userId,
      password, //나중에 없애야함, 나중에 phoneNumber랑 CodeNumber를 백한테 같이보내줘야함 백은 트루, 폴스를 보내줌 status===200 인증성공, statusCode로 판단
    })
      .then((res) => {
        if (res === 200) {
          setUserId();
          // setCheckP("사용 가능한 ID입니다");
        } else if (res === 400) {
          // setCheckP("이미 사용중인 ID입니다");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  return (
    <StDiv ResetPWPage>
      <StDiv FindPWMsg>
        <StDiv FindPw>Reset Password</StDiv>
        <StDiv IdPw>
          Password
          <br />
          <StInput
            LoginInput
            type="password"
            id="password"
            onBlur={PWChk}
            value={password}
            onChange={setPassword}
            autoComplete="off"
            placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
          />
          <StP>{PWPtag}</StP>
        </StDiv>
        <StDiv IdPw>
          Password Check
          <br />
          <StInput
            LoginInput
            onBlur={PWConfirmChk}
            type="password"
            id="password"
            required
            // value={passwordCheck}
            // onChange={setPasswordCheck}
            value={PWConfirm}
            onChange={(e) => {
              setPWConfirm(e.target.value);
            }}
            autoComplete="off"
            placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
          />
          <StP>{PWConfirmP}</StP>
        </StDiv>
        <StDiv NextGoBtnBox>
          <StBtn
            NextGoBtn
            onClick={() => ResetPWHandler(password, userId)}
            disabled={nextDisabled}
            nextDisabled={nextDisabled}
            type="button"
            name="checkbutton"
            value=""
          >
            Go Login
          </StBtn>
        </StDiv>
      </StDiv>
      <StDiv RightBox>
        <StDiv LogoBox>
          <img
            src="/image/photopie_logo_1.png"
            alt="home_logo"
            style={{ width: "140px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </StDiv>
        <StDiv TxtBox>
          <StPRight RightTxt1>Welcome Back!</StPRight>
          <StPRight RightTxt2>안녕하세요. 포토파이입니다.</StPRight>
        </StDiv>
        <StDiv>
          <StBtn RightLoginbtn onClick={() => navigate("/login")}>
            Login
          </StBtn>
        </StDiv>
      </StDiv>
    </StDiv>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.ResetPWPage &&
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
      align-items: center;
      justify-content: center;
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
      margin: 30px 0 0px 0;
      color: black;
      font-family: "Belleza";
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
    props.NextGoBtnBox &&
    css`
      display: flex;
      justify-content: center;
      margin-top: 20px;
    `}
`;
const StBtn = styled.button`
  ${(props) =>
    props.NextGoBtn &&
    css`
      font-family: "Belleza";
      font-size: 20px;
      width: 250px;
      height: 60px;
      border-radius: 50px;
      margin-bottom: 10px;
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

      cursor: pointer;
      &:disabled {
        background-color: #ddd8d8;
      }
    `}

  ${(props) =>
    props.RightFindIdBtn &&
    css`
      font-size: 20px;
      width: 250px;
      height: 60px;
      top: 610px;
      left: 1371px;
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
    props.RightLoginbtn &&
    css`
      font-size: 20px;
      width: 250px;
      height: 60px;
      top: 610px;
      left: 1371px;
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
`;

const StInput = styled.input`
  ${(props) =>
    props.LoginInput &&
    css`
      ::placeholder {
        color: #b9b8b8;
      }
      background-color: #f2eeee;
      border-radius: 10px;
      border: none;
      width: 300px;
      height: 40px;
      &:focus {
        outline: none;
      }
    `}
  ${(props) =>
    props.LoginInput2 &&
    css`
      ::placeholder {
        color: #b9b8b8;
      }
      background-color: #f2eeee;
      border-radius: 10px;
      border: none;
      width: 300px;
      height: 40px;
      &:focus {
        outline: none;
      }
    `}
`;

const StPRight = styled.p`
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

const StP = styled.p`
  font-size: 13px;
  font-weight: lighter;
  margin-top: 5px;
  color: gray;
  margin-bottom: -10px;
`;

const StPs = styled.p`
  margin-top: 7px;
  font-size: 12px;
  color: red;
`;

const StPs2 = styled.p`
  margin-top: 7px;
  font-size: 12px;
  color: limegreen;
`;
export default ResetPW;

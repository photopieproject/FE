import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useInput } from "../../lib/utils/useInput";
import { __findPW } from "../../redux/modules/loginSlice";
import SmsMessage from "../SMS/SmsMessage";

function FindPWMsg({ setShow, userId, setUserId }) {
    const [nextDisabled, setNextDisabled] = useState(true);
    const [okConfirm, setOkConfirm] = useState(false);
    const [phoneNumber, setPhoneNumber] = useInput();
    // const [codeNumber, setCodeNumber] = useInput();
    // const [confirmNumber, setConfirmNumber] = useInput();
    // const [isShow, setIsShow] = useState();
    // const [isUserId, setIsUserId] = useState();
    const navigate = useNavigate();

    console.log(userId);

    const nextResetGoBtn = (e) => {
        e.preventDefault();
        setShow(true);
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
        <StDiv FindPWMsgPage>
            <StDiv FindPWMsg>
                <StDiv FindPw>Find Password</StDiv>
                <StDiv IdPw>
                    ID
                    <br />
                    <StInput
                        LoginInput2
                        type="text"
                        id="myID"
                        value={userId}
                        onChange={setUserId}
                        placeholder="ID를 입력해주세요"
                        // disabled={checkUserId}
                    />
                </StDiv>
                <StDiv smsspace>
                    <SmsMessage
                        setOkConfirm={setOkConfirm}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        userId={userId}
                        // setIsUserId={setIsUserId}
                        // setIsShow={setIsShow}
                        // codeNumber={codeNumber}
                        // setCodeNumber={setCodeNumber}
                    />
                </StDiv>
                <StDiv NextGoBtnBox>
                    <StBtn
                        NextGoBtn
                        onClick={nextResetGoBtn}
                        disabled={!okConfirm}
                        nextDisabled={!okConfirm}
                        type="button"
                        name="checkbutton"
                        value=""
                    >
                        Next
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
                    <StP RightTxt1>Welcome Back!</StP>
                    <StP RightTxt2>안녕하세요. 포토파이입니다.</StP>
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
        props.FindPWMsgPage &&
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
            justify-content: center;
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
        props.FindPw &&
        css`
            font-size: 70px;
            display: flex;
            justify-content: center;
            font-family: "Belleza";
            margin: 30px 0 0px 0;
            color: black;
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

const StP = styled.p`
    ${(props) =>
        props.RightTxt1 &&
        css`
            font-size: 50px;
            color: white;
            margin-top: -60px;
            font-family: Belleza;
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
const StBtn = styled.button`
    ${(props) =>
        props.RightFindIdBtn &&
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
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            margin-top: 10px;
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
            color: ${({ nextDisabled }) =>
                nextDisabled ? "#fffaf2" : "#3a3232"};
            border: ${({ nextDisabled }) =>
                nextDisabled ? "none" : "2px solid #3a3232"};
            cursor: pointer;
            &:disabled {
                background-color: #ddd8d8;
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
export default FindPWMsg;

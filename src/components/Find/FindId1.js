import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const onSubmitFindId = (e) => {
        e.preventDefault();
        setIsShow(true);
    };

    console.log("???", okConfirm);

    useEffect(() => {
        if (okConfirm === true) {
            setNextDisabled(false);
        } else {
            setNextDisabled(true);
        }
    }, [okConfirm]);

    const GoLoginBtn = () => {
        navigate("/login");
    };
    return (
        <div>
            <StDiv FindIdPage>
                <StDiv FindIdMsg>
                    <StDiv FindId>Find ID</StDiv>
                    <StDiv smsspace>
                        <SmsMessage
                            setOkConfirm={setOkConfirm}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            setIsUserId={setIsUserId}
                            setIsShow={setIsShow}
                            style={{ width: "350px" }}
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
                            아이디 확인하기
                        </StBtn>
                    </StDiv>
                    <StDiv IDBox>
                        {isShow === true ? (
                            <p>고객님의 ID는 "{isUserId}" 입니다.</p>
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
                            onClick={GoLoginBtn}
                            // onClick={() => setShow(false)}
                            // disabled={nextDisabled}
                            // nextDisabled={nextDisabled}
                            // type="button"
                            // name="checkbutton"
                            // value=""
                        >
                            Login
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
                        <StBtn
                            RightFindIdBtn
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </StBtn>
                    </StDiv>
                </StDiv>
            </StDiv>
        </div>
    );
}

const StDiv = styled.div`
    ${(props) =>
        props.FindIdPage &&
        css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
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
        props.FindIdMsg &&
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
        props.FindId &&
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

const StBtn = styled.button`
    ${(props) =>
        props.RightFindIdBtn &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            border: 2px solid #fffaf2;
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
        props.NextGoBtn2 &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            border: 2px solid #3a3232;
            background-color: #fffaf2;
            color: #3a3232;
            &:hover {
                cursor: pointer;
                background-color: #3a3232;
                color: #fffaf2;
            }
        `}
`;
export default FindId1;

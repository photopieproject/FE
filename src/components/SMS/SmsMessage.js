import styled, { css } from "styled-components";
import { useState } from "react";
import { useInput } from "../../lib/utils/useInput";
import { __findID, __findPW, __SMSSend } from "../../redux/modules/loginSlice";
import { useEffect } from "react";
import Button from "../button/Button";
import toast, { Toaster } from "react-hot-toast";

const SmsMessage = ({
    setOkConfirm,
    phoneNumber,
    setPhoneNumber,
    setIsShow,
    setIsUserId,
    userId,
}) => {
    // console.log(setOkConfirm);
    const [msgDisabled, setMsgDisabled] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [pnDisabled, setPnDisabled] = useState(true);
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
                setPnDisabled(true);
                setCodeNumber(res.data.data1);
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
                setPnDisabled(true);
                setShowInput(true);
                setIsUserId(res.data.data2);
                console.log("findid res: ", res.data);
                if (res.data.statusCode === 200) {
                    toast.success(res.data.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#3a3232",
                            color: "#fffaf2",
                        },
                        iconTheme: {
                            primary: "#fffaf2",
                            secondary: "#3a3232",
                        },
                        duration: 4000,
                    });
                } else {
                    toast.error("핸드폰 번호를 입력해주세요", {
                        style: {
                            borderRadius: "10px",
                            background: "#fffaf2",
                            color: "#3a3232",
                        },
                        iconTheme: {
                            primary: "#3a3232",
                            secondary: "#fffaf2",
                        },
                    });
                    setPnDisabled(false);
                    setShowInput(false);
                    // navigate("/login");
                }
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    };

    useEffect(() => {
        if (phoneNumber === undefined || phoneNumber === null) {
            alert("폰넘이 비어있음");
            setPnDisabled(true);
            // setShowInput(false);
        } else {
            setPnDisabled(false);
            // setShowInput(true);
        }
    }, [pnDisabled]);

    const findPwHandler = () => {
        __findPW({
            //서버로 요청하는 부분
            userId,
            phoneNumber, //나중에 없애야함, 나중에 phoneNumber랑 CodeNumber를 백한테 같이보내줘야함 백은 트루, 폴스를 보내줌 status===200 인증성공, statusCode로 판단
        })
            .then((res) => {
                //서버에서 받아온 부분

                setCodeNumber(res.data.data1);
                setShowInput(true);
                console.log("findid res: ", res.data);
                if (res.data.statusCode === 200) {
                    console.log("1234");
                    toast.success(
                        "인증문자 전송 완료! \n코드확인 후 비밀번호를 재설정 해주세요",
                        {
                            style: {
                                borderRadius: "10px",
                                background: "#3a3232",
                                color: "#fffaf2",
                            },
                            iconTheme: {
                                primary: "#fffaf2",
                                secondary: "#3a3232",
                            },
                            duration: 4000,
                        }
                    );
                    setIsShow(true);
                } else {
                    toast.error("아이디와 전화번호를 입력해주세요.", {
                        style: {
                            borderRadius: "10px",
                            background: "#fffaf2",
                            color: "#3a3232",
                        },
                        iconTheme: {
                            primary: "#3a3232",
                            secondary: "#fffaf2",
                        },
                    });
                    setPnDisabled(false);
                    setShowInput(false);
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
            setOkConfirm(false);
            setMsgDisabled(false);
            setCheckP(<CheP>인증번호를 확인해주세요</CheP>);
        } else if (codeNumber === confirmNumber) {
            setOkConfirm(true);
            setMsgDisabled(true);
            setCheckP(<CheP2>인증되었습니다</CheP2>);
        }
    };

    return (
        <>
            <StDiv SMSSend>
                <Toaster />
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
                        <Button
                            PnBtn
                            disabled={pnDisabled}
                            pnDisabled={pnDisabled}
                            onClick={() => findIdHandler(phoneNumber)}
                        >
                            인증번호 전송
                        </Button>
                    ) : window.location.href ===
                      "http://localhost:3000/signup" ? (
                        //사항연산자 안되면 if
                        <Button
                            PnBtn
                            disabled={pnDisabled}
                            pnDisabled={pnDisabled}
                            onClick={() => sendMessageHandler(phoneNumber)}
                        >
                            인증번호 전송
                            {/* 다 하고나서 전송으로 바꾸기 */}
                        </Button>
                    ) : window.location.href ===
                      "http://localhost:3000/findpw" ? (
                        <Button
                            PnBtn
                            disabled={pnDisabled}
                            pnDisabled={pnDisabled}
                            onClick={findPwHandler}
                        >
                            인증번호 전송
                        </Button>
                    ) : null}
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
                    </StDiv>
                )}
            </StDiv>
            {checkP}
        </>
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
            &:focus {
                outline: none;
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
        `}
`;

const CheP = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
    margin-top: 5px;
    color: red;
    margin-bottom: -10px;
`;
const CheP2 = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
    margin-top: 5px;
    color: #3a3232;
    margin-bottom: -10px;
`;

const StBtn = styled.button`
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
            background: ${({ msgDisabled }) =>
                msgDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ msgDisabled }) =>
                msgDisabled ? "#fffaf2" : "#3a3232"};
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

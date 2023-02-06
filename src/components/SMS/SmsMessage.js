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
    const [msgDisabled, setMsgDisabled] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [pnDisabled, setPnDisabled] = useState(false);
    const [pnBtnDisabled, setPnBtnDisabled] = useState(false);
    const [confirmNumber, setConfirmNumber] = useInput();
    const [checkP, setCheckP] = useState();
    const [codeNumber, setCodeNumber] = useState();

    function checkPhone(phoneNumber) {
        var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
        return regExp.test(phoneNumber);
    }

    useEffect(() => {
        if (checkPhone(phoneNumber) === false) {
            setPnBtnDisabled(true);
        } else {
            setPnBtnDisabled(false);
        }
    }, [phoneNumber]);

    const sendMessageHandler = (phoneNumber) => {
        __SMSSend(phoneNumber)
            .then((res) => {
                setPnBtnDisabled(true);
                setPnDisabled(true);
                setCodeNumber(res.data.data1);
                setShowInput(true);
            })
            .catch((err) => console.log(err));
    };

    const findIdHandler = (phoneNumber) => {
        __findID({
            phoneNumber,
        })
            .then((res) => {
                setPnBtnDisabled(true);
                setCodeNumber(res.data.data1);
                setPnDisabled(true);
                setShowInput(true);
                setIsUserId(res.data.data2);

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
                } else if (checkPhone(phoneNumber) === false) {
                    toast.error("'-'를 뺀 숫자를 정확히 입력해주세요.", {
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
                    setPnBtnDisabled(false);
                    setPnDisabled(false);
                    setShowInput(false);
                }
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    };

    const findPwHandler = () => {
        __findPW({
            userId,
            phoneNumber,
        })
            .then((res) => {
                setPnBtnDisabled(true);
                setCodeNumber(res.data.data1);
                setShowInput(true);

                if (res.data.statusCode === 200) {
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
                    setPnBtnDisabled(false);
                    setPnDisabled(false);
                    setShowInput(false);
                }
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    };

    const MessageConfirmHandler = () => {
        if (codeNumber !== confirmNumber) {
            setOkConfirm(false);
            setMsgDisabled(false);
            setCheckP(<StP notGood>인증번호를 확인해주세요</StP>);
        } else if (codeNumber === confirmNumber) {
            setOkConfirm(true);
            setMsgDisabled(true);
            setCheckP(<StP good>인증되었습니다</StP>);
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
                    {window.location.pathname === "/findid" ? (
                        <Button
                            PnBtn
                            disabled={pnBtnDisabled}
                            pnDisabled={pnBtnDisabled}
                            onClick={() => findIdHandler(phoneNumber)}
                        >
                            인증번호 전송
                        </Button>
                    ) : window.location.pathname === "/signup" ? (
                        <Button
                            PnBtn
                            disabled={pnBtnDisabled}
                            pnDisabled={pnBtnDisabled}
                            onClick={() => sendMessageHandler(phoneNumber)}
                        >
                            인증번호 전송
                        </Button>
                    ) : window.location.pathname === "/findpw" ? (
                        <Button
                            PnBtn
                            disabled={pnBtnDisabled}
                            pnDisabled={pnBtnDisabled}
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
                        <Button
                            SMSBtn
                            onClick={MessageConfirmHandler}
                            disabled={msgDisabled}
                            msgDisabled={msgDisabled}
                        >
                            인증
                        </Button>
                    </StDiv>
                )}
            </StDiv>
            {checkP}
        </>
    );
};

const StDiv = styled.div`
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

export default SmsMessage;

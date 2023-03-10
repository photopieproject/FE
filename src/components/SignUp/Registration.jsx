import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { __postSignup, __checkUserId } from "../../redux/modules/loginSlice";
import { useInput } from "../../lib/utils/useInput";
import { useState } from "react";
import { useEffect } from "react";
import SmsMessage from "../SMS/SmsMessage";
import toast, { Toaster } from "react-hot-toast";
import Button from "../button/Button";
import { ImEye } from "react-icons/im";
import { RiEyeCloseLine } from "react-icons/ri";
const Registration = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useInput();
    const [nickname, setNickName] = useInput();
    const [password, setPassword] = useInput();
    const [checkUserId, setCheckUserId] = useState(false);
    const [resetCheckUserId, setResetCheckUserId] = useState(false);
    const [showResetBtn, setShowResetBtn] = useState(false);
    const [registDisabled, setRegistDisabled] = useState(true);
    const [PWPtag, setPWPtag] = useState();
    const [PWConfirm, setPWConfirm] = useState("");
    const [PWConfirmP, setPWConfirmP] = useState(false);
    const [phoneNumber, setPhoneNumber] = useInput();
    const [okConfirm, setOkConfirm] = useState(false);
    const [checkP, setCheckP] = useState();
    const [passwordType, setPasswordType] = useState({
        type: "password",
        visible: false,
    });
    const [passwordChkType, setPasswordChkType] = useState({
        type: "password",
        visible: false,
    });

    const handlePasswordType = (e) => {
        setPasswordType(() => {
            if (!passwordType.visible) {
                return { type: "text", visible: true };
            }
            return { type: "password", visible: false };
        });
    };

    const handlePasswordChkType = (e) => {
        setPasswordChkType(() => {
            if (!passwordChkType.visible) {
                return { type: "text", visible: true };
            }
            return { type: "password", visible: false };
        });
    };

    const isId = (userId) => {
        var regExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g;
        return regExp.test(userId);
    };

    const isPassword = (asValue) => {
        const regExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        return regExp.test(asValue);
    };

    const PWChk = () => {
        if (!isPassword(password)) {
            setPWPtag(
                <StP notGood>
                    ???????????????+?????????/??????/??????????????? ???????????????, 8-15???
                </StP>
            );
        } else {
            setPWPtag(<StP good>??????????????? ???????????? ?????????</StP>);
        }
    };

    const PWConfirmChk = () => {
        if (password !== PWConfirm || password === "") {
            setPWConfirmP(
                <StP notGood>????????? ??????????????? ???????????? ????????????.</StP>
            );
        } else if (password === PWConfirm) {
            setPWConfirmP(<StP good>???????????? ?????????????????????.</StP>);
        }
    };

    useEffect(() => {
        if (okConfirm === true) {
            setRegistDisabled(!setRegistDisabled);
        } else {
            setRegistDisabled(true);
        }
    }, [okConfirm]);

    const onSubmitSignup = (e) => {
        e.preventDefault();
        if (checkUserId === false) {
            toast.error("??????????????? ??????????????????!", {
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

            return;
        }
        __postSignup({
            userId,
            nickname,
            password,
            phoneNumber,
        }).then((res) => {
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
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        });
    };

    const resetCheckUserIdHandler = () => {
        setResetCheckUserId(false);
        setCheckUserId(false);
    };

    const checkUserIdHandler = (userId) => {
        __checkUserId(userId).then((res) => {
            if (isId(userId) === false) {
                toast.error("ID??? ?????? ?????????, ????????? 5~10????????????.", {
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
                if (res === 200) {
                    setCheckUserId(true);
                    setShowResetBtn(true);
                    setCheckP(<StP CheP>?????? ????????? ID?????????</StP>);
                } else if (res === 400) {
                    setCheckUserId(false);
                    setCheckP(<StP CheP2>?????? ???????????? ID?????????</StP>);
                }
            }
        });
    };
    return (
        <StDiv SignupPage>
            <StDiv LeftBox>
                <Toaster />
                <StDiv LogoBox>
                    <StImg
                        src="/image/photopie_logo_1.png"
                        alt="home_logo"
                        onClick={() => navigate("/")}
                    />
                </StDiv>
                <StDiv TxtBox>
                    <StP LeftTxt1>Welcome To</StP>
                    <StP LeftTxt1>Photo-Pie</StP>
                    <StP LeftTxt2>???????????????. ?????????????????????.</StP>
                </StDiv>
                <StDiv>
                    <Button LeftSignUpbtn onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </StDiv>
            </StDiv>
            <StDiv SignUpBox>
                <StDiv SignUp>Create Account</StDiv>
                <StDiv IDPWBox>
                    <StDiv IdPw>
                        <StP subTit>?????????</StP>
                        <StInput
                            LoginInput2
                            type="text"
                            id="userId"
                            value={userId}
                            disabled={checkUserId}
                            onChange={setUserId}
                            placeholder="5~10??? ?????? ?????????, ??????"
                        />
                        <Button
                            IdCheckBtn
                            disabled={checkUserId}
                            checkUserId={checkUserId}
                            onClick={() => checkUserIdHandler(userId)}
                        >
                            ????????????
                        </Button>
                        {showResetBtn && (
                            <Button
                                IdCheckBtn
                                disabled={resetCheckUserId}
                                checkUserId={resetCheckUserId}
                                onClick={() => resetCheckUserIdHandler()}
                            >
                                ??????
                            </Button>
                        )}
                        {checkP}
                    </StDiv>

                    <StDiv IdPw>
                        <StP subTit>?????????</StP>
                        <StInput
                            LoginInput
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={setNickName}
                            placeholder="???????????? ??????????????????."
                            maxLength={10}
                        />
                    </StDiv>
                    <StDiv IdPw>
                        <StP subTit>????????????</StP>
                        <div style={{ position: "relative" }}>
                            <StInput
                                LoginInput
                                type={passwordType.type}
                                id="password"
                                onBlur={PWChk}
                                value={password}
                                onChange={setPassword}
                                autoComplete="off"
                                placeholder="8~15??? ?????? ???+?????????, ??????, ????????????"
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    right: "60px",
                                    bottom: "10px",
                                }}
                                onClick={handlePasswordType}
                            >
                                {passwordType.visible ? (
                                    <span>
                                        <ImEye />
                                    </span>
                                ) : (
                                    <span>
                                        <RiEyeCloseLine />
                                    </span>
                                )}
                            </div>
                        </div>
                        {PWPtag}
                    </StDiv>
                    <StDiv IdPw style={{ position: "relative" }}>
                        <StP subTit>???????????? ??????</StP>
                        <div style={{ position: "relative" }}>
                            <StInput
                                LoginInput
                                type={passwordChkType.type}
                                id="password"
                                onBlur={PWConfirmChk}
                                required
                                value={PWConfirm}
                                onChange={(e) => {
                                    setPWConfirm(e.target.value);
                                }}
                                autoComplete="off"
                                placeholder="8~15??? ?????? ???+?????????, ??????, ????????????"
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    right: "60px",
                                    bottom: "10px",
                                }}
                                onClick={handlePasswordChkType}
                            >
                                {passwordChkType.visible ? (
                                    <span>
                                        <ImEye />
                                    </span>
                                ) : (
                                    <span>
                                        <RiEyeCloseLine />
                                    </span>
                                )}
                            </div>
                        </div>
                        {PWConfirmP}
                    </StDiv>
                </StDiv>
                <SmsMessage
                    setOkConfirm={setOkConfirm}
                    setPhoneNumber={setPhoneNumber}
                    phoneNumber={phoneNumber}
                />
                <StDiv LoginBtnBox>
                    <Button
                        LoginBtn
                        disabled={registDisabled}
                        registDisabled={registDisabled}
                        onClick={onSubmitSignup}
                    >
                        Sign Up
                    </Button>
                </StDiv>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.SignupPage &&
        css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
        `}
    ${(props) =>
        props.LeftBox &&
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
        props.SignUpBox &&
        css`
            width: 55%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `}
    ${(props) =>
        props.SignUp &&
        css`
            font-size: 70px;
            display: flex;
            justify-content: center;
            margin: -10px 0 0px 0;
            font-family: "Belleza";
        `}
    ${(props) =>
        props.IDPWBox &&
        css`
            display: flex;
            width: 400px;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.IdPw &&
        css`
            width: 350px;
            font-size: 15px;
            font-weight: bold;
            padding-top: 20px;
        `}
    ${(props) =>
        props.LoginBtnBox &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        `}
    ${(props) =>
        props.SignUpGoBox &&
        css`
            font-size: 13px;
            display: flex;
            justify-content: center;
            margin-top: 10px;
        `}
`;

const StImg = styled.img`
    width: 140px;
    cursor: pointer;
`;

const StP = styled.p`
    ${(props) =>
        props.LeftTxt1 &&
        css`
            font-size: 50px;
            color: #fffaf2;
            margin-top: -60px;
            font-family: "Belleza";
            margin-bottom: 55px;
        `}
    ${(props) =>
        props.LeftTxt2 &&
        css`
            font-size: 24px;
            color: #fffaf2;
            margin: -20px auto 60px auto;
            font-family: "Nanum Myeongjo", serif;
        `}
    ${(props) =>
        props.CheP &&
        css`
            font-size: 13px;
            font-weight: bold;
            margin-top: 5px;
            color: #3a3232;
            margin-bottom: -10px;
        `}
    ${(props) =>
        props.CheP2 &&
        css`
            font-size: 13px;
            font-weight: bold;
            margin-top: 5px;
            color: red;
            margin-bottom: -10px;
        `}
    ${(props) =>
        props.good &&
        css`
            margin-top: 7px;
            font-size: 12px;
            color: #3a3232;
            font-weight: bold;
        `}
    ${(props) =>
        props.notGood &&
        css`
            margin-top: 7px;
            font-size: 12px;
            color: red;
            font-weight: bold;
        `}
    ${(props) =>
        props.subTit &&
        css`
            margin: 0 0 5px 0;
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
            border: none;
            width: 150px;
            height: 40px;
            border-radius: 10px;
            &:focus {
                outline: none;
            }
        `}
`;

export default Registration;

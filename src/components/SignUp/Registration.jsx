import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { __postSignup, __checkUserId } from "../../redux/modules/loginSlice";
import { useInput } from "../../lib/utils/useInput";
import { useState } from "react";
import { useEffect } from "react";
import SmsMessage from "../SMS/SmsMessage";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
    const [userId, setUserId] = useInput();
    const [nickname, setNickName] = useInput();
    const [password, setPassword] = useInput();
    const [checkUserId, setCheckUserId] = useState(false);
    const [registDisabled, setRegistDisabled] = useState(true);
    const [PWPtag, setPWPtag] = useState();
    const [PWConfirm, setPWConfirm] = useState("");
    const [PWConfirmP, setPWConfirmP] = useState(false);
    const [phoneNumber, setPhoneNumber] = useInput();
    const [okConfirm, setOkConfirm] = useState(false);
    const [checkP, setCheckP] = useState();

    function isPassword(asValue) {
        //정규식, 유효성검사
        const regExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        return regExp.test(asValue);
    }

    const PWChk = () => {
        if (!isPassword(password)) {
            setPWPtag(
                <StPs>
                    영문대문자+소문자/숫자/특수문자를 모두포함한, 8-15자
                </StPs>
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
        }
    };

    useEffect(() => {
        console.log(okConfirm);
        if (okConfirm === true) {
            setRegistDisabled(!setRegistDisabled);
        } else {
            setRegistDisabled(true);
        }
    }, [okConfirm]);

    const navigate = useNavigate();

    function isId(userId) {
        var regExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g;
        return regExp.test(userId);
    }

    const onSubmitSignup = (e) => {
        console.log("checkUserId:", checkUserId);
        e.preventDefault();
        if (checkUserId === false) {
            toast.error("중복체크를 확인해주세요!", {
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
        })
            .then((res) => {
                console.log("signup res: ", res);

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
            })

            .catch((err) => {
                console.log("error: ", err);
            });
    };

    ///^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g 아이디정규식
    const checkUserIdHandler = (userId) => {
        __checkUserId(userId).then((res) => {
            if (isId(userId) === false) {
                toast.error("ID는 영문 소문자, 숫자로 5~10자입니다.", {
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
                console.log(res);
                if (res === 200) {
                    setCheckUserId(true);
                    setCheckP(<CheP>사용 가능한 ID입니다</CheP>);
                } else if (res === 400) {
                    setCheckUserId(false);
                    setCheckP(<CheP2>이미 사용중인 ID입니다</CheP2>);
                }
            }
        });
    };

    return (
        <StDiv SignupPage>
            <StDiv LeftBox>
                <Toaster />
                <StDiv LogoBox>
                    <img
                        src="/image/photopie_logo_1.png"
                        alt="home_logo"
                        style={{ width: "140px", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    />
                </StDiv>
                <StDiv TxtBox>
                    <StPLeft LeftTxt1>Welcome To</StPLeft>
                    <StPLeft LeftTxt1>Photo-Pie</StPLeft>
                    <StPLeft LeftTxt2>안녕하세요. 포토파이입니다.</StPLeft>
                </StDiv>
                <StDiv>
                    <StBtn LeftSignUpbtn onClick={() => navigate("/login")}>
                        Login
                    </StBtn>
                </StDiv>
            </StDiv>
            <StDiv SignUpBox>
                <StDiv SignUp>Create Account</StDiv>
                <StDiv IDPWBox>
                    <StDiv IdPw>
                        아이디
                        <br />
                        <StInput
                            LoginInput2
                            type="text"
                            id="userId"
                            value={userId}
                            disabled={checkUserId}
                            onChange={setUserId}
                            placeholder="5~10자 영문 소문자, 숫자"
                        />
                        <StBtn
                            IdCheckBtn
                            disabled={checkUserId}
                            checkUserId={checkUserId}
                            onClick={() => checkUserIdHandler(userId)}
                        >
                            중복확인
                        </StBtn>
                        {checkP}
                    </StDiv>

                    <StDiv IdPw>
                        닉네임
                        <br />
                        <StInput
                            LoginInput
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={setNickName}
                            placeholder="닉네임을 입력해주세요."
                        />
                    </StDiv>
                    <StDiv IdPw>
                        비밀번호
                        <br />
                        <StInput
                            LoginInput
                            type="password"
                            id="password"
                            onBlur={PWChk}
                            value={password}
                            onChange={setPassword}
                            autoComplete="off"
                            placeholder="8~15자 영문 대+소문자, 숫자, 특수문자"
                        />
                        {PWPtag}
                    </StDiv>
                    <StDiv IdPw>
                        비밀번호 확인 <br />
                        <StInput
                            LoginInput
                            onBlur={PWConfirmChk}
                            type="password"
                            id="password"
                            required
                            value={PWConfirm}
                            onChange={(e) => {
                                setPWConfirm(e.target.value);
                            }}
                            autoComplete="off"
                            placeholder="8~15자 영문 대+소문자, 숫자, 특수문자"
                        />
                        {PWConfirmP}
                    </StDiv>
                </StDiv>
                <SmsMessage
                    setOkConfirm={setOkConfirm}
                    setPhoneNumber={setPhoneNumber}
                    phoneNumber={phoneNumber}
                />

                <StDiv LoginBtnBox>
                    <StBtn
                        LoginBtn
                        disabled={registDisabled}
                        registDisabled={registDisabled}
                        onClick={onSubmitSignup}
                    >
                        Sign Up
                    </StBtn>
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
            color: black;
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
            color: black;
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
            /* display: flex; */
            font-size: 15px;
            font-weight: bold;
            color: #6b6462;
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

const StPLeft = styled.p`
    ${(props) =>
        props.LeftTxt1 &&
        css`
            font-size: 50px;
            color: white;
            margin-top: -60px;
            font-family: "Belleza";
            margin-bottom: 55px;
        `}
    ${(props) =>
        props.LeftTxt2 &&
        css`
            font-size: 24px;
            color: white;
            margin: -20px auto 60px auto;
        `}
`;

const CheP = styled.p`
    font-size: 13px;
    font-weight: bold;
    margin-top: 5px;
    color: #3a3232;
    margin-bottom: -10px;
`;

const CheP2 = styled.p`
    font-size: 13px;
    font-weight: bold;
    margin-top: 5px;
    color: red;
    margin-bottom: -10px;
`;

const StPs = styled.p`
    margin-top: 7px;
    font-size: 12px;
    color: red;
    font-weight: bold;
`;

const StPs2 = styled.p`
    margin-top: 7px;
    font-size: 12px;
    color: #3a3232;
    font-weight: bold;
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
            width: 200px;
            height: 40px;
            border-radius: 10px;
            &:focus {
                outline: none;
            }
        `}
`;

const StBtn = styled.button`
    ${(props) =>
        props.LeftSignUpbtn &&
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
        props.IdCheckBtn &&
        css`
            width: 100px;
            height: 40px;
            border-radius: 10px;
            margin-left: 10px;
            font-weight: bold;
            &:hover {
                cursor: pointer;
                background-color: #3a3232;
                color: #fffaf2;
            }
            background: ${({ checkUserId }) =>
                checkUserId ? "#d9d9d9" : "#fffaf2"};
            color: ${({ checkUserId }) =>
                checkUserId ? "#fffaf2" : "#3a3232"};
            border: ${({ checkUserId }) =>
                checkUserId ? "none" : "2px solid #3a3232"};
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            &:disabled {
                background-color: #ddd8d8;
            }
        `}
    ${(props) =>
        props.LoginBtn &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            margin-top: 10px;
            font-weight: bold;
            &:hover {
                cursor: pointer;
                background-color: #3a3232;
                color: #fffaf2;
            }
            background: ${({ registDisabled }) =>
                registDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ registDisabled }) =>
                registDisabled ? "#fffaf2" : "#3a3232"};
            border: ${({ registDisabled }) =>
                registDisabled ? "none" : "2px solid #3a3232"};
            cursor: pointer;
            &:disabled {
                background-color: #ddd8d8;
            }
        `}
    ${(props) =>
        props.SignUpGoBtn &&
        css`
            border: none;
            background-color: transparent;
            font-weight: bold;
            color: #7d6945;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        `}
`;

export default Registration;

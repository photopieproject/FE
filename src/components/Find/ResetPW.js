import styled, { css } from "styled-components";
import { useInput } from "../../lib/utils/useInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { __resetPW } from "../../redux/modules/loginSlice";
import toast, { Toaster } from "react-hot-toast";
import Button from "../button/Button";

function ResetPW({ userId, setUserId }) {
    const [password, setPassword] = useInput();
    const [PWConfirm, setPWConfirm] = useState("");
    const [PWPtag, setPWPtag] = useState();
    const [PWConfirmP, setPWConfirmP] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(true);
    const navigate = useNavigate();

    function isPassword(asValue) {
        const regExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        return regExp.test(asValue);
    }

    const PWChk = () => {
        if (!isPassword(password)) {
            setPWPtag(
                <StP notGood>
                    영문대문자+소문자/숫자/특수문자를 모두포함한, 8-15자
                </StP>
            );
        } else {
            setPWPtag(<StP good>사용가능한 비밀번호 입니다</StP>);
        }
    };

    const PWConfirmChk = () => {
        if (password !== PWConfirm || password === "") {
            setPWConfirmP(
                <StP notGood>입력한 비밀번호와 일치하지 않습니다.</StP>
            );
        } else if (password === PWConfirm) {
            setPWConfirmP(<StP good>비밀번호 확인되었습니다.</StP>);
            setNextDisabled(false);
        }
    };

    const ResetPWHandler = (password, userId) => {
        __resetPW({
            userId,
            password,
        })
            .then((res) => {
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
                    setUserId();
                }
            })
            .catch((err) => {});
        navigate("/login");
    };

    return (
        <StDiv ResetPWPage>
            <Toaster />
            <StDiv FindPWMsg>
                <StDiv FindPw>Reset Password</StDiv>
                <StDiv IdPw>
                    <StP tit>Password</StP>
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
                    {PWPtag}
                </StDiv>
                <StDiv IdPw>
                    <StP tit>Password Check</StP>
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
                        placeholder="8~15자 영문 대 소문자, 숫자, 특수문자"
                    />
                    {PWConfirmP}
                </StDiv>
                <StDiv NextGoBtnBox>
                    <Button
                        NextGoBtn
                        onClick={() => ResetPWHandler(password, userId)}
                        disabled={nextDisabled}
                        nextDisabled={nextDisabled}
                    >
                        Go Login
                    </Button>
                </StDiv>
            </StDiv>
            <StDiv RightBox>
                <StDiv LogoBox>
                    <StImg
                        src="/image/photopie_logo_1.png"
                        alt="home_logo"
                        onClick={() => navigate("/")}
                    />
                </StDiv>
                <StDiv TxtBox>
                    <StP RightTxt1>Welcome Back!</StP>
                    <StP RightTxt2>안녕하세요. 포토파이입니다.</StP>
                </StDiv>
                <StDiv>
                    <Button RightLoginbtn onClick={() => navigate("/login")}>
                        Login
                    </Button>
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
    ${(props) =>
        props.tit &&
        css`
            font-family: "Belleza";
        `}

    ${(props) =>
        props.notGood &&
        css`
            margin-top: 7px;
            font-size: 12px;
            color: red;
        `}
    ${(props) =>
        props.good &&
        css`
            margin-top: 7px;
            font-size: 12px;
            color: #3a3232;
            font-weight: bold;
        `}
`;

const StImg = styled.img`
    width: 140px;
    cursor: pointer;
`;

export default ResetPW;

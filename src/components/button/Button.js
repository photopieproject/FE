import styled, { css } from "styled-components";

const Button = (props) => {
    const {
        children,
        onClick,
        startCamera,
        cameraBtn1,
        cameraBtn2,
        cameraBtn3,
        cameraBtn4,
        photoTrans,
        kakaoUrl,
        kakaoDown,
        roomBtn,
        qrcode,
        savePhoto,
        disabled,
        oneDis,
        twoDis,
        threeDis,
        fourDis,
        saveDisabled,
        createImg,
        PnBtn,
        RePnBtn,
        pnDisabled,
        NextGoBtn,
        NextGoBtn1,
        NextGoBtn2,
        NextGoBtnFindpw,
        nextDisabled,
        RightFindIdBtn,
        RightLoginbtn,
        MainTopStartBtn,
        MainTopStartBtn3,
        LeftSignUpbtn,
        AgreeBtn,
        ModalCancleBtn,
        IdCheckBtn,
        checkUserId,
        LoginBtn,
        registDisabled,
        SMSBtn,
        msgDisabled,
        MainLoginBtn,
        ForgotID,
        ForgotPW,
        RightSignUpbtn,
    } = props;
    return (
        <StButton
            onClick={onClick}
            kakaoUrl={kakaoUrl}
            kakaoDown={kakaoDown}
            roomBtn={roomBtn}
            startCamera={startCamera}
            cameraBtn1={cameraBtn1}
            cameraBtn2={cameraBtn2}
            cameraBtn3={cameraBtn3}
            cameraBtn4={cameraBtn4}
            photoTrans={photoTrans}
            qrcode={qrcode}
            savePhoto={savePhoto}
            disabled={disabled}
            oneDis={oneDis}
            twoDis={twoDis}
            threeDis={threeDis}
            fourDis={fourDis}
            saveDisabled={saveDisabled}
            createImg={createImg}
            PnBtn={PnBtn}
            RePnBtn={RePnBtn}
            pnDisabled={pnDisabled}
            NextGoBtn={NextGoBtn}
            NextGoBtn1={NextGoBtn1}
            NextGoBtn2={NextGoBtn2}
            NextGoBtnFindpw={NextGoBtnFindpw}
            nextDisabled={nextDisabled}
            RightFindIdBtn={RightFindIdBtn}
            RightLoginbtn={RightLoginbtn}
            MainTopStartBtn={MainTopStartBtn}
            MainTopStartBtn3={MainTopStartBtn3}
            LeftSignUpbtn={LeftSignUpbtn}
            AgreeBtn={AgreeBtn}
            ModalCancleBtn={ModalCancleBtn}
            IdCheckBtn={IdCheckBtn}
            checkUserId={checkUserId}
            LoginBtn={LoginBtn}
            registDisabled={registDisabled}
            SMSBtn={SMSBtn}
            msgDisabled={msgDisabled}
            MainLoginBtn={MainLoginBtn}
            ForgotID={ForgotID}
            ForgotPW={ForgotPW}
            RightSignUpbtn={RightSignUpbtn}
        >
            {children}
        </StButton>
    );
};

const StButton = styled.button`
    border: 0;
    cursor: pointer;
    ${(props) =>
        props.startCamera &&
        css`
            border-radius: 50px;
            width: 220px;
            height: 50px;
            font-size: 16px;
            margin-top: 50px;
            background-color: #3a3232;
            color: #fffaf2;
        `}
    ${(props) =>
        props.cameraBtn1 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: ${({ oneDis }) => (oneDis ? "#3a3232" : "#fffaf2")};
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ oneDis }) =>
                oneDis ? "#f2eeee" : "#3a3232"};
            &:hover {
                background-color: #f2eeee;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.cameraBtn2 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: ${({ twoDis }) => (twoDis ? "#3a3232" : "#fffaf2")};
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ twoDis }) =>
                twoDis ? "#f2eeee" : "#3a3232"};
            &:hover {
                background-color: #f2eeee;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.cameraBtn3 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: ${({ threeDis }) => (threeDis ? "#3a3232" : "#fffaf2")};
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ threeDis }) =>
                threeDis ? "#f2eeee" : "#3a3232"};
            &:hover {
                background-color: #f2eeee;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.cameraBtn4 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: ${({ fourDis }) => (fourDis ? "#3a3232" : "#fffaf2")};
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ fourDis }) =>
                fourDis ? "#f2eeee" : "#3a3232"};
            &:hover {
                background-color: #f2eeee;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.photoTrans &&
        css`
            border-radius: 10px;
            background-color: ${({ saveDisabled }) =>
                saveDisabled ? "#f2eeee" : "#3a3232"};
            color: ${({ saveDisabled }) =>
                saveDisabled ? "#3a3232" : "#fffaf2"};
            width: 200px;
            height: 50px;
        `}
    ${(props) =>
        props.createImg &&
        css`
            width: 100px;
            height: 100px;
            border-radius: 10px;
            background-color: #e2d6c5;
            color: #3a3232;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
    ${(props) =>
        props.qrcode &&
        css`
            width: 100px;
            height: 100px;
            border-radius: 10px;
            background-color: #3a3232;
            color: #fffaf2;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
    ${(props) =>
        props.savePhoto &&
        css`
            border-radius: 10px;
            background-color: #3a3232;
            color: #fffaf2;
            width: 200px;
            height: 50px;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
    ${(props) =>
        props.kakaoUrl &&
        css`
            border-radius: 10px;
            background-color: #3a3232;
            color: #fffaf2;
            width: 100px;
            height: 100px;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
    ${(props) =>
        props.kakaoDown &&
        css`
            border-radius: 10px;
            background-color: #e2d6c5;
            color: #3a3232;
            width: 100px;
            height: 100px;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
    ${(props) =>
        props.roomBtn &&
        css`
            font-family: "Nanum Myeongjo", serif;
            background-color: #3a3232;
            border-radius: 50px;
            color: #fffaf2;
            width: 150px;
            height: 35px;
            margin-top: 20px;
            transition: background-color 0.25s ease-in-out;
            &:hover {
                background-color: #af9462;
            }
        `}
    ${(props) =>
        props.PnBtn &&
        css`
            width: 60px;
            height: 40px;
            border-radius: 10px;
            margin-left: 10px;
            font-weight: bold;
            background: ${({ pnDisabled }) =>
                pnDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ pnDisabled }) => (pnDisabled ? "#fffaf2" : "#3a3232")};
            border: ${({ pnDisabled }) =>
                pnDisabled ? "none" : "2px solid #3a3232"};
            font-weight: bold;
            font-size: 14px;
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
            &:disabled {
                background-color: #ddd8d8;
            }
        `}
    ${(props) =>
        props.RePnBtn &&
        css`
            width: 60px;
            height: 40px;
            border-radius: 10px;
            margin-left: 10px;
            font-weight: bold;
            background: ${({ pnDisabled }) =>
                pnDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ pnDisabled }) => (pnDisabled ? "#fffaf2" : "#3a3232")};
            border: ${({ pnDisabled }) =>
                pnDisabled ? "none" : "2px solid #3a3232"};
            font-weight: bold;
            font-size: 14px;
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
            &:disabled {
                background-color: #ddd8d8;
            }
        `}
    ${(props) =>
        props.NextGoBtn &&
        css`
            font-size: 20px;
            width: 170px;
            height: 60px;
            border-radius: 50px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${({ nextDisabled }) =>
                nextDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ nextDisabled }) =>
                nextDisabled ? "#fffaf2" : "#3a3232"};
            border: ${({ nextDisabled }) =>
                nextDisabled ? "none" : "2px solid #3a3232"};
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
            &:disabled {
                background-color: #ddd8d8;
            }
        `}

        ${(props) =>
        props.NextGoBtn1 &&
        css`
            font-size: 20px;
            width: 170px;
            height: 60px;
            border-radius: 50px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fffaf2;
            color: #3a3232;
            border: 2px solid #3a3232;

            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
        `}

    ${(props) =>
        props.NextGoBtn2 &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 170px;
            height: 60px;
            border-radius: 50px;
            border: 2px solid #3a3232;
            background-color: #fffaf2;
            color: #3a3232;
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
        `}

        ${(props) =>
        props.NextGoBtnFindpw &&
        css`
            font-size: 20px;
            width: 170px;
            height: 60px;
            border-radius: 50px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${({ nextDisabled }) =>
                nextDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ nextDisabled }) =>
                nextDisabled ? "#fffaf2" : "#3a3232"};
            border: ${({ nextDisabled }) =>
                nextDisabled ? "none" : "2px solid #3a3232"};
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
            &:disabled {
                background-color: #ddd8d8;
            }
        `}


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
                background-color: #fffaf2;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.MainTopStartBtn &&
        css`
            font-family: "Nanum Myeongjo", serif;
            width: 200px;
            height: 35px;
            font-size: 14px;
            margin-top: 60px;
            background-color: #3a3232;
            border: 0;
            border-radius: 50px;
            color: #fffaf2;
        `}
    ${(props) =>
        props.MainTopStartBtn3 &&
        css`
            font-family: "Nanum Myeongjo", serif;
            width: 200px;
            height: 35px;
            font-size: 14px;
            margin-top: 40px;
            background-color: #3a3232;
            border: 0;
            border-radius: 50px;
            color: #fffaf2;
        `}
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
                background-color: #fffaf2;
                color: #3a3232;
            }
        `}
    ${(props) =>
        props.AgreeBtn &&
        css`
            text-decoration: underline;
            background-color: transparent;
            font-size: 16px;
            color: #3a3232;
            font-family: "Nanum Myeongjo", serif;
        `}
        ${(props) =>
        props.ModalCancleBtn &&
        css`
            position: fixed;
            width: 25px;
            height: 25px;
            border-radius: 50px;
            margin: 10px 0 0 -15px;
            background-color: #3a3232;
            color: #fffaf2;
            display: flex;
            align-items: center;
        `}
    ${(props) =>
        props.IdCheckBtn &&
        css`
            width: 80px;
            height: 40px;
            border-radius: 10px;
            margin-left: 10px;
            font-weight: bold;
            background: ${({ checkUserId }) =>
                checkUserId ? "#d9d9d9" : "#fffaf2"};
            color: ${({ checkUserId }) =>
                checkUserId ? "#fffaf2" : "#3a3232"};
            border: ${({ checkUserId }) =>
                checkUserId ? "none" : "2px solid #3a3232"};
            font-weight: bold;
            font-size: 14px;
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
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
            background: ${({ registDisabled }) =>
                registDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ registDisabled }) =>
                registDisabled ? "#fffaf2" : "#3a3232"};
            border: ${({ registDisabled }) =>
                registDisabled ? "none" : "2px solid #3a3232"};
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
            &:disabled {
                background-color: #ddd8d8;
            }
        `}
    ${(props) =>
        props.SMSBtn &&
        css`
            width: 120px;
            height: 40px;
            border-radius: 10px;
            margin-left: 10px;
            font-weight: bold;
            background: ${({ msgDisabled }) =>
                msgDisabled ? "#d9d9d9" : "#fffaf2"};
            color: ${({ msgDisabled }) =>
                msgDisabled ? "#fffaf2" : "#3a3232"};
            border: ${({ msgDisabled }) =>
                msgDisabled ? "none" : "2px solid #3a3232"};
            font-weight: bold;
            font-size: 14px;
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
            &:disabled {
                background-color: #ddd8d8;
            }
        `}
    ${(props) =>
        props.MainLoginBtn &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            margin-bottom: 10px;
            background-color: #fffaf2;
            border: 2px solid #3a3232;
            color: #3a3232;
            &:hover {
                background-color: #3a3232;
                color: #fffaf2;
            }
        `}
    ${(props) =>
        props.ForgotID &&
        css`
            width: 50px;
            display: flex;
            padding: 0px;
            font-size: 13px;
            background-color: transparent;
            color: #3a3232;
            border: none;
            font-weight: bold;
        `}
    ${(props) =>
        props.ForgotPW &&
        css`
            width: 100px;
            padding: 0 0 0 5px;
            display: flex;
            font-size: 13px;
            background-color: transparent;
            color: #3a3232;
            border: none;
            font-weight: bold;
        `}
    ${(props) =>
        props.RightSignUpbtn &&
        css`
            font-family: "Belleza";
            font-size: 20px;
            width: 250px;
            height: 60px;
            border-radius: 50px;
            margin-top: -10px;
            border: 1px solid #fffaf2;
            background-color: #3a3232;
            color: #fffaf2;
            &:hover {
                background-color: #fffaf2;
                color: #3a3232;
            }
        `}
`;

export default Button;

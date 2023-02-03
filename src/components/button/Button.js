import styled, { css } from "styled-components";

const Button = (props) => {
    const {
        children,
        onClick,
        kakao,
        down,
        room_btn,
        choose_frame,
        start_camera,
        camera_btn1,
        camera_btn2,
        camera_btn3,
        camera_btn4,
        photo_trans,
        disabled,
        oneDis,
        twoDis,
        threeDis,
        fourDis,
        saveDisabled,
    } = props;
    return (
        <StButton
            onClick={onClick}
            kakao={kakao}
            down={down}
            room_btn={room_btn}
            choose_frame={choose_frame}
            start_camera={start_camera}
            camera_btn1={camera_btn1}
            camera_btn2={camera_btn2}
            camera_btn3={camera_btn3}
            camera_btn4={camera_btn4}
            photo_trans={photo_trans}
            disabled={disabled}
            oneDis={oneDis}
            twoDis={twoDis}
            threeDis={threeDis}
            fourDis={fourDis}
            saveDisabled={saveDisabled}
        >
            {children}
        </StButton>
    );
};

const StButton = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
    ${(props) =>
        props.kakao &&
        css`
            background-color: #fee102;
            font-weight: bold;
            font-size: 15px;
            width: 200px;
            height: 35px;
            box-shadow: 7px 7px 0px 1px gray;
        `}
    ${(props) =>
        props.down &&
        css`
            background-color: #ebe7e1;
            font-weight: bold;
            font-size: 15px;
            width: 200px;
            height: 35px;
            box-shadow: 7px 7px 0px 1px gray;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
            ${(props) =>
        props.room_btn &&
        css`
            background-color: #402c00;
            border-radius: 10px;
            color: white;
            width: 150px;
            height: 40px;
            margin-top: 20px;
            transition: background-color 0.25s ease-in-out;
            &:hover {
                background-color: #af9462;
            }
        `}
        ${(props) =>
        props.choose_frame &&
        css`
            background-color: #ebe7e1;
            box-shadow: 7px 7px 0px 1px gray;
            font-weight: bold;
            font-size: 15px;
            width: 100px;
            height: 35px;
            margin-top: 20px;
        `}
        ${(props) =>
        props.start_camera &&
        css`
            border-radius: 10px;
            width: 220px;
            height: 50px;
            font-size: 16px;
            color: white;
            margin-top: 50px;
            transition: background-color 0.25s ease-in-out;
            background-color: #402c00;
            &:hover {
                background-color: #d8c5a2;
            }
        `}
        ${(props) =>
        props.camera_btn1 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: white;
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ oneDis }) =>
                oneDis ? "#d8c5a2" : "#402c00"};
            &:hover {
                background-color: #d8c5a2;
            }
        `}
        ${(props) =>
        props.camera_btn2 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: white;
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ twoDis }) =>
                twoDis ? "#d8c5a2" : "#402c00"};
            &:hover {
                background-color: #d8c5a2;
            }
        `}
        ${(props) =>
        props.camera_btn3 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: white;
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ threeDis }) =>
                threeDis ? "#d8c5a2" : "#402c00"};
            &:hover {
                background-color: #d8c5a2;
            }
        `}
        ${(props) =>
        props.camera_btn4 &&
        css`
            border-radius: 10px;
            width: 100px;
            height: 100px;
            font-size: 16px;
            color: white;
            transition: background-color 0.25s ease-in-out;
            background-color: ${({ fourDis }) =>
                fourDis ? "#d8c5a2" : "#402c00"};
            &:hover {
                background-color: #d8c5a2;
            }
        `}
        ${(props) =>
        props.photo_trans &&
        css`
            border-radius: 10px;
            background-color: ${({ saveDisabled }) =>
                saveDisabled ? "#af9462" : "#402c00"};
            color: white;
            width: 200px;
            height: 50px;
            transition: background-color 0.25s ease-in-out;
            &:hover {
                background-color: #af9462;
            }
        `}
`;

export default Button;

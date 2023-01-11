import styled, { css } from "styled-components";

const Button = (props) => {
    const { children, onClick, kakao, down, room_btn, choose_frame } = props;
    return (
        <StButton
            onClick={onClick}
            kakao={kakao}
            down={down}
            room_btn={room_btn}
            choose_frame={choose_frame}
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
            background-color: #ebe7e1;
            box-shadow: 7px 7px 0px 1px gray;
            font-weight: bold;
            font-size: 15px;
            width: 100px;
            height: 35px;
            margin-top: 20px;
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
`;

export default Button;

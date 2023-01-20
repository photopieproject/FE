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
    } = props;
    return (
        <StButton
            onClick={onClick}
            kakao={kakao}
            down={down}
            room_btn={room_btn}
            choose_frame={choose_frame}
            start_camera={start_camera}
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
        ${(props) =>
        props.start_camera &&
        css`
            position: relative;
            height: 50px;
            padding: 0 30px;
            border: 2px solid #000;
            background-color: #e8e8e8;
            user-select: none;
            white-space: nowrap;
            transition: all 0.05s linear;
            font-family: inherit;
            margin: 10px;

            &::before,
            &::after {
                content: "";
                position: absolute;
                background: #e8e8e8;
                transition: all 0.2s linear;
            }

            &::before {
                width: calc(100% + 6px);
                height: calc(100% - 16px);
                top: 8px;
                left: -3px;
            }

            &::after {
                width: calc(100% - 16px);
                height: calc(100% + 6px);
                top: -3px;
                left: 8px;
            }

            &:hover {
                cursor: crosshair;
            }

            &:active {
                transform: scale(0.95);
            }

            &:hover:before {
                height: calc(100% - 32px);
                top: 16px;
            }

            &:hover:after {
                width: calc(100% - 32px);
                left: 16px;
            }

            & span {
                font-size: 15px;
                z-index: 3;
                position: relative;
                font-weight: 600;
            }
        `}
`;

export default Button;

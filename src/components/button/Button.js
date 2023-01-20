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
            align-items: center;
            background-color: transparent;
            color: #000;
            display: flex;
            font-family: ui-sans-serif, system-ui, -apple-system, system-ui,
                "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
                sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.5;
            text-decoration: none;
            text-transform: uppercase;
            outline: 0;
            border: 0;
            padding: 1rem;

            &::before {
                background-color: #000;
                content: "";
                display: inline-block;
                height: 1px;
                margin-right: 10px;
                transition: all 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
                width: 0;
            }

            &:hover:before {
                background-color: #000;
                width: 3rem;
            }
        `}
`;

export default Button;

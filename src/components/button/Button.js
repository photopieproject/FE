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
            display: flex;
            align-items: center;
            color: #478ba2;
            background: none;
            border: none;
            padding: 12px 18px;
            position: relative;
            font-size: 1rem;
            text-transform: uppercase;
            font-weight: 700;
            font-family: monospace;
            transition: linear 0.3s;
            margin-top: 30px;

            &:hover {
                color: #478ba2;
            }

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                transform: translateY(-50%) translateX(calc(100% + 4px));
                width: 45px;
                height: 45px;
                background-color: #eee8dc;
                border-radius: 50px;
                transition: transform 0.25s 0.25s cubic-bezier(0, 0, 0.5, 2),
                    width 0.25s cubic-bezier(0, 0, 0.5, 2);
                z-index: -1;
            }

            &:hover::before {
                width: 100%;
                transform: translateY(-50%) translateX(-18px);
                transition: transform 0.25s cubic-bezier(0, 0, 0.5, 2);
            }
        `}
`;

export default Button;

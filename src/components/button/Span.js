import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nav_logo, qrcode, nick, hello, room_name, red } =
        props;
    return (
        <StSpan
            onClick={onClick}
            nav_logo={nav_logo}
            qrcode={qrcode}
            nick={nick}
            hello={hello}
            room_name={room_name}
            red={red}
        >
            {children}
        </StSpan>
    );
};

const StSpan = styled.span`
    cursor: pointer;
    ${(props) =>
        props.qrcode &&
        css`
        border-radius: 10px;
            background-color: #3a3232;
            color: #fffaf2;
            width: 200px;
            height: 50px;,
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
        `}
    ${(props) =>
        props.nick &&
        css`
            cursor: default;
        `}
    ${(props) =>
        props.hello &&
        css`
            cursor: default;
            margin-right: 30px;
        `}
    ${(props) =>
        props.room_name &&
        css`
            font-size: 24px;
            cursor: default;
            font-weight: bold;
            margin-left: 10px;
        `}
    ${(props) =>
        props.red &&
        css`
            color: red;
        `}
`;

export default Span;

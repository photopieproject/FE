import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nav_logo, qrcode, nick, hello, room_name } =
        props;
    return (
        <StSpan
            onClick={onClick}
            nav_logo={nav_logo}
            qrcode={qrcode}
            nick={nick}
            hello={hello}
            room_name={room_name}
        >
            {children}
        </StSpan>
    );
};

const StSpan = styled.span`
    cursor: pointer;
    ${(props) =>
        props.nav_logo &&
        css`
            color: #302e2f;
            font-size: 30px;
            font-weight: bold;
            display: flex;
        `}
    ${(props) =>
        props.qrcode &&
        css`
            background-color: #ebe7e1;
            font-weight: bold;
            font-size: 15px;
            width: 200px;
            height: 35px;
            box-shadow: 7px 7px 0px 1px gray;
            text-align: center;
            line-height: 35px;
            margin-top: 10px;
            cursor: default;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
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
`;

export default Span;

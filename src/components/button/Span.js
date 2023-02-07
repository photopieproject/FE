import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nick, hello, roomName, red, txtBold } = props;
    return (
        <StSpan
            onClick={onClick}
            nick={nick}
            hello={hello}
            roomName={roomName}
            red={red}
            txtBold={txtBold}
        >
            {children}
        </StSpan>
    );
};

const StSpan = styled.span`
    cursor: pointer;
    ${(props) =>
        props.nick &&
        css`
            cursor: default;
            margin-left: 10px;
        `}
    ${(props) =>
        props.hello &&
        css`
            cursor: default;
            margin-right: 30px;
        `}
    ${(props) =>
        props.roomName &&
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
    ${(props) =>
        props.txtBold &&
        css`
            font-weight: bold;
            color: red;
        `}
`;

export default Span;

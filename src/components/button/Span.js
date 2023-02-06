import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nick, hello, roomName, red } = props;
    return (
        <StSpan
            onClick={onClick}
            nick={nick}
            hello={hello}
            roomName={roomName}
            red={red}
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
`;

export default Span;

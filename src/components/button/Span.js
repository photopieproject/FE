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
    font-family: "Nanum Myeongjo", serif;
    ${(props) =>
        props.nick &&
        css`
            cursor: auto;
            margin-left: 10px;
        `}
    ${(props) =>
        props.hello &&
        css`
            cursor: auto;
            margin-right: 30px;
        `}
    ${(props) =>
        props.roomName &&
        css`
            cursor: auto;
            font-size: 24px;
            font-weight: bold;
            margin-left: 10px;
        `}
    ${(props) =>
        props.txtBold &&
        css`
            cursor: auto;
            font-weight: bold;
            color: red;
        `}
`;

export default Span;

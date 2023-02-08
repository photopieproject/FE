import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nick, hello, roomName, red, bold, txtBold } =
        props;
    return (
        <StSpan
            onClick={onClick}
            nick={nick}
            hello={hello}
            roomName={roomName}
            red={red}
            bold={bold}
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
        props.bold &&
        css`
            cursor: auto;
            font-weight: bold;
            color: red;
        `}
    ${(props) =>
        props.txtBold &&
        css`
            font-family: "HELVETICA";
            cursor: auto;
            font-weight: bold;
            color: red;
        `}
`;

export default Span;

import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nav_logo, active_txt, cate_txt, qrcode } = props;
    return (
        <StSpan
            onClick={onClick}
            nav_logo={nav_logo}
            active_txt={active_txt}
            cate_txt={cate_txt}
            qrcode={qrcode}
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
        props.cate_txt &&
        css`
            font-size: 18px;
        `}
    ${(props) =>
        props.active_txt &&
        css`
            color: #478ba2;
            font-weight: bold;
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
`;

export default Span;

import styled, { css } from "styled-components";

const Span = (props) => {
    const { children, onClick, nav_logo, active_txt, cate_txt } = props;
    return (
        <StSpan
            onClick={onClick}
            nav_logo={nav_logo}
            active_txt={active_txt}
            cate_txt={cate_txt}
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
            color: #706fd3;
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
            color: #706fd3;
            font-weight: bold;
        `}
`;

export default Span;

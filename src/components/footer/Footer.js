import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <StDiv style={{ backgroundColor: "#fffaf2" }}>
            <StDiv footer_box>
                <StP copy_right>copyright ©️ PHOTO-PIE</StP>
                <StDiv agree_box>
                    <StP agree onClick={() => navigate("/terms")}>
                        이용약관
                    </StP>
                    <StP agree onClick={() => navigate("/private")}>
                        개인정보처리방침
                    </StP>
                    <StP agree onClick={() => navigate("/marketing")}>
                        마케팅
                    </StP>
                </StDiv>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.footer_box &&
        css`
            max-width: 1200px;
            width: 95%;
            height: 70px;
            display: flex;
            color: #868b94;
            align-items: flex-end;
            justify-content: space-between;
            font-size: 14px;
            margin: 0 auto 0px auto;
            padding: 12px 16px;
        `}
    ${(props) =>
        props.agree_box &&
        css`
            display: flex;
            gap: 30px;
        `}
`;

const StP = styled.p`
    margin: 0;

    ${(props) =>
        props.copy_right &&
        css`
            font-family: "Belleza", sans-serif;
            color: #3a3232;
            margin: 10px 0;
            font-size: 18px;
            font-weight: bold;
        `}
    ${(props) =>
        props.agree &&
        css`
            cursor: pointer;
            margin: 10px 0;
            text-align: right;
        `}
`;

export default Footer;

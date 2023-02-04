import styled, { css } from "styled-components";
// import { AiOutlineArrowRight } from "react-icons/ai";
import MainSlider from "../components/Main/MainSlider";
// import { useNavigate } from "react-router-dom";
const Main = () => {
    // const navigate = useNavigate();

    return (
        <StDiv MainBox>
            <MainSlider />
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.MainBox &&
        css`
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
`;

export default Main;

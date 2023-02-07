import styled from "styled-components";
import guideVideo from "../../assets/video/guide.mov";
import Button from "../button/Button";

const GuideModal = ({ setGuideModal }) => {
    const closeModalHandler = () => {
        setGuideModal(false);
    };
    return (
        <StDiv>
            <StVideo controls autoPlay muted loop>
                <source src={guideVideo}></source>
            </StVideo>
            <Button guideModalCancel onClick={closeModalHandler}>
                닫기
            </Button>
        </StDiv>
    );
};

const StDiv = styled.div`
    width: 800px;
    height: 422px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-25%, -25%);
    border: 3px solid #3a3232;
    border-radius: 10px;
`;
const StVideo = styled.video`
    width: 800px;
    height: 100%;
`;
export default GuideModal;

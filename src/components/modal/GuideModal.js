import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const GuideModal = ({ setGuideModal }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setGuideModal(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <StDiv ref={modalRef}>
            <StIframe
                title="guide"
                src="https://www.youtube.com/embed/GnHNPWCSCYY"
                width="800px"
                height="100%"
            ></StIframe>
        </StDiv>
    );
};

const StDiv = styled.div`
    width: 1000px;
    height: 550px;
    z-index: 999;
    position: absolute;
    top: 60%;
    left: 60%;
    transform: translate(-25%, -35%);
    border: 3px solid #3a3232;
    border-radius: 10px;
`;

const StIframe = styled.iframe`
    width: 1000px;
    height: 100%;
    border-radius: 10px;
    position: relative;
`;

export default GuideModal;

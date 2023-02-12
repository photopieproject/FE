import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import Private from "../../pages/Private";
import Terms from "../../pages/Terms";
import Marketing from "../../pages/Marketing";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
// import { __outUser } from "../../redux/modules/loginSlice";

const Footer = () => {
    const outside = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (outside && !outside.current.contains(event.target)) {
                setModalOpen1(false);
            }
            if (outside && !outside.current.contains(event.target)) {
                setModalOpen2(false);
            }
            if (outside && !outside.current.contains(event.target)) {
                setModalOpen3(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);

    const showModal1 = () => {
        setModalOpen1(true);
    };
    const showModal2 = () => {
        setModalOpen2(true);
    };
    const showModal3 = () => {
        setModalOpen3(true);
    };

    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/signup") return null;
    if (window.location.pathname === "/findid") return null;
    if (window.location.pathname === "/findpw") return null;
    if (window.location.pathname === "/resetpw") return null;
    if (window.location.pathname === "/sharepage") return null;

    const preparingHandler = () => {
        toast.error("현재 점검중입니다!", {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
            duration: 4000,
        });
    };

    // const outUserHandler = () => {
    //     __outUser()
    //         .then((res) => console.log("outUser res?", res))
    //         .catch((err) => console.log("outUser err?", err));
    // };

    return (
        <StDiv topBox ref={outside}>
            <StDiv footerBox>
                <StP copyRight>copyright ©️ PHOTO-PIE</StP>
                <StDiv agreeBox>
                    <StBtn agreeBtn onClick={showModal1}>
                        이용약관
                    </StBtn>
                    {modalOpen1 && (
                        <StDiv
                            ModalBg
                            ref={outside}
                            onClick={(e) => {
                                if (e.target === outside.current)
                                    setModalOpen1(false);
                            }}
                        >
                            <StDiv Modal>
                                <StBtn
                                    ModalCancleBtn
                                    onClick={() => setModalOpen1(false)}
                                >
                                    <MdClose color="#fffaf2" />
                                </StBtn>
                                <Terms />
                            </StDiv>
                        </StDiv>
                    )}
                    <StBtn agreeBtn onClick={showModal2}>
                        개인정보처리방침
                    </StBtn>
                    {modalOpen2 && (
                        <StDiv
                            ModalBg
                            ref={outside}
                            onClick={(e) => {
                                if (e.target === outside.current)
                                    setModalOpen2(false);
                            }}
                        >
                            <StDiv Modal>
                                <StBtn
                                    ModalCancleBtn
                                    onClick={() => setModalOpen2(false)}
                                >
                                    <MdClose color="#fffaf2" />
                                </StBtn>
                                <Private />
                            </StDiv>
                        </StDiv>
                    )}
                    <StBtn agreeBtn onClick={showModal3}>
                        마케팅
                    </StBtn>
                    {modalOpen3 && (
                        <StDiv
                            ModalBg
                            ref={outside}
                            onClick={(e) => {
                                if (e.target === outside.current)
                                    setModalOpen3(false);
                            }}
                        >
                            <StDiv Modal>
                                <StBtn
                                    ModalCancleBtn
                                    onClick={() => setModalOpen3(false)}
                                >
                                    <MdClose color="#fffaf2" />
                                </StBtn>
                                <Marketing />
                            </StDiv>
                        </StDiv>
                    )}
                    <StBtn agreeBtn onClick={preparingHandler}>
                        {/* <StBtn agreeBtn onClick={outUserHandler}> */}
                        회원탈퇴
                    </StBtn>
                </StDiv>
            </StDiv>
        </StDiv>
    );
};

const StBtn = styled.button`
    ${(props) =>
        props.agreeBtn &&
        css`
            border: 0;
            background-color: transparent;
            color: #7a7575;
            cursor: pointer;
        `}
    ${(props) =>
        props.ModalCancleBtn &&
        css`
            position: fixed;
            width: 25px;
            height: 25px;
            border-radius: 50px;
            margin: 10px 0 0 -15px;
            background-color: #3a3232;
            color: #fffaf2;
            display: flex;
            align-items: center;
        `}
`;

const StDiv = styled.div`
    ${(props) =>
        props.Modal &&
        css`
            width: 600px;
            height: 600px;
            padding: 5px 20px;
            border: 1px solid #3a3232;
            background-color: #faf7f2;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            flex-direction: column;
            overflow: scroll;
            display: flex;
            position: absolute;
            z-index: 999;
        `}
    ${(props) =>
        props.topBox &&
        css`
            background-color: #fffaf2;
        `}
  ${(props) =>
        props.footerBox &&
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
        props.agreeBox &&
        css`
            display: flex;
            gap: 30px;
        `}
`;

const StP = styled.p`
    margin: 0;

    ${(props) =>
        props.copyRight &&
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

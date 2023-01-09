import styled, { css } from "styled-components";
import { GiCherry } from "react-icons/gi";
import { FaTrophy, FaLeaf, FaLemon } from "react-icons/fa";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { SiNotion } from "react-icons/si";
import { IoDiamond } from "react-icons/io5";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const chan = "https://github.com/front-chan";
    const jungeun = "https://github.com/wjddms0501";
    const yeonju = "https://github.com/OhYeonJu";
    const crystal = "https://github.com/Hwangbambi";
    const suyeah = "https://github.com/010me";
    const notion =
        "https://www.notion.so/yjuu/2-e2370506d53d45df9a48424f42dc996b";

    const facebook = "https://www.facebook.com";
    const instagram = "https://www.instagram.com";
    const youtube = "https://www.youtube.com";

    const navigate = useNavigate();

    return (
        <StDiv footer_box>
            <StDiv copy_box>
                <StP copy_right>copyright ©️ Photo-Pie</StP>
                <div>
                    <Button
                        onClick={() => {
                            window.open(yeonju);
                        }}
                    >
                        <FaLeaf size="25" color="yellowgreen" />
                        <StP>실세 부팀장 _ 연듀곤듀</StP>
                    </Button>
                    <Button
                        onClick={() => {
                            window.open(crystal);
                        }}
                    >
                        <IoDiamond size="25" color="skyblue" />
                        <StP>회계 밤비쌤 _ Crystal 황</StP>
                    </Button>
                    <Button
                        onClick={() => {
                            window.open(suyeah);
                        }}
                    >
                        <FaLemon size="25" color="#fff200" />
                        <StP>대표 관리자 _ 레모나 킴</StP>
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            window.open(chan);
                        }}
                    >
                        <FaTrophy size="25" color="#004c8c" />
                        <StP>쩌리 최팀장 _ 최삐삐</StP>
                    </Button>
                    <Button
                        onClick={() => {
                            window.open(jungeun);
                        }}
                    >
                        <GiCherry size="25" color="red" />
                        <StP>잡심 부름꾼 _ 햅삐-졍</StP>
                    </Button>
                </div>
            </StDiv>
            <div>
                <Button
                    onClick={() => {
                        window.open(notion);
                    }}
                >
                    <SiNotion size="25" color="black" />
                </Button>
                <Button
                    onClick={() => {
                        window.open(facebook);
                    }}
                >
                    <BsFacebook size="25" color="#1877f2" />
                </Button>
                <Button
                    onClick={() => {
                        window.open(instagram);
                    }}
                >
                    <BsInstagram size="25" color="#fc00eb" />
                </Button>
                <Button
                    onClick={() => {
                        window.open(youtube);
                    }}
                >
                    <BsYoutube size="25" color="red" />
                </Button>
                <div>
                    <p onClick={() => navigate("/terms")}>이용약관</p>
                    <p onClick={() => navigate("/private")}>개인정보처리방침</p>
                    <p onClick={() => navigate("/marketing")}>마케팅</p>
                </div>
            </div>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.footer_box &&
        css`
            max-width: 1200px;
            width: 95%;
            height: 150px;
            display: flex;
            color: #868b94;
            align-items: flex-start;
            justify-content: space-between;
            font-size: 14px;
            margin: 0 auto 10px auto;
            padding: 12px 16px;
        `}
    ${(props) =>
        props.back_front_txt &&
        css`
            display: flex;
            justify-content: flex-start;
            margin-left: 10px;
            gap: 130px;
        `}
        ${(props) =>
        props.copy_box &&
        css`
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
        `}
`;

const StP = styled.p`
    margin: 0;

    ${(props) =>
        props.copy_right &&
        css`
            color: #706fd3;
            margin-left: -200px;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
        `}
`;

export default Footer;

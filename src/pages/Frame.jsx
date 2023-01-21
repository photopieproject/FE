import { useState } from "react";
import styled, { css } from "styled-components";
import frameBlack from "../assets/frame/frame_black.png";
import frameMint from "../assets/frame/frame_mint.png";
import framePink from "../assets/frame/frame_pink.png";
import framePupple from "../assets/frame/frame_pupple.png";
import frameWhiteV0 from "../assets/frame/frame_white_v0.png";
// import frameWhite from "../assets/frame/frame_white.jpeg";
// import frameWhiteV2 from "../assets/frame/frame_white_v2.png";
import frameBlackV2 from "../assets/frame/frame_black_v2.png";
import frameGraV1 from "../assets/frame/frame_gra_v1.png";
import frameGraV2 from "../assets/frame/frame_gra_v2.png";
import frameGraV3 from "../assets/frame/frame_gra_v3.png";
import frameGraV4 from "../assets/frame/frame_gra_v4.png";
import Button from "../components/button/Button";
import { BsPatchCheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
// import checkHeart from "../assets/svg/check-heart.svg";

const Frame = () => {
    const [chooseFrame, setChooseFrame] = useState([]);
    const navigate = useNavigate();
    const { roomId } = useParams();
    console.log(roomId);

    const oneColorFrame = [
        {
            name: "frame_black",
            img: frameBlack,
        },
        {
            name: "frame_mint",
            img: frameMint,
        },
        {
            name: "frame_pink",
            img: framePink,
        },
        {
            name: "frame_pupple",
            img: framePupple,
        },
        {
            name: "frame_white_v0",
            img: frameWhiteV0,
        },
        // {
        //     name: "frame_white_v2",
        //     img: frameWhiteV2,
        // },
        // {
        //     name: "frame_white",
        //     img: frameWhite,
        // },
    ];

    const patternColorFrame = [
        {
            name: "frame_black_v2",
            img: frameBlackV2,
        },
        {
            name: "frame_gra_v1",
            img: frameGraV1,
        },
        {
            name: "frame_gra_v2",
            img: frameGraV2,
        },
        {
            name: "frame_gra_v3",
            img: frameGraV3,
        },
        {
            name: "frame_gra_v4",
            img: frameGraV4,
        },
    ];

    const chooseFramehandler = (e) => {
        console.log(`${e.target.value} 선택되었습니다!`);
        setChooseFrame(e.target.value);
    };

    const chooseFrameCheckBtn = () => {
        console.log(`선택되었습니다!`);
    };

    return (
        <StDiv choose_frame>
            {/* 단색 프레임 */}
            <StH3>ONE COLOR</StH3>
            <StDiv frame_set>
                {oneColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.name}>
                        <StDiv frame_check>
                            <StInput
                                type="radio"
                                id={kind.name}
                                value={kind.name}
                                checked={chooseFrame === `${kind.name}`}
                                onChange={chooseFramehandler}
                                onClick={chooseFrameCheckBtn}
                            />
                            {/* <StImg src={kind.img} alt={kind.name} /> */}
                            {kind.name === "frame_white" ? (
                                <StImg f_white src={kind.img} alt={kind.name} />
                            ) : (
                                <StImg src={kind.img} alt={kind.name} />
                            )}
                            {chooseFrame === kind.name ? (
                                // <img src={checkHeart} alt="check" />
                                <BsPatchCheckFill
                                    size={80}
                                    style={{
                                        position: "absolute",
                                        top: "35%",
                                        left: "35%",
                                    }}
                                />
                            ) : null}
                        </StDiv>
                    </label>
                ))}
            </StDiv>

            {/* 패턴 프레임 */}
            <StH3>PATTERN COLOR</StH3>
            <StDiv frame_set>
                {patternColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.name}>
                        <StDiv frame_check>
                            <StInput
                                type="radio"
                                id={kind.name}
                                value={kind.name}
                                checked={chooseFrame === `${kind.name}`}
                                onChange={chooseFramehandler}
                            />
                            <StImg src={kind.img} alt={kind.name} />
                            {chooseFrame === kind.name ? (
                                // <img src={checkHeart} alt="check" />
                                <BsPatchCheckFill
                                    size={80}
                                    style={{
                                        position: "absolute",
                                        top: "35%",
                                        left: "35%",
                                    }}
                                />
                            ) : null}
                        </StDiv>
                    </label>
                ))}
            </StDiv>
            <Button
                start_camera
                onClick={() => navigate(`/photoshoot/${roomId}`)}
            >
                촬영 시작하기
            </Button>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.choose_frame &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.frame_set &&
        css`
            display: flex;
            gap: 20px;
        `}
    ${(props) =>
        props.frame_check &&
        css`
            position: relative;
        `}
`;

const StH3 = styled.h3`
    font-size: 30px;
    font-weight: bold;
    color: #478ba2;
    display: flex;
    align-items: center;
    color: #478ba2;
    background: none;
    border: none;
    padding: 12px 18px;
    position: relative;
    font-family: monospace;
    transition: linear 0.3s;
    margin-top: 30px;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateX(calc(100% + 4px));
        width: 45px;
        height: 45px;
        background-color: #eee8dc;
        border-radius: 50px;
        transition: transform 0.25s 0.25s cubic-bezier(0, 0, 0.5, 2),
            width 0.25s cubic-bezier(0, 0, 0.5, 2);
        z-index: -1;
    }
`;

const StImg = styled.img`
    width: 250px;
    margin: 5px;
    cursor: pointer;
    ${(props) =>
        props.f_white &&
        css`
            border: 1px solid black;
        `}
`;

const StInput = styled.input.attrs({ type: "radio" })`
    visibility: hidden;
    &:checked + img {
        border: 3px solid #213f76;
        border-radius: 20px;
        box-sizing: border-box;
    }
`;
export default Frame;

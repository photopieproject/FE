import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { __chooseFrame } from "../redux/modules/photoSlice";
// import checkHeart from "../assets/svg/check-heart.svg";

const Frame = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [frameNum, setFrameNum] = useState([]);
    const { roomId } = useParams();
    console.log(roomId);
    console.log("chooseFrame--->", frameNum);

    const oneColorFrame = [
        {
            name: "frame_black",
            img: frameBlack,
            frameNum: 1,
        },
        {
            name: "frame_mint",
            img: frameMint,
            frameNum: 2,
        },
        {
            name: "frame_pink",
            img: framePink,
            frameNum: 3,
        },
        {
            name: "frame_pupple",
            img: framePupple,
            frameNum: 4,
        },
        {
            name: "frame_white_v0",
            img: frameWhiteV0,
            frameNum: 5,
        },
    ];

    const patternColorFrame = [
        {
            name: "frame_black_v2",
            img: frameBlackV2,
            frameNum: 6,
        },
        {
            name: "frame_gra_v1",
            img: frameGraV1,
            frameNum: 7,
        },
        {
            name: "frame_gra_v2",
            img: frameGraV2,
            frameNum: 8,
        },
        {
            name: "frame_gra_v3",
            img: frameGraV3,
            frameNum: 9,
        },
        {
            name: "frame_gra_v4",
            img: frameGraV4,
            frameNum: 10,
        },
    ];

    // 오류 수정

    const chooseFramehandler = (e) => {
        console.log(`${e.target.value} 선택되었습니다!`);
        setFrameNum(e.target.value);
        console.log("frameNum--->", frameNum);
    };
    console.log("change after chooseFrame--->", frameNum);

    const chooseFrameCheckBtn = () => {
        console.log(`선택되었습니다!`);
        dispatch(__chooseFrame({ roomId, frameNum }))
            .then((res) => {
                console.log(res);
                if (res.payload.statusCode === 200) {
                    alert(res.payload.statusMsg);
                    navigate(`/photoshoot/${roomId}`);
                } else if (res.payload.response.status === 400) {
                    alert("frame을 선택해주세요!");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <StDiv choose_frame>
            {/* 단색 프레임 */}
            <StH3>ONE COLOR</StH3>
            <StDiv frame_set>
                {oneColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.frameNum}>
                        <StDiv frame_check>
                            <StInput
                                type="radio"
                                id={kind.name}
                                value={kind.frameNum}
                                checked={frameNum === `${kind.frameNum}`}
                                onChange={chooseFramehandler}
                            />
                            <StImg src={kind.img} alt={kind.name} />
                        </StDiv>
                    </label>
                ))}
            </StDiv>

            {/* 패턴 프레임 */}
            <StH3>PATTERN COLOR</StH3>
            <StDiv frame_set>
                {patternColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.frameNum}>
                        <StDiv frame_check>
                            <StInput
                                type="radio"
                                id={kind.name}
                                value={kind.frameNum}
                                checked={frameNum === `${kind.frameNum}`}
                                onChange={chooseFramehandler}
                            />
                            <StImg src={kind.img} alt={kind.name} />
                        </StDiv>
                    </label>
                ))}
            </StDiv>
            <Button
                start_camera
                onClick={() => chooseFrameCheckBtn(roomId, Number(frameNum))}
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
            width: 95%
            max-width: 1200px;
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
    font-family: "Belleza", sans-serif;
    font-size: 30px;
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
        border: 3px solid #3a3232;
        border-radius: 20px;
        box-sizing: border-box;
    }
`;
export default Frame;

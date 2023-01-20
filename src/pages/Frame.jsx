import { useState } from "react";
import styled, { css } from "styled-components";
import frameBlack from "../assets/frame_black.png";
import frameMint from "../assets/frame_mint.png";
import framePink from "../assets/frame_pink.png";
import framePupple from "../assets/frame_pupple.png";
import frameWhite from "../assets/frame_white.jpeg";
import frameBlackV2 from "../assets/frame_black_v2.png";
import frameGra from "../assets/frame_gra.png";
import Button from "../components/button/Button";

const Frame = () => {
    const [chooseFrame, setChooseFrame] = useState([]);

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
            name: "frame_white",
            img: frameWhite,
        },
    ];

    const patternColorFrame = [
        {
            name: "frame_black_v2",
            img: frameBlackV2,
        },
        {
            name: "frame_gra",
            img: frameGra,
        },
    ];

    const chooseFramehandler = (e) => {
        console.log(e.target.value);
        setChooseFrame(e.target.value);
    };

    return (
        <div>
            {/* 단색 프레임 */}
            <div>
                <h3>One Color</h3>
                {oneColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.name}>
                        <StInput
                            type="radio"
                            id={kind.name}
                            value={kind.name}
                            checked={chooseFrame === `${kind.name}`}
                            onChange={chooseFramehandler}
                        />
                        <StImg src={kind.img} alt={kind.name} />
                        {/* {kind.name === "frame_white" ? (
                            <StImg f_white src={kind.img} alt={kind.name} />
                        ) : (
                            <StImg src={kind.img} alt={kind.name} />
                        )} */}
                    </label>
                ))}
            </div>

            {/* 패턴 프레임 */}
            <div>
                <h3>Pattern Color</h3>
                {patternColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.name}>
                        <StInput
                            type="radio"
                            id={kind.name}
                            value={kind.name}
                            checked={chooseFrame === `${kind.name}`}
                            onChange={chooseFramehandler}
                        />
                        <StImg src={kind.img} alt={kind.name} />
                    </label>
                ))}
            </div>
            <Button start_camera>촬영 시작하기</Button>
        </div>
    );
};

const StDiv = styled.div`
    display: flex;
`;
const StImg = styled.img`
    width: 250px;
    margin: 5px;
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

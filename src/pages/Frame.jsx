import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import { __chooseFrame } from "../redux/modules/photoSlice";
import toast, { Toaster } from "react-hot-toast";
import { oneColorFrame, patternColorFrame } from "../components/frame/NewFrame";

const Frame = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [frameNum, setFrameNum] = useState([]);
    const { roomId } = useParams();

    const chooseFramehandler = (e) => {
        setFrameNum(e.target.value);
    };

    const chooseFrameCheckBtn = () => {
        dispatch(__chooseFrame({ roomId, frameNum }))
            .then((res) => {
                if (res.payload.statusCode === 200) {
                    toast.success(res.payload.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#3a3232",
                            color: "#fffaf2",
                        },
                        iconTheme: {
                            primary: "#fffaf2",
                            secondary: "#3a3232",
                        },
                        duration: 4000,
                    });
                    navigate(`/photoshoot/${roomId}`);
                } else if (res.payload.response.status === 400) {
                    toast.error("Frame을 선택해주세요!", {
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
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <StDiv chooseFrame>
            <Toaster />

            {/* 단색 프레임 */}
            <StH3>ONE COLOR</StH3>
            <StDiv frameSet>
                {oneColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.frameNum}>
                        <StDiv frameCheck>
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
            <StDiv frameSet>
                {patternColorFrame.map((kind) => (
                    <label htmlFor={kind.name} key={kind.frameNum}>
                        <StDiv frameCheck>
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
                startCamera
                onClick={() => chooseFrameCheckBtn(roomId, Number(frameNum))}
            >
                촬영 시작하기
            </Button>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.chooseFrame &&
        css`
            width: 95%
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.frameSet &&
        css`
            max-width: 1400px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        `}
    ${(props) =>
        props.frameCheck &&
        css`
            position: relative;
        `}
`;

const StH3 = styled.h3`
    font-family: "Belleza", sans-serif;
    font-size: 30px;
`;

const StImg = styled.img`
    width: 200px;
    margin: 5px;
    cursor: pointer;
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

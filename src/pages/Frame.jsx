import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import { __chooseFrame } from "../redux/modules/photoSlice";
import toast, { Toaster } from "react-hot-toast";
import {
    oneColorFrame,
    patternColorFrame,
    maxCounter,
} from "../components/frame/NewFrame";
import { useInput } from "../lib/utils/useInput";

const Frame = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { roomId } = useParams();
    const [frameNum, setFrameNum] = useInput();
    const [maxPeople, setMaxPeople] = useInput();

    const chooseFrameCheckBtn = () => {
        if (!maxPeople || !frameNum) {
            toast.error("인원 수 또는 Frame을 선택해주세요!", {
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
        dispatch(__chooseFrame({ roomId, frameNum, maxPeople }))
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
                    if (res.payload.data1.maxPeople === 1) {
                        navigate(`/onecamera/${roomId}`);
                    } else if (res.payload.data1.maxPeople === 2) {
                        navigate(`/twocamera/${roomId}`);
                    } else if (res.payload.data1.maxPeople === 4) {
                        navigate(`/fourcamera/${roomId}`);
                    }
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
            .catch((err) => {});
    };

    return (
        <StDiv chooseFrame>
            <Toaster />

            {/* 인원 수 고르기 */}
            <StH3>People</StH3>
            <StDiv countSet>
                {maxCounter.map((count) => (
                    <StLabel htmlFor={count.name} key={count.id}>
                        <UserCountRadio
                            type="radio"
                            id={count.name}
                            value={count.maxPeople}
                            checked={maxPeople === `${count.maxPeople}`}
                            onChange={setMaxPeople}
                        />
                        <StP maxPeople>{count.name}</StP>
                    </StLabel>
                ))}
            </StDiv>

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
                                onChange={setFrameNum}
                            />
                            <StImg
                                src={kind.img}
                                alt={kind.name}
                                // style={{ width: "200px", height: "300px" }}
                            />
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
                                onChange={setFrameNum}
                            />
                            <StImg
                                src={kind.img}
                                alt={kind.name}
                                // style={{ width: "200px", height: "300px" }}
                            />
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
        props.countSet &&
        css`
            width: 95%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
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

const StP = styled.p`
    font-weight: bold;
    font-size: 18px;
    ${(props) =>
        props.maxPeople &&
        css`
            cursor: pointer;
            margin: 0;
            text-align: center;
        `}
`;

const UserCountRadio = styled.input.attrs({ type: "radio" })`
    visibility: hidden;
    &:checked + p {
        border: 3px solid #3a3232;
        background-color: #3a3232;
        color: #fffaf2;
        border-radius: 20px;
        padding: 3px 10px;
        box-sizing: border-box;
    }
`;

const StLabel = styled.label`
    width: 100px;
`;

export default Frame;

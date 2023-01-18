import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { BiCopy } from "react-icons/bi";
import {
    BsCameraVideoFill,
    BsCameraVideoOffFill,
    BsFillMicFill,
    BsFillMicMuteFill,
} from "react-icons/bs";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RoomWaiting = () => {
    // let localVideo = document.getElementById("localVideo");
    // let remoteVideo = document.getElementById("remoteVideo");

    const navigate = useNavigate();
    const rooms = useSelector((state) => state.videos.videoRooms);
    // const rooms = useSelector((state) => state.videos.videoRooms.data);
    console.log("rooms: ", rooms);

    const copyClipBoard = async (roomCode) => {
        try {
            await navigator.clipboard.writeText(roomCode);
            alert("클립보드에 링크가 복사되었습니다");
        } catch (e) {
            alert("복사에 실패하였습니다");
        }
    };

    const videoRef = useRef(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 200, height: 300 },
                    audio: true,
                });
                videoRef.current.srcObject = stream;
            } catch (err) {
                console.log(err);
            }
        };
        getUserMedia();
    }, []);

    return (
        <div>
            <div>
                {/* <video id="localVideo" autoPlay width="480px"></video>
                <video id="remoteVideo" autoPlay width="480px"></video> */}
                <StDiv room_info>
                    <h2>Room Name: {rooms.roomName}</h2>
                    <p>
                        Room Code: {rooms.roomCode}{" "}
                        <BiCopy
                            onClick={() => copyClipBoard(rooms.roomCode)}
                            style={{ cursor: "pointer" }}
                        />
                    </p>
                </StDiv>
                <StDiv capture_area id="capture_area">
                    <StH3>Photo-Pie</StH3>
                    <StDiv picture_box id="picture-box">
                        <StDiv picture>
                            <video ref={videoRef} autoPlay playsInline />
                        </StDiv>
                        <StDiv picture>
                            화상채팅 친구1
                            <div>
                                <BsCameraVideoFill color="white" />
                                (<BsCameraVideoOffFill color="white" />)
                                <BsFillMicFill color="white" />
                                (<BsFillMicMuteFill color="white" />)
                            </div>
                        </StDiv>
                        <StDiv picture>
                            화상채팅 친구2
                            <div>
                                <BsCameraVideoFill color="white" />
                                (<BsCameraVideoOffFill color="white" />)
                                <BsFillMicFill color="white" />
                                (<BsFillMicMuteFill color="white" />)
                            </div>
                        </StDiv>
                        <StDiv picture>
                            화상채팅 친구3
                            <div>
                                <BsCameraVideoFill color="white" />
                                (<BsCameraVideoOffFill color="white" />)
                                <BsFillMicFill color="white" />
                                (<BsFillMicMuteFill color="white" />)
                            </div>
                        </StDiv>
                    </StDiv>
                </StDiv>
                <StDiv wait_btns>
                    <Button choose_frame onClick={() => navigate("/frame")}>
                        촬영하러 가기
                    </Button>
                </StDiv>
            </div>
        </div>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.capture_area &&
        css`
            background-color: rgb(0, 0, 0);
            width: 500px;
            height: 750px;
            margin-bottom: 20px;
        `}
    ${(props) =>
        props.picture_box &&
        css`
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
        `}
    ${(props) =>
        props.picture &&
        css`
            background-color: #478ba2;
            width: 200px;
            height: 300px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `}
        ${(props) =>
        props.room_info &&
        css`
            display: flex;
            justify-content: space-between;
            align-items: center;
        `}
            ${(props) =>
        props.wait_btns &&
        css`
            display: flex;
            justify-content: center;
        `}
`;

const StH3 = styled.h3`
    text-align: center;
    padding: 20px;
    color: white;
    font-size: 30px;
    margin: 0 0 15px 0;
`;

export default RoomWaiting;

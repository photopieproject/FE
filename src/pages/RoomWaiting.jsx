import React, { useRef, useState } from "react";
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

    // const [myStream, setMyStream] = useState("");
    const [muted, setMuted] = useState(false);
    const [cameraOff, setCameraOff] = useState(false);

    const myFace = document.getElementById("myFace");
    // const muteBtn = document.getElementById("mute");
    // const cameraBtn = document.getElementById("camera");
    const camerasSelect = document.getElementById("cameras");

    let myStream;
    let myPeerConnection;

    console.log("myStream----> ", myStream);
    const getCameras = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(
                (device) => device.kind === "videoinput"
            );
            console.log(myStream.getVideoTracks());

            const currentCamera = myStream.getVideoTracks()[0];

            console.log("devices---->", devices);
            console.log("cameras---->", cameras);

            cameras.forEach((camera) => {
                const option = document.createElement("option");
                option.value = camera.deviceId;
                option.innerText = camera.label;
                if (currentCamera.label === camera.label) {
                    option.selected = true;
                }
                camerasSelect.appendChild(option);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const getMedia = async (deviceId) => {
        const initialConstrains = {
            audio: true,
            video: { facingMode: "user" },
        };
        const cameraConstrains = {
            audio: true,
            video: { deviceId: { exact: deviceId } },
        };
        try {
            // 수정 예정
            myStream = await navigator.mediaDevices.getUserMedia(
                deviceId ? cameraConstrains : initialConstrains
            );
            console.log(myStream);
            myFace.srcObject = myStream;
            if (!deviceId) {
                await getCameras();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleMuteClick = () => {
        console.log(myStream.getAudioTracks());
        myStream
            .getAudioTracks()
            .forEach((track) => (track.enabled = !track.enabled));
        // !muted ? setMuted(!muted) : setMuted(muted);
        if (!muted) {
            // muteBtn.innerText = "Unmute";
            setMuted(!muted);
        } else {
            // muteBtn.innerText = "Mute";
            setMuted(muted);
        }
    };
    console.log(myStream);

    const handleCameraClick = () => {
        console.log(myStream.getVideoTracks());
        myStream
            .getVideoTracks()
            .forEach((track) => (track.enabled = !track.enabled));
        if (cameraOff) {
            setCameraOff(cameraOff);
        } else {
            setCameraOff(!cameraOff);
        }
    };

    const handleCameraChange = async () => {
        console.log(camerasSelect.value);
        await getMedia(camerasSelect.value);
        if (myPeerConnection) {
            console.log(myPeerConnection.getSenders());
            const videoTrack = myStream.getVideoTracks()[0];
            const videoSender = myPeerConnection
                .getSenders()
                .find((sender) => sender.track.kind === "video");
            console.log(videoSender);
            videoSender.replaceTrack(videoTrack);
        }
    };

    // useEffect(() => {
    //     getCameras();
    //     getMedia();
    // }, []);

    /*
    const [playing, setPlaying] = React.useState(undefined);

    const videoRef = React.useRef(null);

    const getWebCam = () => {
        try {
            const constraints = {
                video: true,
                audio: true,
            };
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((res) => console.log(res));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getWebCam((stream) => {
            setPlaying(true);
            videoRef.current.srcObject = stream;
        });
    }, []);

    const startOrStop = () => {
        if (playing) {
            const s = videoRef.current.srcObject;
            console.log("s--->", s);
            s.getTracks().forEach((track) => {
                track.stop();
            });
        } else {
            getWebCam((stream) => {
                setPlaying(true);
                videoRef.current.srcObject = stream;
            });
        }
        setPlaying(!playing);
    };
    */

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
                <div id="myStream">
                    <video
                        id="myFace"
                        autoPlay
                        playsInline
                        width={"200px"}
                        height={"300px"}
                        muted={muted}
                    />
                    <button id="mute" onClick={handleMuteClick}>
                        {/* {!muted ? setMuted(!muted) : setMuted(muted)} */}
                        {muted ? <BsFillMicMuteFill /> : <BsFillMicFill />}
                    </button>
                    <button id="camera" onClick={handleCameraClick}>
                        {cameraOff ? (
                            <BsCameraVideoFill />
                        ) : (
                            <BsCameraVideoOffFill />
                        )}
                    </button>
                    <select id="cameras" onChange={handleCameraChange}></select>
                    {/* <video
                        id="peerFace"
                        autoPlay
                        playsInline
                        width={"200px"}
                        height={"300px"}
                    /> */}
                </div>
                {/* <div style={{ width: "200px", height: "300px" }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        style={{ width: "200px", height: "300px" }}
                    />
                    <button color="warning" onClick={() => startOrStop()}>
                        {playing ? "Stop" : "Start"}
                    </button>
                </div> */}
                {/* <video id="localVideo" autoPlay width="480px"></video>
                <video id="remoteVideo" autoPlay width="480px"></video> */}
                <div>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        width={"200px"}
                        height={"300px"}
                    />
                    <button id="mute" muted={muted} onClick={handleMuteClick}>
                        {/* {!muted ? setMuted(!muted) : setMuted(muted)} */}
                        {!muted ? <BsFillMicMuteFill /> : <BsFillMicFill />}
                    </button>
                    <button id="camera" onClick={handleCameraClick}>
                        {cameraOff ? (
                            <BsCameraVideoFill />
                        ) : (
                            <BsCameraVideoOffFill />
                        )}
                    </button>
                    <select id="cameras" onChange={handleCameraChange}></select>
                </div>
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
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                width={"200px"}
                                height={"300px"}
                            />
                            <button
                                id="mute"
                                muted={muted}
                                onClick={handleMuteClick}
                            >
                                {/* {!muted ? setMuted(!muted) : setMuted(muted)} */}
                                {!muted ? (
                                    <BsFillMicMuteFill />
                                ) : (
                                    <BsFillMicFill />
                                )}
                            </button>
                            <button id="camera" onClick={handleCameraClick}>
                                {cameraOff ? (
                                    <BsCameraVideoFill />
                                ) : (
                                    <BsCameraVideoOffFill />
                                )}
                            </button>
                            {/* <div>
                                <BsCameraVideoFill color="white" />
                                (<BsCameraVideoOffFill color="white" />)
                                <BsFillMicFill color="white" />
                                (<BsFillMicMuteFill color="white" />)
                            </div> */}
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

import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BiCopy } from "react-icons/bi";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../components/OvVideo/UserVideoComponent";

const CameraTest = () => {
    // let localVideo = document.getElementById("localVideo");
    // let remoteVideo = document.getElementById("remoteVideo");

    const navigate = useNavigate();
    const rooms = useSelector((state) => state.videos.videoRooms);
    // const rooms = useSelector((state) => state.videos.videoRooms.data);
    console.log("rooms: ", rooms);

    const token = rooms.token;
    const nickname = rooms.nickname;
    const sessionId = rooms.sessionId;

    // const [OV, setOV] = useState('')
    const [session, setSession] = useState("");
    const [mySessionId, setMySessionId] = useState("");
    // const [initUserData, setInitUserData] = useState({
    //     mySessionId: channelId,
    //     myUserName: userInfo.nickname,
    // })
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [isConnect, setIsConnect] = useState(false);
    const [connectObj, setConnectObj] = useState("");
    const [otherClose, setOtherClose] = useState(false);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);

    console.log("mainSM --->", mainStreamManager);

    const onbeforeunload = (event) => {
        event.preventDefault();
        leaveSession();
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onbeforeunload);

        const connectSession = () => {
            const OV = new OpenVidu();

            let mySession = OV.initSession();
            setSession(mySession);
            console.log("세션--->", mySession);

            mySession.on("streamCreated", (event) => {
                let subscriber = mySession.subscribe(event.stream, undefined);
                let subscriberList = subscribers;
                subscriberList.push(subscriber);
                setSubscribers([...subscribers, ...subscriberList]);
                console.log("스트림 생성--->", subscribers.length, session);
                console.log("sub--->", subscriber);
                console.log("sub list--->", subscriberList);

                setIsConnect(true);
            });

            mySession.on("streamDestroyed", (event) => {
                setOtherClose(true);
            });

            mySession.on("connectionCreated", (event) => {
                console.log("connect--->", session, mySession);
                setConnectObj(event.connection);
            });

            mySession
                .connect(token, { clientData: nickname })
                .then(async () => {
                    console.log("connect token");
                    let devices = await OV.getDevices();
                    let videoDevices = devices.filter(
                        (device) => device.kind === "videoinput"
                    );

                    let publisher = OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: videoDevices[0].deviceId,
                        publishAudio: true,
                        publishVideo: { width: 200, height: 300 },
                        resolution: "200x300",
                        frameRate: 30,
                        insertMode: "APPEND",
                        mirror: false,
                    });

                    mySession.publish(publisher);
                    setMainStreamManager(publisher);
                    setPublisher(publisher);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        connectSession();

        return () => {
            window.removeEventListener("beforeunload", onbeforeunload);
            // chatClose()
        };
    }, []);

    const leaveSession = () => {
        session.disconnect();

        setSession(undefined);
        setSubscribers([]);
        setMySessionId("");
        setPublisher(undefined);
    };

    const copyClipBoard = async (roomCode) => {
        try {
            await navigator.clipboard.writeText(roomCode);
            alert("클립보드에 링크가 복사되었습니다");
        } catch (e) {
            alert("복사에 실패하였습니다");
        }
    };

    return (
        <div>
            <div>
                <StDiv room_info>
                    <h2>Room Name: {rooms.roomName}</h2>
                    <p>
                        초대코드 복사
                        <BiCopy
                            onClick={() => copyClipBoard(rooms.roomCode)}
                            style={{ cursor: "pointer" }}
                        />
                    </p>
                </StDiv>
                <StDiv capture_area id="capture_area">
                    <StH3>Photo-Pie</StH3>
                    <StDiv picture_box id="picture-box">
                        <StDiv picture></StDiv>
                        <StDiv picture></StDiv>
                        <StDiv picture></StDiv>
                        <StDiv picture></StDiv>
                    </StDiv>
                </StDiv>
                <StDiv wait_btns>
                    <Button
                        choose_frame
                        onClick={() => navigate(`/frame/${rooms.id}`)}
                    >
                        촬영하러 가기
                    </Button>
                </StDiv>
            </div>
            {subscribers.length > 0 ? (
                <div>
                    <div>
                        {publisher !== undefined ? (
                            <div>
                                <UserVideoComponent
                                    streamManager={mainStreamManager}
                                />
                                {subscribers.map((sub, i) => (
                                    <div key={i}>
                                        <UserVideoComponent
                                            streamManager={sub}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
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

export default CameraTest;

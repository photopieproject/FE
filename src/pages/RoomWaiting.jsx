import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BiCopy } from "react-icons/bi";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../components/OvVideo/UserVideoComponent";

const RoomWaiting = () => {
    // let localVideo = document.getElementById("localVideo");
    // let remoteVideo = document.getElementById("remoteVideo");

    const navigate = useNavigate();
    const rooms = useSelector((state) => state.videos.videoRooms);
    // const rooms = useSelector((state) => state);
    const roomInfo = useSelector((state) => state.videos.videoInfos[0]);
    const token = useSelector((state) => state.videos.videoInfos[0].token);
    const sessionId = useSelector(
        (state) => state.videos.videoInfos[0].sessionId
    );
    const role = useSelector((state) => state.videos.videoInfos[0].role);
    const nickname = rooms.nickname;

    console.log("sessionId--->", sessionId);
    console.log("token--->", token);
    console.log("role--->", role);
    console.log("rooms: ", rooms);
    console.log("roomInfo: ", roomInfo);

    // const [OV, setOV] = useState('')
    const [session, setSession] = useState("");
    const [mySessionId, setMySessionId] = useState("");
    // const [initUserData, setInitUserData] = useState({
    //     mySessionId: channelId,
    //     myUserName: userInfo.nickname,
    // })
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    // const [isConnect, setIsConnect] = useState(false);
    const [connectObj, setConnectObj] = useState("");
    const [otherClose, setOtherClose] = useState(false);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);

    console.log("mainSM --->", mainStreamManager);
    console.log("session--->", session);

    const onbeforeunload = (event) => {
        event.preventDefault();
        leaveSession();
    };

    // const sendCloseSignal = () => {
    //     session
    //         .signal({
    //             data: "true",
    //             to: [connectObj],
    //             type: "close",
    //         })
    //         .then(() => {
    //             console.log("종료시--->", session);
    //             leaveSession();
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // };

    // const sendContinueSignal = () => {
    //     session
    //         .signal({
    //             data: "true",
    //             to: [connectObj],
    //             type: "continue",
    //         })
    //         .then(() => console.log("진행중--->", session))
    //         .catch((err) => console.error(err));
    // };

    useEffect(() => {
        window.addEventListener("beforeunload", onbeforeunload);

        const connectSession = () => {
            const OV = new OpenVidu();

            let mysession = OV.initSession();
            setSession(mysession);
            console.log("세션--->", mysession);

            mysession.on("streamCreated", (event) => {
                let subscriber = mysession.subscribe(event.stream, undefined);
                let subscriberList = subscribers;
                subscriberList.push(subscriber);
                setSubscribers([...subscriberList]);
                // setSubscribers([...subscribers]);
                console.log("스트림 생성--->", subscribers.length, session);
                console.log("sub--->", subscriber);
                console.log("subs --->", subscribers);
                console.log("sub list --->", subscriberList);

                // setIsConnect(true);
                // dispatch(getChatInfoDB(sessionId))
            });

            mysession.on("streamDestroyed", (event) => {
                setOtherClose(true);
                // deleteSubscriber(event.stream.streamManager);
                console.log("event --->", event);
            });

            // mySession.on("signal:close", (event) => {
            //     console.log("시그날:close 세션--->", mySession);
            //     setOtherClose(true);
            // });

            // mySession.on("signal:continue", (event) => {
            //     console.log("시그날:continue--->", mySession);
            // });

            mysession.on("connectionCreated", (event) => {
                console.log("connect--->", mysession);
                setConnectObj(event.connection);
            });

            mysession
                .connect(token, { clientData: nickname })
                .then(async () => {
                    console.log("connect token");
                    let devices = await OV.getDevices();
                    let videoDevices = devices.filter(
                        (device) => device.kind === "videoinput"
                    );
                    console.log("video--->", videoDevices);

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

                    mysession.publish(publisher);
                    console.log("pub --->", publisher);
                    setMainStreamManager(publisher);
                    console.log("pub SM --->", publisher);
                    // setPublisher(publisher);
                    // console.log("set pub --->", publisher);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        connectSession();

        return () => {
            window.removeEventListener("beforeunload", onbeforeunload);
            chatClose();
        };
    }, []);

    const leaveSession = () => {
        session.disconnect();

        setSession(undefined);
        setSubscribers([]);
        setMySessionId("");
        setPublisher(undefined);
    };

    const chatClose = () => {
        // sendCloseSignal();
        setTimeout(leaveSession, 500);
    };

    const copyClipBoard = async (roomCode) => {
        try {
            await navigator.clipboard.writeText(roomCode);
            alert("클립보드에 링크가 복사되었습니다");
        } catch (e) {
            alert("복사에 실패하였습니다");
        }
    };

    console.log("subscriber array--->", subscribers);

    // const videoRef = useRef(null);

    // useEffect(() => {
    //     const getUserMedia = async () => {
    //         try {
    //             const stream = await navigator.mediaDevices.getUserMedia({
    //                 video: { width: 200, height: 300 },
    //                 audio: true,
    //             });
    //             videoRef.current.srcObject = stream;
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getUserMedia();
    // }, []);

    return (
        <div>
            <div>
                {/* <video id="localVideo" autoPlay width="480px"></video>
                <video id="remoteVideo" autoPlay width="480px"></video> */}
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
                    {subscribers.length > 0 ? (
                        <StDiv picture_box id="picture-box">
                            {publisher !== undefined ? (
                                <>
                                    <StDiv picture>
                                        <UserVideoComponent
                                            streamManager={mainStreamManager}
                                        />
                                    </StDiv>
                                    {subscribers.map((sub) => (
                                        <StDiv picture>
                                            <UserVideoComponent
                                                streamManager={sub}
                                            />
                                        </StDiv>
                                    ))}
                                </>
                            ) : null}
                        </StDiv>
                    ) : null}
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
        </div>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.capture_area &&
        css`
            background-color: rgb(0, 72, 255);
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

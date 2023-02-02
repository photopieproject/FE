import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
// import { IoCameraSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __takeFrame, __takePhoto } from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Count from "../components/Count/Count";
import { dataURLtoFile } from "../components/file/dataURLtoFile";
import { BiCopy } from "react-icons/bi";
import Button from "../components/button/Button";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../components/OvVideo/UserVideoComponent";
import { __outPhotoRoom } from "../redux/modules/videoSlice";
import Swal from "sweetalert2";

const PhotoShoot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();

    // const [showCount, setShowCount] = useState(false);

    const [photo_one, setPhoto_one] = useState("");
    const [photo_two, setPhoto_two] = useState("");
    const [photo_three, setPhoto_three] = useState("");
    const [photo_four, setPhoto_four] = useState("");

    const { roomId } = useParams();
    const rooms = useSelector((state) => state.photos.photoinfo.data1);
    console.log("rooms--->", rooms);

    useEffect(() => {
        dispatch(__takeFrame(roomId));
    }, [dispatch, roomId]);

    const videoRooms = useSelector((state) => state.videos.videoRooms);
    const roomInfo = useSelector((state) => state.videos.videoInfos[0]);
    const token = useSelector((state) => state.videos.videoInfos[0].token);
    const sessionId = useSelector(
        (state) => state.videos.videoInfos[0].sessionId
    );
    const role = useSelector((state) => state.videos.videoInfos[0].role);
    const nickname = videoRooms.nickname;

    console.log("sessionId--->", sessionId);
    console.log("token--->", token);
    console.log("role--->", role);
    console.log("videoRooms: ", videoRooms);
    console.log("roomInfo: ", roomInfo);

    const [session, setSession] = useState("");
    // const [mySessionId, setMySessionId] = useState("");
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    // const [isConnect, setIsConnect] = useState(false);
    // const [connectObj, setConnectObj] = useState("");
    // const [otherClose, setOtherClose] = useState(false);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);

    console.log("mainSM --->", mainStreamManager);
    console.log("session--->", session);

    const onbeforeunload = (event) => {
        console.log(event);
        event.preventDefault();
        event.returnValue = "";
        leaveSession();
    };

    // 수정 예정
    // const preventGoBack = () => {
    //     history.pushState(null, "", location.href);
    //     alert("방 나가기를 눌러주세요!");
    // };

    const outRoomsHandler = (roomId) => {
        Swal.fire({
            title: "방 나가기를 하면 연결이 끊어집니다",
            text: "다시 되돌릴 수 없습니다",
            icon: "warning",

            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
            cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
            confirmButtonText: "방 나가기", // confirm 버튼 텍스트 지정
            cancelButtonText: "그대로 있기", // cancel 버튼 텍스트 지정

            reverseButtons: true, // 버튼 순서 거꾸로
        }).then((result) => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) {
                // 만약 모달창에서 confirm 버튼을 눌렀다면
                dispatch(__outPhotoRoom(roomId)).then((res) => {
                    console.log("res--->", res);
                    if (res.payload.statusCode === 200) {
                        Swal.fire("Success", res.payload.statusMsg, "success");
                        navigate("/roomOpen");
                    } else if (res.payload.data.statusCode === 400) {
                        Swal.fire("Error", res.payload.data.statusMsg, "error");
                        navigate("/roomOpen");
                    }
                });
            }
        });
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onbeforeunload);
        // 수정 예정
        // window.addEventListener("popstate", preventGoBack);

        const connectSession = () => {
            const OV = new OpenVidu();

            let mysession = OV.initSession();
            setSession(mysession);
            console.log("세션--->", mysession);

            mysession.on("streamCreated", (event) => {
                let subscriber = mysession.subscribe(event.stream, undefined);
                if (!subscriber.videos[0]) {
                    let subscriberList = subscribers;
                    subscriberList.push(subscriber);
                    setSubscribers([...subscriberList]);
                    // setSubscribers([...subscribers, ...subscriberList]);
                    console.log("스트림 생성--->", subscribers.length, session);
                    console.log("sub--->", subscriber);
                    console.log("subs --->", subscribers);
                    console.log("sub list --->", subscriberList);
                }

                // setIsConnect(true);
                // dispatch(getChatInfoDB(sessionId))
            });

            // 나간 사람 삭제 안됨
            mysession.on("streamDestroyed", (event) => {
                event.preventDefault();
                // const delSub = event.stream.streamManager.stream.streamId;
                // delSub.stream.streamId
                // setOtherClose(true);
                // const filterSub = subscribers.filter(
                //     (sub) => sub.stream.streamId === delSub
                // );
                // setSubscribers(filterSub);
                // console.log("filter sub arr--->", subscribers);
                // sub !== event.stream.streamManager
                console.log("???", event.stream.streamManager);
                console.log("event --->", event);
            });

            mysession.on("connectionCreated", (event) => {
                console.log("connect--->", mysession);
                // setConnectObj(event.connection);
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
            // 수정 예정
            // window.removeEventListener("popstate", preventGoBack);
            chatClose();
        };
    }, []);

    const leaveSession = () => {
        session.disconnect();

        setSession(undefined);
        setSubscribers([]);
        // setMySessionId("");
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

    const onSubmitHandler_1 = () => {
        html2canvas(document.querySelector("#picture_1"))
            .then((canvas) => {
                let photo_one =
                    (canvas.toDataURL("image/jpg"), "photo_one.jpg");
                photo_one = photo_one.replace("data:image/jpg;base64,", "");
                //console.log(canvas.toDataURL(photo_one));
                setPhoto_one(canvas.toDataURL(photo_one));
                // saveAs(canvas.toDataURL("image/jpg"), "photo_one.jpg");
                // 사진을 저장함과 동시에 state에 넣어주기...
            })
            .then(() => {
                const file = dataURLtoFile(photo_one, "photo_one.jpg");
                // console.log(file);

                const photo_1 = new FormData();

                // photo_1.append("file", file === "" ? new File([], "") : file);
                photo_1.append("photo_1", file);

                // setShowCount(true);
                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_1 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                        }
                    );
                }, 3000);
            });
    };

    const onSubmitHandler_2 = () => {
        html2canvas(document.querySelector("#picture_2"))
            .then((canvas) => {
                let photo_two =
                    (canvas.toDataURL("image/jpg"), "photo_two.jpg");
                photo_two = photo_two.replace("data:image/jpg;base64,", "");
                //console.log(canvas.toDataURL(photo_two));
                setPhoto_two(canvas.toDataURL(photo_two));
                // saveAs(canvas.toDataURL("image/jpg"), "photo_two.jpg");
                // 사진을 저장함과 동시에 state에 넣어주기...
            })
            .then(() => {
                const file = dataURLtoFile(photo_two, "photo_two.jpg");
                // console.log(file);

                const photo_2 = new FormData();

                // photo_2.append("file", file === "" ? new File([], "") : file);
                photo_2.append("photo_2", file);

                // setShowCount(true);
                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_2 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                        }
                    );
                }, 3000);
            });
    };

    const onSubmitHandler_3 = () => {
        html2canvas(document.querySelector("#picture_3"))
            .then((canvas) => {
                let photo_three =
                    (canvas.toDataURL("image/jpg"), "photo_three.jpg");
                photo_three = photo_three.replace("data:image/jpg;base64,", "");
                //console.log(canvas.toDataURL(photo_three));
                setPhoto_three(canvas.toDataURL(photo_three));
                //saveAs(canvas.toDataURL("image/jpg"), "photo_three.jpg");
                // 사진을 저장함과 동시에 state에 넣어주기...
            })
            .then(() => {
                const file = dataURLtoFile(photo_three, "photo_three.jpg");
                // console.log(file);

                const photo_3 = new FormData();

                // photo_3.append("file", file === "" ? new File([], "") : file);
                photo_3.append("photo_3", file);

                // setShowCount(true);
                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_3 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                        }
                    );
                }, 3000);
            });
    };

    const onSubmitHandler_4 = () => {
        html2canvas(document.querySelector("#picture_4"))
            .then((canvas) => {
                let photo_four =
                    (canvas.toDataURL("image/jpg"), "photo_four.jpg");
                photo_four = photo_four.replace("data:image/jpg;base64,", "");
                //console.log(canvas.toDataURL(photo_four));
                setPhoto_four(canvas.toDataURL(photo_four));
                //saveAs(canvas.toDataURL("image/jpg"), "photo_four.jpg");
                // 사진을 저장함과 동시에 state에 넣어주기...
            })
            .then(() => {
                const file = dataURLtoFile(photo_four, "photo_four.jpg");
                // console.log(file);

                const photo_4 = new FormData();

                // photo_4.append("file", file === "" ? new File([], "") : file);
                photo_4.append("photo_4", file);

                // setShowCount(true);
                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_4 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                        }
                    );
                }, 3000);
            });
    };

    return (
        <StDiv photo_shoot>
            <StDiv capture_area>
                <StDiv frame_box>
                    <StImg src={rooms?.frameUrl} alt="frame url" />
                    {subscribers.length > 0 ? (
                        <StDiv picture_box id="picture-box">
                            {publisher !== undefined ? (
                                <>
                                    <StDiv picture id="picture_1">
                                        <UserVideoComponent
                                            streamManager={mainStreamManager}
                                        />
                                    </StDiv>
                                    <StDiv picture id="picture_2">
                                        <UserVideoComponent
                                            streamManager={subscribers[0]}
                                        />
                                    </StDiv>
                                    <StDiv picture id="picture_3">
                                        <UserVideoComponent
                                            streamManager={subscribers[1]}
                                        />
                                    </StDiv>
                                    <StDiv picture id="picture_4">
                                        <UserVideoComponent
                                            streamManager={subscribers[2]}
                                        />
                                    </StDiv>
                                </>
                            ) : null}
                        </StDiv>
                    ) : (
                        <StDiv picture_box id="picture-box">
                            <StDiv picture>대기중... </StDiv>
                            <StDiv picture>대기중...</StDiv>
                            <StDiv picture>대기중...</StDiv>
                            <StDiv picture>대기중...</StDiv>
                        </StDiv>
                    )}
                </StDiv>
            </StDiv>
            <StDiv down_btn>
                <StDiv room_info>
                    <h2>이곳의 이름은?</h2>
                    <h2>{videoRooms.roomName}</h2>
                    <p>
                        초대코드 복사
                        <BiCopy
                            onClick={() => copyClipBoard(videoRooms.roomCode)}
                            style={{ cursor: "pointer" }}
                        />
                    </p>
                </StDiv>
                {/* {showCount && (
                    <StDiv Count>
                        <Count />
                    </StDiv>
                )} */}
                <StDiv all_btn>
                    {role === "leader" ? (
                        // userCount 4명이기 전까지는 촬영시작하기 버튼만 보이기
                        <StDiv btn_box>
                            <Button
                                camera_btn
                                onClick={() => {
                                    onSubmitHandler_1(roomId);
                                }}
                            >
                                내꺼다이씌
                            </Button>
                            <Button
                                camera_btn
                                onClick={() => {
                                    onSubmitHandler_2(roomId);
                                }}
                            >
                                김치해새꺄
                            </Button>
                            <Button
                                camera_btn
                                onClick={() => {
                                    onSubmitHandler_3(roomId);
                                }}
                            >
                                다음나와이씌
                            </Button>
                            <Button
                                camera_btn
                                onClick={() => {
                                    onSubmitHandler_4(roomId);
                                }}
                            >
                                마지막김치해
                            </Button>
                        </StDiv>
                    ) : null}
                    <StDiv other_btn>
                        <Button
                            photo_trans
                            onClick={() => navigate(`/loading/${roomId}`)}
                        >
                            사진 전송하러 가기
                        </Button>
                        <Button
                            photo_trans
                            onClick={() => outRoomsHandler(roomId)}
                        >
                            방 나가기
                        </Button>
                    </StDiv>
                </StDiv>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.photo_shoot &&
        css`
            display: flex;
            align-items: center;
            gap: 20px;
        `}
    ${(props) =>
        props.capture_area &&
        css`
            background-color: #eee8dc;
            width: 500px;
            height: 750px;
            margin-bottom: 20px;
        `}
        ${(props) =>
        props.frame_box &&
        css`
            position: relative;
        `}
    ${(props) =>
        props.picture_box &&
        css`
            position: absolute;
            top: 85px;
            left: 0;
            z-index: 100;
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
        `}
    ${(props) =>
        props.picture &&
        css`
            width: 200px;
            height: 300px;
            text-align: center;
            line-height: 300px;
            font-size: 20px;
        `}
    ${(props) =>
        props.down_btn &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 160px;
            width: 300px;
            height: 750px;
        `}
    /* ${(props) =>
        props.room_info &&
        css`
            margin-bottom: 200px;
        `} */
    ${(props) =>
        props.Count &&
        css`
            width: 150px;
            height: 50px;
            display: flex;
        `}
        ${(props) =>
        props.all_btn &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;
        `}
        ${(props) =>
        props.btn_box &&
        css`
            width: 300px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
        `}
        ${(props) =>
        props.other_btn &&
        css`
            display: flex;
            flex-direction: column;
            gap: 10px;
        `}
`;

const StImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
`;

export default PhotoShoot;

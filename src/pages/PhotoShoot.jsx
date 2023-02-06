import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __takeFrame, __takePhoto } from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { dataURLtoFile } from "../components/file/dataURLtoFile";
import { BiCopy } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import Button from "../components/button/Button";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../components/OvVideo/UserVideoComponent";
import { __outPhotoRoom } from "../redux/modules/videoSlice";
import Swal from "sweetalert2";
import Span from "../components/button/Span";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";

const PhotoShoot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [photo_one, setPhoto_one] = useState("");
    const [photo_two, setPhoto_two] = useState("");
    const [photo_three, setPhoto_three] = useState("");
    const [photo_four, setPhoto_four] = useState("");

    const [oneDis, setOneDis] = useState(false);
    const [twoDis, setTwoDis] = useState(false);
    const [threeDis, setThreeDis] = useState(false);
    const [fourDis, setFourDis] = useState(false);

    const [saveDisabled, setSaveDisabled] = useState(true);

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
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);

    console.log("mainSM --->", mainStreamManager);
    console.log("session--->", session);

    const [number, setNumber] = useState(3);
    const number_ref = useRef(3);

    const outRoomsHandler = (roomId) => {
        Swal.fire({
            title: "방 나가기를 하면 연결이 끊어집니다",
            text: "다시 되돌릴 수 없습니다",
            icon: "warning",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "방 나가기",
            cancelButtonText: "그대로 있기",

            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(__outPhotoRoom(roomId)).then((res) => {
                    console.log("res--->", res);
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
                        });
                        navigate("/roomOpen");
                    } else if (res.payload.data.statusCode === 400) {
                        toast.error(res.payload.data.statusMsg, {
                            style: {
                                borderRadius: "10px",
                                background: "#fffaf2",
                                color: "#3a3232",
                            },
                            iconTheme: {
                                primary: "#3a3232",
                                secondary: "#fffaf2",
                            },
                        });
                        navigate("/roomOpen");
                    }
                });
            }
        });
    };

    const pageMoveHandler = () => {
        Swal.fire({
            title: "방장이 사진을 다 찍었나요?",
            text: "사진을 다 찍지 않았으면 사진이 저장되지 않습니다",
            icon: "warning",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "전송하러 가기",
            cancelButtonText: "그대로 있기",

            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("사진을 저장중입니다", {
                    style: {
                        borderRadius: "10px",
                        background: "#3a3232",
                        color: "#fffaf2",
                    },
                    iconTheme: {
                        primary: "#fffaf2",
                        secondary: "#3a3232",
                    },
                });
                navigate(`/loading/${roomId}`);
            }
        });
    };

    const onbeforeunload = (event) => {
        console.log(event);
        event.preventDefault();
        event.returnValue = "";
        leaveSession();
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onbeforeunload);

        const preventGoBack = () => {
            // change start
            window.history.pushState(null, "", window.location.href);
            toast.error("방 나가기를 눌러주세요!", {
                style: {
                    borderRadius: "10px",
                    background: "#fffaf2",
                    color: "#3a3232",
                },
                iconTheme: {
                    primary: "#3a3232",
                    secondary: "#fffaf2",
                },
            });
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", preventGoBack);

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
            window.removeEventListener("popstate", preventGoBack);
            window.removeEventListener("beforeunload", onbeforeunload);

            chatClose();
        };
    }, []);

    const leaveSession = () => {
        session.disconnect();

        setSession(undefined);
        setSubscribers([]);
        setPublisher(undefined);
    };

    const chatClose = () => {
        // sendCloseSignal();
        setTimeout(leaveSession, 500);
    };

    const copyClipBoard = async (roomCode) => {
        try {
            await navigator.clipboard.writeText(roomCode);
            toast.success("초대코드가 복사되었습니다!", {
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
        } catch (e) {
            toast.error("복사에 실패하였습니다!", {
                style: {
                    borderRadius: "10px",
                    background: "#fffaf2",
                    color: "#3a3232",
                },
                iconTheme: {
                    primary: "#3a3232",
                    secondary: "#fffaf2",
                },
            });
        }
    };

    console.log("subscriber array--->", subscribers);

    const onSubmitHandler_1 = () => {
        html2canvas(document.querySelector("#picture_1"))
            .then((canvas) => {
                let photo_one =
                    (canvas.toDataURL("image/jpg"), "photo_one.jpg");
                // photo_one = photo_one.replace("data:image/jpg;base64,", "");
                setPhoto_one(canvas.toDataURL(photo_one));
            })
            .then(() => {
                const file = dataURLtoFile(photo_one, "photo_one.jpg");

                const photo_1 = new FormData();

                photo_1.append("photo_1", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    console.log("number", number);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_1 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                            toast.success("1번 사진 촬영 완료!", {
                                icon: "📸",
                                style: {
                                    borderRadius: "10px",
                                    background: "#3a3232",
                                    color: "#fffaf2",
                                },
                                duration: 2000,
                            });
                            setOneDis(true);
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
                // photo_two = photo_two.replace("data:image/jpg;base64,", "");
                setPhoto_two(canvas.toDataURL(photo_two));
            })
            .then(() => {
                const file = dataURLtoFile(photo_two, "photo_two.jpg");

                const photo_2 = new FormData();

                photo_2.append("photo_2", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    console.log("number", number);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_2 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                            toast.success("2번 사진 촬영 완료!", {
                                icon: "📸",
                                style: {
                                    borderRadius: "10px",
                                    background: "#3a3232",
                                    color: "#fffaf2",
                                },
                                duration: 2000,
                            });
                            setTwoDis(true);
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
                setPhoto_three(canvas.toDataURL(photo_three));
            })
            .then(() => {
                const file = dataURLtoFile(photo_three, "photo_three.jpg");

                const photo_3 = new FormData();

                photo_3.append("photo_3", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    console.log("number", number);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_3 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                            toast.success("3번 사진 촬영 완료!", {
                                icon: "📸",
                                style: {
                                    borderRadius: "10px",
                                    background: "#3a3232",
                                    color: "#fffaf2",
                                },
                                duration: 2000,
                            });
                            setThreeDis(true);
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
                setPhoto_four(canvas.toDataURL(photo_four));
            })
            .then(() => {
                const file = dataURLtoFile(photo_four, "photo_four.jpg");

                const photo_4 = new FormData();

                photo_4.append("photo_4", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    console.log("number", number);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_4 })).then(
                        (res) => {
                            console.log("사진전송 res --->", res);
                            setFourDis(true);
                            toast.success("4번 사진 촬영 완료!", {
                                icon: "📸",
                                style: {
                                    borderRadius: "10px",
                                    background: "#3a3232",
                                    color: "#fffaf2",
                                },
                                duration: 2000,
                            });
                            setSaveDisabled(false);
                        }
                    );
                }, 3000);
            });
    };

    return (
        <StDiv photo_shoot>
            <Toaster />
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
                    <StDiv name_icon>
                        <MdMeetingRoom size={40} />
                        <Span room_name>{videoRooms.roomName}</Span>
                    </StDiv>
                    <StP
                        invite_code
                        onClick={() => copyClipBoard(videoRooms.roomCode)}
                    >
                        초대코드 복사
                        <BiCopy />
                    </StP>
                </StDiv>
                {role === "leader" ? (
                    <StDiv counter>
                        <StP counter_txt>
                            🚨 현재 방장에게만 촬영 버튼과
                            <br />
                            카운터 버튼이 보여집니다
                            <br />
                            숫자가 줄어들 때마다 화면에 보이는 숫자를
                            <br />큰 소리로 친구들에게 외쳐주세요!
                            <br />
                            <br />
                            혹시 숫자가 줄어들지 않으면
                            <br />
                            한번 더 클릭해주세요!
                        </StP>
                        <StP count_num>{number}</StP>
                    </StDiv>
                ) : null}
                <StDiv all_btn>
                    {role === "leader" ? (
                        // {role === "leader" && subscribers.length === 3 ? (
                        // userCount 4명이기 전까지는 촬영시작하기 버튼만 보이기
                        <StDiv btn_box>
                            <Button
                                camera_btn1
                                disabled={oneDis}
                                oneDis={oneDis}
                                onClick={() => {
                                    onSubmitHandler_1(roomId);
                                }}
                            >
                                나 촬영하기
                            </Button>
                            <Button
                                camera_btn2
                                disabled={twoDis}
                                twoDis={twoDis}
                                onClick={() => {
                                    onSubmitHandler_2(roomId);
                                }}
                            >
                                옆에 친구
                            </Button>
                            <Button
                                camera_btn3
                                disabled={threeDis}
                                threeDis={threeDis}
                                onClick={() => {
                                    onSubmitHandler_3(roomId);
                                }}
                            >
                                아래 친구
                            </Button>
                            <Button
                                camera_btn4
                                disabled={fourDis}
                                fourDis={fourDis}
                                onClick={() => {
                                    onSubmitHandler_4(roomId);
                                }}
                            >
                                대각선 친구
                            </Button>
                        </StDiv>
                    ) : null}
                    <StDiv other_btn>
                        {role === "leader" ? (
                            <Button
                                photo_trans
                                disabled={saveDisabled}
                                saveDisabled={saveDisabled}
                                onClick={pageMoveHandler}
                            >
                                사진 전송하러 가기
                            </Button>
                        ) : (
                            <Button photo_trans onClick={pageMoveHandler}>
                                사진 전송하러 가기
                            </Button>
                        )}
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
            /* gap: 10px; */
            width: 300px;
            height: 750px;
        `}
    /* ${(props) =>
        props.room_info &&
        css`
            margin-bottom: 200px;
        `} */
    ${(props) =>
        props.counter &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
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
        ${(props) =>
        props.name_icon &&
        css`
            display: flex;
            justify-content: center;
            align-items: center;
        `}
`;

const StImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
`;

const StP = styled.p`
    ${(props) =>
        props.invite_code &&
        css`
            border-radius: 10px;
            background-color: #3a3232;
            color: #fffaf2;
            width: 200px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
        `}
    ${(props) =>
        props.counter_txt &&
        css`
            margin: 0;
            padding: 0 10px;
            color: #3a3232;
            border: 1px solid #3a3232
            border-radius: 10px;
            text-align: center;
            font-size: 13px;
        `}
        ${(props) =>
        props.count_num &&
        css`
            margin: 10px 0 30px 0;
            font-size: 50px;
            font-weight: bold;
        `}
`;
export default PhotoShoot;

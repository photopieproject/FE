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

    const { roomId } = useParams();

    // 사진 각각 저장 관련
    const [photo_one, setPhoto_one] = useState("");
    const [photo_two, setPhoto_two] = useState("");
    const [photo_three, setPhoto_three] = useState("");
    const [photo_four, setPhoto_four] = useState("");

    // 버튼 각각 disabled 관련
    const [oneDis, setOneDis] = useState(false);
    const [twoDis, setTwoDis] = useState(false);
    const [threeDis, setThreeDis] = useState(false);
    const [fourDis, setFourDis] = useState(false);

    const [saveDisabled, setSaveDisabled] = useState(true);

    // OpenVidu 관련
    const [session, setSession] = useState("");
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);

    // 카운터 관련
    const [number, setNumber] = useState(3);
    const number_ref = useRef(3);

    useEffect(() => {
        dispatch(__takeFrame(roomId));
    }, [dispatch, roomId]);

    // 데이터 불러오기
    const rooms = useSelector((state) => state.photos.photoinfo.data1);
    const videoRooms = useSelector((state) => state.videos.videoRooms);
    const token = useSelector((state) => state.videos.videoInfos[0].token);
    const role = useSelector((state) => state.videos.videoInfos[0].role);
    const nickname = videoRooms.nickname;

    // 방 나가기 핸들러
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

    // 사진 전송하러 가기 버튼 핸들러
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

    // 새로고침 막기 핸들러
    const onbeforeunload = (event) => {
        event.preventDefault();
        event.returnValue = "";
        leaveSession();
    };

    // OpenVidu Connecting 관련
    useEffect(() => {
        window.addEventListener("beforeunload", onbeforeunload);

        // 뒤로 가기 버튼 비활성화 관련
        const preventGoBack = () => {
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

        // OpenVidu 서버 연결 관련
        const connectSession = () => {
            const OV = new OpenVidu();

            let mysession = OV.initSession();
            setSession(mysession);

            mysession.on("streamCreated", (event) => {
                let subscriber = mysession.subscribe(event.stream, undefined);
                if (!subscriber.videos[0]) {
                    let subscriberList = subscribers;
                    subscriberList.push(subscriber);
                    setSubscribers([...subscriberList]);
                }
            });

            // 나간 사람 삭제 안됨 에러 수정 해야 함
            mysession.on("streamDestroyed", (event) => {
                event.preventDefault();
            });

            // session 생성
            mysession.on("connectionCreated", (event) => {});

            // seisson 연결
            mysession
                .connect(token, { clientData: nickname })
                .then(async () => {
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

                    mysession.publish(publisher);
                    setMainStreamManager(publisher);
                })
                .catch((err) => {});
        };

        connectSession();

        return () => {
            window.removeEventListener("popstate", preventGoBack);
            window.removeEventListener("beforeunload", onbeforeunload);

            chatClose();
        };
    }, []);

    // 연결 해제 관련
    const leaveSession = () => {
        session.disconnect();

        setSession(undefined);
        setSubscribers([]);
        setPublisher(undefined);
    };

    // 방 종료 관련
    const chatClose = () => {
        setTimeout(leaveSession, 500);
    };

    // 초대 코드 복사 관련
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

    // 화면 스크린샷 및 server에 데이터 전송 관련 각 핸들러
    const onSubmitHandler_1 = () => {
        html2canvas(document.querySelector("#picture1"))
            .then((canvas) => {
                let photo_one =
                    (canvas.toDataURL("image/jpg"), "photo_one.jpg");
                setPhoto_one(canvas.toDataURL(photo_one));
            })
            .then(() => {
                const file = dataURLtoFile(photo_one, "photo_one.jpg");

                const photo_1 = new FormData();

                photo_1.append("photo_1", file);

                // 3초 뒤 촬영 시작 관련 카운터
                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                // 3초 후 서버에 데이터 전송
                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_1 })).then(
                        (res) => {
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
        html2canvas(document.querySelector("#picture2"))
            .then((canvas) => {
                let photo_two =
                    (canvas.toDataURL("image/jpg"), "photo_two.jpg");
                setPhoto_two(canvas.toDataURL(photo_two));
            })
            .then(() => {
                const file = dataURLtoFile(photo_two, "photo_two.jpg");

                const photo_2 = new FormData();

                photo_2.append("photo_2", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_2 })).then(
                        (res) => {
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
        html2canvas(document.querySelector("#picture3"))
            .then((canvas) => {
                let photo_three =
                    (canvas.toDataURL("image/jpg"), "photo_three.jpg");
                setPhoto_three(canvas.toDataURL(photo_three));
            })
            .then(() => {
                const file = dataURLtoFile(photo_three, "photo_three.jpg");

                const photo_3 = new FormData();

                photo_3.append("photo_3", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_3 })).then(
                        (res) => {
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
        html2canvas(document.querySelector("#picture4"))
            .then((canvas) => {
                let photo_four =
                    (canvas.toDataURL("image/jpg"), "photo_four.jpg");
                setPhoto_four(canvas.toDataURL(photo_four));
            })
            .then(() => {
                const file = dataURLtoFile(photo_four, "photo_four.jpg");

                const photo_4 = new FormData();

                photo_4.append("photo_4", file);

                const cameraCount = setInterval(() => {
                    number_ref.current -= 1;
                    setNumber(number_ref.current);
                    if (number_ref.current === 0) {
                        clearInterval(cameraCount);
                        setNumber((number_ref.current = 3));
                    }
                }, 1000);

                setTimeout(() => {
                    dispatch(__takePhoto({ roomId, formdata: photo_4 })).then(
                        (res) => {
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
        <StDiv photoShootBox>
            <Toaster />
            <StDiv captureArea>
                <StDiv frameBox>
                    <StImg src={rooms?.frameUrl} alt="frame url" />
                    {subscribers.length > 0 ? (
                        <StDiv pictureBox>
                            {/* {role === "leader" && publisher !== undefined ? ( */}
                            {/* <> */}
                            <StDiv picture id="picture1">
                                <UserVideoComponent
                                    streamManager={mainStreamManager}
                                />
                            </StDiv>
                            <StDiv picture id="picture2">
                                <UserVideoComponent
                                    streamManager={subscribers[0]}
                                />
                            </StDiv>
                            <StDiv picture id="picture3">
                                <UserVideoComponent
                                    streamManager={subscribers[1]}
                                />
                            </StDiv>
                            <StDiv picture id="picture4">
                                <UserVideoComponent
                                    streamManager={subscribers[2]}
                                />
                            </StDiv>
                            {/* </> */}
                            {/* ) : null} */}
                        </StDiv>
                    ) : (
                        <StDiv pictureBox>
                            <StDiv picture>대기중... </StDiv>
                            <StDiv picture>대기중...</StDiv>
                            <StDiv picture>대기중...</StDiv>
                            <StDiv picture>대기중...</StDiv>
                        </StDiv>
                    )}
                </StDiv>
            </StDiv>
            <StDiv downBtns>
                <StDiv setBox>
                    <StDiv nameIcon>
                        <MdMeetingRoom size={40} />
                        <Span roomName>{videoRooms.roomName}</Span>
                    </StDiv>
                    <StP
                        inviteCode
                        onClick={() => copyClipBoard(videoRooms.roomCode)}
                    >
                        초대코드 복사
                        <BiCopy />
                    </StP>
                    <StP counterTxt>
                        🚨 방에 처음 입장 시 대기중만 출력됩니다!
                        <br />
                        <Span txtBold>2명 이상 입장 후</Span> 서로 화면이
                        출력됩니다!
                        <br />
                        🚨 현재 <Span txtBold>방장에게만</Span> 촬영 버튼과
                        <br />
                        카운터 버튼이 보여집니다
                        <br />
                        🚨 <Span txtBold>버튼을 누르기 전</Span> 포즈를
                        취해주세요! <br /> 현재 버튼을 누르자마자 사진이
                        촬영됩니다 <br /> 오류 수정중에 있습니다 ㅠㅠ
                        <br />
                        🚨 숫자가 줄어들 때마다 화면에 보이는 숫자를
                        <br />
                        <Span txtBold>큰 소리로</Span> 친구들에게 외쳐주세요!
                        <br />
                        🚨 혹시 숫자가 줄어들지 않으면
                        <br />
                        <Span txtBold>한번 더 클릭</Span>해주세요!
                    </StP>
                </StDiv>
                {role === "leader" ? <StP countNum>{number}</StP> : null}
                <StDiv allBtn>
                    {role === "leader" ? (
                        <StDiv btnBox>
                            <Button
                                cameraBtn1
                                disabled={oneDis}
                                oneDis={oneDis}
                                onClick={() => {
                                    onSubmitHandler_1(roomId);
                                }}
                            >
                                나 촬영하기
                            </Button>
                            <Button
                                cameraBtn2
                                disabled={twoDis}
                                twoDis={twoDis}
                                onClick={() => {
                                    onSubmitHandler_2(roomId);
                                }}
                            >
                                옆에 친구
                            </Button>
                            <Button
                                cameraBtn3
                                disabled={threeDis}
                                threeDis={threeDis}
                                onClick={() => {
                                    onSubmitHandler_3(roomId);
                                }}
                            >
                                아래 친구
                            </Button>
                            <Button
                                cameraBtn4
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
                    <StDiv otherBtn>
                        {role === "leader" ? (
                            <Button
                                photoTrans
                                disabled={saveDisabled}
                                saveDisabled={saveDisabled}
                                onClick={pageMoveHandler}
                            >
                                사진 전송하러 가기
                            </Button>
                        ) : (
                            <Button photoTrans onClick={pageMoveHandler}>
                                사진 전송하러 가기
                            </Button>
                        )}
                        <Button
                            photoTrans
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
        props.photoShootBox &&
        css`
            display: flex;
            align-items: center;
            gap: 20px;
        `}
    ${(props) =>
        props.captureArea &&
        css`
            background-color: #eee8dc;
            width: 500px;
            height: 750px;
            margin-bottom: 20px;
        `}
        ${(props) =>
        props.frameBox &&
        css`
            position: relative;
        `}
    ${(props) =>
        props.pictureBox &&
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
        props.setBox &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
        `}
    ${(props) =>
        props.downBtns &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 300px;
            height: 750px;
        `}
    ${(props) =>
        props.counter &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.allBtn &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        `}
        ${(props) =>
        props.btnBox &&
        css`
            width: 300px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        `}
        ${(props) =>
        props.otherBtn &&
        css`
            display: flex;
            flex-direction: column;
            gap: 10px;
        `}
        ${(props) =>
        props.nameIcon &&
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
        props.inviteCode &&
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
        props.counterTxt &&
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
        props.countNum &&
        css`
            margin: 10px 0 30px 0;
            font-size: 50px;
            font-weight: bold;
        `}
`;
export default PhotoShoot;

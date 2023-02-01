import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __takeFrame, __takePhoto } from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { dataURLtoFile } from "../components/file/dataURLtoFile";
import { BiCopy } from "react-icons/bi";
import Button from "../components/button/Button";
import { __outPhotoRoom } from "../redux/modules/videoSlice";
import Swal from "sweetalert2";
import { useRef } from "react";

const CameraTest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    console.log("videoRooms: ", videoRooms);

    const copyClipBoard = async (roomCode) => {
        try {
            await navigator.clipboard.writeText(roomCode);
            alert("클립보드에 링크가 복사되었습니다");
        } catch (e) {
            alert("복사에 실패하였습니다");
        }
    };

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

    const outRoomsHandler = (roomId) => {
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
        <StDiv photo_shoot>
            <StDiv capture_area>
                <StDiv frame_box>
                    <h1>1인용 테스트</h1>
                    <StImg src={rooms?.frameUrl} alt="frame url" />
                    <StDiv picture_box id="picture-box">
                        <StDiv picture id="picture_1">
                            <video ref={videoRef} autoPlay playsInline />
                        </StDiv>
                        <StDiv picture id="picture_2">
                            <video ref={videoRef} autoPlay playsInline />
                        </StDiv>
                        <StDiv picture id="picture_3">
                            <video ref={videoRef} autoPlay playsInline />
                        </StDiv>
                        <StDiv picture id="picture_4">
                            <video ref={videoRef} autoPlay playsInline />
                        </StDiv>
                    </StDiv>
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
                    {/* userCount 4명이기 전까지는 촬영시작하기 버튼만 보이기 */}
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
                            다내꺼새꺄
                        </Button>
                        <Button
                            camera_btn
                            onClick={() => {
                                onSubmitHandler_3(roomId);
                            }}
                        >
                            또내꺼이씌
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

export default CameraTest;

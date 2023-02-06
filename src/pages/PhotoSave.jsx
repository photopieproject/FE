import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import { MdQrCode2, MdCloudDownload } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    __completePhoto,
    // __kakaoMsgSend,
    __qrcodeGet,
    __qrcodeSend,
} from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { __outPhotoRoom } from "../redux/modules/videoSlice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import { dataURLtoFile } from "../components/file/dataURLtoFile";
// import { KakaoTest } from "../components/Kakao/KakaoTest";

const PhotoSave = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams();

    const [photo_pie, setPhoto_pie] = useState("");

    const [qrcode, setQrcode] = useState("");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        toast.success(
            "현재 자동으로 이미지 생성이 되지 않아\n 아래 QR코드 생성 버튼을 꼭!\n✌️두 번 클릭해주세요!\n이미지 생성 완료 팝업이 뜨지 않으면\n버튼을 한 번 더 눌러주세요 ㅠㅠ\n빠르게 해결하겠습니다!\n 📷Photo-Pie",
            {
                style: {
                    borderRadius: "10px",
                    background: "#3a3232",
                    color: "#fffaf2",
                },
                iconTheme: {
                    primary: "#fffaf2",
                    secondary: "#3a3232",
                },
                duration: 7000,
            }
        );
    }, []);

    const onbeforeunload = (event) => {
        event.preventDefault();
        event.returnValue = "";
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onbeforeunload);

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
        return () => {
            window.removeEventListener("popstate", preventGoBack);
            window.removeEventListener("beforeunload", onbeforeunload);
        };
    }, []);

    useEffect(() => {
        dispatch(__completePhoto(roomId));
    }, [dispatch, roomId]);

    const roomInfo = useSelector((state) => state.photos.loadRoomInfo);
    const roomPhotos = useSelector((state) => state.photos.loadRoomInfo.data1);

    const qrcodeSend = () => {
        html2canvas(document.querySelector("#frameBox"))
            .then((canvas) => {
                let photo_pie =
                    (canvas.toDataURL("image/png"), "photo_pie.png");
                photo_pie = photo_pie.replace("data:image/jpg;base64,", "");
                setPhoto_pie(canvas.toDataURL(photo_pie));
            })
            .then(() => {
                const file = dataURLtoFile(photo_pie, "photo_pie.png");

                const completePhoto = new FormData();

                completePhoto.append("completePhoto", file);

                dispatch(
                    __qrcodeSend({ roomId, formdata: completePhoto })
                ).then((res) => {
                    toast.success("QR Code 이미지를 생성해보세요!", {
                        icon: "📸",
                        style: {
                            borderRadius: "10px",
                            background: "#3a3232",
                            color: "#fffaf2",
                        },
                        duration: 2000,
                    });
                });
            });
    };

    const pictureSaveHandler = () => {
        html2canvas(document.querySelector("#frameBox")).then((canvas) => {
            let completePhoto =
                (canvas.toDataURL("image/jpg"), "Photo-Pie.jpg");
            saveAs(canvas.toDataURL("image/jpg"), "Photo-Pie.jpg");
        });
    };

    function saveAs(uri, filename) {
        let link = document.createElement("a");
        if (typeof link.download === "string") {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }

    const outRoomsHandler = (roomId) => {
        Swal.fire({
            title: "방 나가기를 하면 \n사진을 저장할 수 없습니다",
            text: "재입장이 불가합니다",
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
                        navigate("/");
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
                        navigate("/");
                    }
                });
            }
        });
    };

    const qrcodeGetHandler = (roomId) => {
        Swal.fire({
            title: "QR Code 생성하기 버튼을 눌렀나요?",
            text: "안 누르셨다면 원활한 이용이 어려워요!",
            icon: "warning",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "눌렀어요!",
            cancelButtonText: "다시하기",

            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(__qrcodeGet(roomId))
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
                        } else if (res.payload.statusCode === 400) {
                            toast.error(res.payload.statusMsg, {
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
                        setQrcode(res.payload.data1);
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    // const [kakaoImg, setKakaoImg] = useState("");
    // console.log("kakao?", kakaoImg);

    // const kakaoUrlHandler = (roomId) => {
    //     dispatch(__kakaoMsgSend(roomId)).then((res) => {
    //         toast.success(
    //             "카톡이미지가 생성되었어요!\n카카오톡 전송하기를 눌러 친구들에게 공유해 보세요!",
    //             {
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#3a3232",
    //                     color: "#fffaf2",
    //                 },
    //                 iconTheme: {
    //                     primary: "#fffaf2",
    //                     secondary: "#3a3232",
    //                 },
    //                 duration: 4000,
    //             }
    //         );
    //     });
    // };

    const inspectionToast = () => {
        toast.success(
            "현재 기능 점검중입니다😭\n 빠른 시일 안에 해결하겠습니다!",
            {
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
            }
        );
    };

    return (
        <>
            <StDiv photoShoot>
                <Toaster />
                <StDiv captureArea>
                    <StDiv frameBox id="frameBox">
                        <StImg
                            abImg
                            src={`data:image/png;base64,${roomInfo.data2?.frameUrl}`}
                            alt="frame url"
                        />
                        <StDiv pictureBox>
                            {roomPhotos?.map((photo, i) => (
                                <StDiv picture key={i}>
                                    <StImg
                                        photoImg
                                        src={`data:image/png;base64,${photo}`}
                                        alt={`photo_${i + 1}`}
                                    />
                                </StDiv>
                            ))}
                        </StDiv>
                    </StDiv>
                </StDiv>
                <StDiv downBtns>
                    <StDiv qrcodeBox>
                        {!!qrcode ? (
                            <StImg
                                qrimg
                                src={`data:image/png;base64,${qrcode}`}
                                alt="QR Code"
                            />
                        ) : null}
                        <StDiv createQrcode>
                            <Button createImg onClick={qrcodeSend}>
                                <MdQrCode2 size={25} />
                                QR Code 생성하기
                            </Button>
                            <Button
                                qrcode
                                onClick={() => qrcodeGetHandler(roomId)}
                            >
                                <MdQrCode2 size={25} />
                                QR Code 불러오기
                            </Button>
                        </StDiv>
                    </StDiv>
                    <StDiv kakaoSendBox>
                        <Button
                            kakaoUrl
                            onClick={inspectionToast}
                            // onClick={() => kakaoUrlHandler(roomId)}
                        >
                            카톡이미지
                            <br /> 생성하기
                        </Button>
                        {/* <Button kakaoDown onClick={() => KakaoTest(kakaoImg)}> */}
                        <Button kakaoDown onClick={inspectionToast}>
                            카카오톡
                            <br /> 공유하기
                        </Button>
                    </StDiv>
                    <Button savePhoto onClick={pictureSaveHandler}>
                        <MdCloudDownload size={22} />
                        PC에 다운로드하기
                    </Button>
                    <Button photoTrans onClick={() => outRoomsHandler(roomId)}>
                        방 나가기
                    </Button>
                </StDiv>
            </StDiv>
        </>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.photoShoot &&
        css`
            display: flex;
            align-items: center;
            gap: 20px;
        `}
    ${(props) =>
        props.captureArea &&
        css`
            width: 500px;
            height: 750px;
            margin-bottom: 20px;
        `}
            ${(props) =>
        props.frameBox &&
        css`
            position: relative;
            width: 500px;
            height: 750px;
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
        `}
        ${(props) =>
        props.downBtns &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 300px;
        `}
        ${(props) =>
        props.qrcodeBox &&
        css`
            display: flex;
            flex-direction: column;
        `}
        ${(props) =>
        props.createQrcode &&
        css`
            display: flex;
            gap: 5px;
        `}
        ${(props) =>
        props.kakaoSendBox &&
        css`
            display: flex;
            gap: 5px;
        `}
`;

const StImg = styled.img`
    ${(props) =>
        props.abImg &&
        css`
            position: absolute;
            top: 0;
            left: 0;
        `}
    ${(props) =>
        props.photoImg &&
        css`
            width: 200px;
            height: 300px;
        `}
    ${(props) =>
        props.qrimg &&
        css`
            background-color: #fffaf2;
            border-radius: 10px;
            width: 200px;
            height: 200px;
            border: 1px solid gray;
            margin-bottom: 10px;
        `}
`;

export default PhotoSave;

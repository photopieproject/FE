import html2canvas from "html2canvas";
import $ from "jquery";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import Span from "../components/button/Span";
// import { RiKakaoTalkFill } from "react-icons/ri";
import { MdQrCode2, MdCloudDownload } from "react-icons/md";
import { ShareKakao } from "../components/Kakao/ShareKakao";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __completePhoto } from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { __outPhotoRoom } from "../redux/modules/videoSlice";
import Swal from "sweetalert2";

const PhotoSave = () => {
    console.log("Capture Start");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams();
    console.log(roomId);

    useEffect(() => {
        //카카오톡 sdk 추가
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        dispatch(__completePhoto(roomId));
    }, [dispatch, roomId]);

    const roomInfo = useSelector((state) => state.photos.loadRoomInfo);
    console.log("roomInfo --->", roomInfo);

    const roomPhotos = useSelector((state) => state.photos.loadRoomInfo.data1);
    console.log(roomPhotos);

    $(function () {
        $("#download").on("click", () => {
            html2canvas(document.querySelector("#capture_area")).then(
                (canvas) => {
                    saveAs(canvas.toDataURL("image/jpg"), "photo_pie.jpg");
                }
            );
        });
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
    });

    const outRoomsHandler = (roomId) => {
        dispatch(__outPhotoRoom(roomId)).then((res) => {
            console.log("res--->", res);
            if (res.payload.statusCode === 200) {
                Swal.fire("Success", res.payload.statusMsg, "success");
                navigate("/");
            } else if (res.payload.data.statusCode === 400) {
                Swal.fire("Error", res.payload.data.statusMsg, "error");
                navigate("/");
            }
        });
    };

    return (
        <>
            {/* <input type="radio" id="mono" />
            <label htmlFor="mono">흑백</label>
            <input type="radio" id="color" />
            <label htmlFor="color">뽀샤시</label> */}
            <StDiv photo_shoot>
                <StDiv capture_area id="capture_area">
                    <StDiv frame_box id="frame_box">
                        <StImg
                            abImg
                            src={roomInfo.data2?.frameUrl}
                            alt="frame url"
                        />
                        <StDiv picture_box>
                            {roomPhotos?.map((photo, i) => (
                                <StDiv picture key={i}>
                                    <StImg
                                        photo_img
                                        src={photo}
                                        alt={`photo_${i + 1}`}
                                    />
                                </StDiv>
                            ))}
                        </StDiv>
                    </StDiv>
                </StDiv>
                <StDiv down_btn>
                    <StDiv qrcode_box>
                        <StImg qrimg src="/image/qrcode.png" alt="QR Code" />
                        <Span qrcode>
                            <MdQrCode2 size={25} />
                            QR Code
                        </Span>
                    </StDiv>
                    <ShareKakao />
                    <button
                        style={{
                            borderRadius: "10px",
                            backgroundColor: "#402c00",
                            color: "white",
                            width: "200px",
                            height: "50px",
                            // fontWeight: "bold",
                            fontSize: "15px",
                            cursor: "pointer",
                            border: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "5px",
                        }}
                        id="download"
                    >
                        <MdCloudDownload size={22} />
                        PC에 다운로드하기
                    </button>
                    <Button photo_trans onClick={() => outRoomsHandler(roomId)}>
                        방 나가기
                    </Button>
                </StDiv>
            </StDiv>
        </>
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
            width: 500px;
            height: 750px;
            margin-bottom: 20px;
            position: relative;
        `}
        ${(props) => props.frame_box && css``}
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
            /* background-image: url("/image/2-8.jpg"); */
            /* background-position: center;
            background-size: cover; */
        `}
    ${(props) =>
        props.picture2 &&
        css`
            background-color: white;
            width: 200px;
            height: 300px;
            text-align: center;
            line-height: 300px;
            background-image: url("/image/2-6.jpg");
            background-position: center;
            background-size: cover;
        `}
    ${(props) =>
        props.picture3 &&
        css`
            background-color: white;
            width: 200px;
            height: 300px;
            text-align: center;
            line-height: 300px;
            background-image: url("/image/2-7.jpg");
            background-position: center;
            background-size: cover;
        `}
    ${(props) =>
        props.picture4 &&
        css`
            background-color: white;
            width: 200px;
            height: 300px;
            text-align: center;
            line-height: 300px;
            background-image: url("/image/2-5.jpg");
            background-position: center;
            background-size: cover;
        `}
        ${(props) =>
        props.down_btn &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            width: 300px;
        `}
        ${(props) =>
        props.qrcode_box &&
        css`
            display: flex;
            flex-direction: column;
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
        props.photo_img &&
        css`
            width: 200px;
            height: 300px;
        `}
    ${(props) =>
        props.qrimg &&
        css`
            width: 200px;
            height: 200px;
            border: 1px solid gray;
        `}
`;

export default PhotoSave;

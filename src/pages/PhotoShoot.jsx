import html2canvas from "html2canvas";
import $ from "jquery";
import styled, { css } from "styled-components";
import { IoCameraSharp } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __takePhoto } from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import Count from "../components/Count/Count";

const PhotoShoot = () => {
    const [photo_one, setPhoto_one] = useState("");
    const [photo_two, setPhoto_two] = useState("");
    const [photo_three, setPhoto_three] = useState("");
    const [photo_four, setPhoto_four] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const file = document.querySelector('input[type="file"]').files[0];

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   console.log(reader.result);
    // };

    const formdata1 = new FormData();
    // formdata1.append("file", file);
    // formdata1.append('image',photo_one, "image.jpg");
    // formdata1.append("roomId", roomId);
    formdata1.append("photo_one", photo_one);

    const formdata2 = new FormData();
    formdata2.append("photo_two", photo_two);

    const formdata3 = new FormData();
    formdata3.append("photo_three", photo_three);

    const formdata4 = new FormData();
    formdata4.append("photo_four", photo_four);

    const { roomId } = useParams();
    // const rooms = useSelector((state) => state);
    console.log("roomId:", roomId);

    // --
    const base64 =
        "data:image/png;base64,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";
    // Place your base64 url here.
    fetch(base64)
        .then((res) => res.blob())
        // .then((res) => console.log(res))
        .then((blob) => {
            const formD = new FormData();
            const file = new File([blob], "photo_one.jpeg");
            formD.append("image", file);
        });
    // Let's upload the file
    // Don't set contentType manually → https://github.com/github/fetch/issues/505#issuecomment-293064470
    const API_URL = `https://photo-pie.shop/api/photo/room/${roomId}/shoot`;
    fetch(API_URL, { method: "POST", body: "formD" })
        .then((res) => res.json())
        .then((res) => console.log(res));
    //

    // var img = document.querySelector("img"); // img 태그 객체

    // var bstr = atob(img.src.split(",")[1]);
    // var n = bstr.length;
    // var u8arr = new Uint8Array(n);

    // while (n--) {
    //   u8arr[n] = bstr.charCodeAt(n);
    // }

    // var file = new File([u8arr], "파일이름", { type: "mime" });

    // console.log(file);
    // console.log(file.size);

    //
    // function dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);

    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }

    //   return new File([u8arr], filename, { type: mime });
    // }

    // let timerId = setInterval(() => {
    //   console.log("2초마다 실행");
    // }, 2000);

    // setTimeout(() => {
    //   clearInterval(timerId);
    // }, 7000);

    // console.log(photo_one);

    //상욱
    //   function base64toFile(base_data, filename) {
    //     var arr = base_data.split(","),
    //       mime = arr[0].match(/:(.*?);/)[1],
    //       bstr = atob(arr[1]),
    //       n = bstr.length,
    //       u8arr = new Uint8Array(n);

    //     while (n--) {
    //       u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     console.log(filename);
    //     return new File([u8arr], filename, { type: mime });
    //   }

    // setPhoto_one(base64toFile(base64, 'photo_one.png'))

    const onSubmitHandler_1 = () => {
        // console.log(photo_one);

        // const formdata = new FormData();
        // formdata.append("photo_one", photo_one);

        console.log(formdata1);
        console.log(typeof formdata1);

        dispatch(__takePhoto({ roomId, formdata1 }));

        for (const pair of formdata1) {
            console.log(pair[0] + ", " + pair[1]);
        }
        // return () => clearTimeout(timerId);
    };

    const onSubmitHandler_2 = () => {
        console.log(photo_two);

        const formdata = new FormData();
        formdata.append("photo_two", photo_two);

        console.log(formdata);
        console.log(typeof formdata);

        // dispatch(__takePhoto(formdata));

        for (const pair of formdata) {
            console.log(pair[0] + ", " + pair[1]);
        }
    };

    const onSubmitHandler_3 = () => {
        console.log(photo_three);

        const formdata = new FormData();
        formdata.append("photo_three", photo_three);

        console.log(formdata);
        console.log(typeof formdata);

        // dispatch(__takePhoto(formdata));

        for (const pair of formdata) {
            console.log(pair[0] + ", " + pair[1]);
        }
    };

    const onSubmitHandler_4 = () => {
        console.log(photo_four);

        const formdata = new FormData();
        formdata.append("photo_four", photo_four);

        console.log(formdata);
        console.log(typeof formdata);

        // dispatch(__takePhoto(formdata));

        for (const pair of formdata) {
            console.log(pair[0] + ", " + pair[1]);
        }
    };

    console.log("Capture Start");

    // const onSubmitHandler = (roomId, formdata) => {
    //   dispatch(__takePhoto(roomId, formdata1));
    // };

    // $(function () {
    //   $("#pic_btn1").on("click", () => {
    //     html2canvas(document.querySelector("#picture_1")).then((canvas) => {
    //       // 수정할 곳 이미지가 formdata로 안넘어감
    //       let photo_one = (canvas.toDataURL("image/jpg"), "photo_one.jpg");
    //       photo_one = photo_one.replace("data:image/jpg;base64,", "");
    //       console.log(canvas.toDataURL(photo_one));
    //       console.log(photo_one);
    //       saveAs(canvas.toDataURL("image/jpg"), "photo_one.jpg");
    //       // 사진을 저장함과 동시에 state에 넣어주기...
    //     });
    //   });
    //   $("#pic_btn2").on("click", () => {
    //     html2canvas(document.querySelector("#picture_2")).then((canvas) => {
    //       saveAs(canvas.toDataURL("image/jpg"), "photo_two.jpg");
    //     });
    //   });
    //   $("#pic_btn3").on("click", () => {
    //     html2canvas(document.querySelector("#picture_3")).then((canvas) => {
    //       saveAs(canvas.toDataURL("image/jpg"), "photo_three.jpg");
    //     });
    //   });
    //   $("#pic_btn4").on("click", () => {
    //     html2canvas(document.querySelector("#picture_4")).then((canvas) => {
    //       saveAs(canvas.toDataURL("image/jpg"), "photo_four.jpg");
    //     });
    //   });
    //   $("#download").on("click", () => {
    //     html2canvas(document.querySelector("#capture_area")).then((canvas) => {
    //       saveAs(canvas.toDataURL("image/jpg"), "photo-pie.jpg");
    //     });
    //   });

    //   function saveAs(uri, filename) {
    //     let link = document.createElement("a");
    //     if (typeof link.download === "string") {
    //       link.href = uri;
    //       link.download = filename;
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     } else {
    //       window.open(uri);
    //     }

    //     // dispatch(__takePhoto({ roomId, formdata1 }));
    //     // $.ajax({
    //     //     type: "post",
    //     //     data: {
    //     //         roomId: roomId,
    //     //         formdata1: photo_one,
    //     //     },
    //     //     dataType: "multipart/form-data",
    //     //     url: `https://photo-pie.shop/api/photo/room/${roomId}/shoot`,
    //     //     success: function (data) {
    //     //         console.log(data);
    //     //     },
    //     //     error: function (a, b, c) {
    //     //         alert("error");
    //     //     },
    //     // });
    //   }
    // });

    $(function () {
        $("#pic_btn1").on("click", () => {
            html2canvas(document.querySelector("#picture_1")).then((canvas) => {
                // 수정할 곳 이미지가 formdata로 안넘어감
                let photo_one =
                    (canvas.toDataURL("image/jpg"), "photo_one.jpg");
                photo_one = photo_one.replace("data:image/jpg;base64,", "");
                console.log(canvas.toDataURL(photo_one));
                console.log(photo_one);
                saveAs(canvas.toDataURL("image/jpg"), "photo_one.jpg");
                // 사진을 저장함과 동시에 state에 넣어주기...
            });
        });

        $("#pic_btn2").on("click", () => {
            html2canvas(document.querySelector("#picture_2")).then((canvas) => {
                saveAs(canvas.toDataURL("image/jpg"), "photo_two.jpg");
            });
        });

        $("#pic_btn3").on("click", () => {
            html2canvas(document.querySelector("#picture_3")).then((canvas) => {
                saveAs(canvas.toDataURL("image/jpg"), "photo_three.jpg");
            });
        });

        $("#pic_btn4").on("click", () => {
            html2canvas(document.querySelector("#picture_4")).then((canvas) => {
                saveAs(canvas.toDataURL("image/jpg"), "photo_four.jpg");
            });
        });

        $("#download").on("click", () => {
            html2canvas(document.querySelector("#capture_area")).then(
                (canvas) => {
                    saveAs(canvas.toDataURL("image/jpg"), "photo-pie.jpg");
                }
            );
        });

        function saveAs(uri, filename) {
            // timerId = setTimeout(() => {
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

            // dispatch(__takePhoto({ roomId, formdata1 }));
            // $.ajax({
            //     type: "post",
            //     data: {
            //         roomId: roomId,
            //         formdata1: photo_one,
            //     },
            //     dataType: "multipart/form-data",
            //     url: `https://photo-pie.shop/api/photo/room/${roomId}/shoot`,
            //     success: function (data) {
            //         console.log(data);
            //     },
            //     error: function (a, b, c) {
            //         alert("error");
            //     },
            // });
            dispatch(__takePhoto({ roomId, formdata1 }));
            // base64toFile(photo_one, "photo_one.png");
            // }, 1000);
        }
    });

    // useEffect(() => {
    //   const timerId = setTimeout(() => {
    //     //do something ...
    //   }, 1000);
    //   return () => clearTimeout(timerId);
    // }, []);

    // const [muted, setMuted] = useState(false);
    // const [cameraOff, setCameraOff] = useState(false);

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
            <StDiv capture_area id="capture_area">
                <StH3>Photo-Pie</StH3>
                <StDiv picture_box id="picture-box">
                    <StDiv picture id="picture_1">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            // width={"200px"}
                            // height={"300px"}
                            // muted={!muted}
                            // hidden={!cameraOff}
                        />
                    </StDiv>
                    <StDiv picture id="picture_2">
                        picture_2
                    </StDiv>
                    <StDiv picture id="picture_3">
                        picture_3
                    </StDiv>
                    <StDiv picture id="picture_4">
                        picture_4
                    </StDiv>
                </StDiv>
            </StDiv>
            <StDiv down_btn>
                <Count />
                <button
                    style={{
                        backgroundColor: "#ebe7e1",
                        fontWeight: "bold",
                        fontSize: "15px",
                        width: "200px",
                        height: "35px",
                        boxShadow: "7px 7px 0px 1px gray",
                        cursor: "pointer",
                        border: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                    }}
                    id="download"
                >
                    <IoCameraSharp size={20} />
                    촬영하기
                </button>
                <button
                    id="pic_btn1"
                    onClick={() => {
                        onSubmitHandler_1(roomId, formdata1);
                    }}
                >
                    내 촬영하기
                </button>
                <button id="pic_btn2" onClick={() => onSubmitHandler_2}>
                    친구1
                </button>
                <button id="pic_btn2" onClick={() => onSubmitHandler_3}>
                    친구2
                </button>
                <button id="pic_btn2" onClick={() => onSubmitHandler_4}>
                    친구3
                </button>
                <button onClick={() => navigate(`/loading/${roomId}`)}>
                    사진 전송하러 가기
                </button>
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
            background-color: white;
            width: 200px;
            height: 300px;
            text-align: center;
            line-height: 300px;
        `}
        ${(props) =>
        props.down_btn &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 300px;
        `}
`;

const StH3 = styled.h3`
    text-align: center;
    padding: 20px;
    color: white;
    font-size: 30px;
    margin: 0 0 15px 0;
`;

export default PhotoShoot;

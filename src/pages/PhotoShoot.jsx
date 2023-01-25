import html2canvas from "html2canvas";
import $ from "jquery";
import styled, { css } from "styled-components";
import { IoCameraSharp } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __takeFrame, __takePhoto } from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import Count from "../components/Count/Count";
import { apis } from "../lib/axios";

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const PhotoShoot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [photo_one, setPhoto_one] = useState("");
  const [photo_two, setPhoto_two] = useState("");
  const [photo_three, setPhoto_three] = useState("");
  const [photo_four, setPhoto_four] = useState("");
  const [countDisabled, setCountDisabled] = useState(false);

  console.log(photo_one);

  const { roomId } = useParams();
  const rooms = useSelector((state) => state.photos.photoinfo);
  console.log("roomId:", roomId);
  console.log("rooms--->", rooms);

  useEffect(() => {
    dispatch(__takeFrame(roomId));
  }, [dispatch, roomId]);

  const formdata1 = new FormData();
  // formdata1.append("file", file);
  // formdata1.append('image',photo_one, "image.jpg");
  // formdata1.append("roomId", roomId);
  formdata1.append("photo_one", photo_one);

  //   const formdata2 = new FormData();
  //   formdata2.append("photo_two", photo_two);

  //   const formdata3 = new FormData();
  //   formdata3.append("photo_three", photo_three);

  //   const formdata4 = new FormData();
  //   formdata4.append("photo_four", photo_four);

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

  $(function () {
    $("#pic_btn1").on("click", () => {
      html2canvas(document.querySelector("#picture_1")).then((canvas) => {
        // 수정할 곳 이미지가 formdata로 안넘어감
        let photo_one = (canvas.toDataURL("image/jpg"), "photo_one.jpg");
        photo_one = photo_one.replace("data:image/jpg;base64,", "");
        console.log(canvas.toDataURL(photo_one));
        // setPhoto_one(canvas.toDataURL(photo_one));
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
      html2canvas(document.querySelector("#capture_area")).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), "photo-pie.jpg");
      });
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
      console.log(photo_one);
      //   dispatch(__takePhoto({ roomId, formdata1 }));
      // base64toFile(photo_one, "photo_one.png");
      // }, 1000);
    }
  });

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
        <img src={rooms.frameUrl} alt="frame url" />
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
          // onClick={ClickCountHandler}
          disabled={countDisabled}
          msgDisabled={countDisabled}
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

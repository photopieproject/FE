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

  console.log(photo_one);

  const { roomId } = useParams();
  const rooms = useSelector((state) => state.photos.photoinfo);

  useEffect(() => {
    dispatch(__takeFrame(roomId));
  }, [dispatch, roomId]);

  const onSubmitHandler_1 = () => {
    //dispatch(__takePhoto({ roomId,  }));
    html2canvas(document.querySelector("#picture_1"))
      .then((canvas) => {
        // 수정할 곳 이미지가 formdata로 안넘어감
        let photo_one = (canvas.toDataURL("image/jpg"), "photo_one.jpg");
        photo_one = photo_one.replace("data:image/jpg;base64,", "");
        //console.log(canvas.toDataURL(photo_one));
        setPhoto_one(canvas.toDataURL(photo_one));

        //saveAs(canvas.toDataURL("image/jpg"), "photo_one.jpg");
        // 사진을 저장함과 동시에 state에 넣어주기...
      })
      .then(() => {
        const file = dataURLtoFile(photo_one, "photo_one.jpg");
        console.log(file);

        const formdata = new FormData();

        formdata.append("file", file);

        dispatch(__takePhoto({ roomId, photo_one }));
      });
  };

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
  }

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
            onSubmitHandler_1(roomId);
          }}
          // onClick={ClickCountHandler}
          // disabled={countDisabled}
          // msgDisabled={countDisabled}
        >
          내 촬영하기
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

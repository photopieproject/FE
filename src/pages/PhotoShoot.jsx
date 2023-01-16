import html2canvas from "html2canvas";
import $ from "jquery";
import styled, { css } from "styled-components";
import { IoCameraSharp } from "react-icons/io5";
import { useState } from "react";

const PhotoShoot = () => {
  const [photo, setPhoto] = useState({
    roomCode: "",
    photoNum: "",
  });
  const [cap_Photo, setCap_Photo] = useState("");
  let form = new FormData();

  const shootPhoto = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    setPhoto(file);
    // let form = new FormData();
    form.append("file", file);
    console.log(form);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCap_Photo(reader.result);
    };
  };

  console.log("Capture Start");

  $(function () {
    $("#pic_btn1").on("click", () => {
      html2canvas(document.querySelector("#picture_1")).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), "picture_1.jpg");
      });
    });
    $("#pic_btn2").on("click", () => {
      html2canvas(document.querySelector("#picture_2")).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), "picture_2.jpg");
      });
    });
    $("#pic_btn3").on("click", () => {
      html2canvas(document.querySelector("#picture_3")).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), "picture_3.jpg");
      });
    });
    $("#pic_btn4").on("click", () => {
      html2canvas(document.querySelector("#picture_4")).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), "picture_4.jpg");
      });
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

  // let myStream;
  // let muted = false;
  // let cameraOff = false;

  // const getCameras = async () => {
  //     try {
  //         const devices = await navigator.mediaDevices.enumerateDevices();
  //         const cameras = devices.filter((device) => device.kind === 'videoinput')
  //         const currentCamera = myStream.getVideoTracks()[0];

  //         cameras.foreEach((camera) => {
  //             const option = document.createElement('option');
  //             option.value = camera.deviceId;
  //             option.innerText = camera.label;
  //             if(currentCamera.label === camera.label) {
  //                 option.selected = true;
  //             }
  //             camerasSelect.appendCh
  //         })
  //     }
  // }

  return (
    <StDiv photo_shoot>
      <StDiv capture_area id="capture_area">
        <StH3>Photo-Pie</StH3>
        <StDiv picture_box id="picture-box">
          {/* <StDiv picture id="myStream">
                            <video
                                id="myFace"
                                autoPlay
                                // playsInline
                                width={200}
                                height={250}
                            />
                            <button id="mute">Mute</button>
                            <button id="camera">Camera Off</button>
                            <select id="cameras">
                                <option value="device">Choose Camera</option>
                            </select>
                        </StDiv> */}
          <StDiv picture id="picture_1">
            picture_1<button id="pic_btn1">나 촬영</button>
          </StDiv>
          <StDiv picture id="picture_2">
            picture_2<button id="pic_btn2">친구1</button>
          </StDiv>
          <StDiv picture id="picture_3">
            picture_3<button id="pic_btn2">친구2</button>
          </StDiv>
          <StDiv picture id="picture_4">
            picture_4<button id="pic_btn2">친구3</button>
          </StDiv>
        </StDiv>
      </StDiv>
      <StDiv down_btn>
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

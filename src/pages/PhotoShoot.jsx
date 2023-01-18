import html2canvas from "html2canvas";
import $ from "jquery";
import styled, { css } from "styled-components";
import { IoCameraSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __takePhoto } from "../redux/modules/photoSlice";
import { useParams } from "react-router-dom";

const PhotoShoot = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  // const rooms = useSelector((state) => state);
  console.log("roomId:", roomId);

  // const imgRef = useRef();
  // const [post, setPost] = useState();

  // const onChangeImage_1 = (event) => {
  //   const file = event.target.files[0];
  //   setPhoto_one(file);

  //   const reader = new FileReader();
  //   // const file = imgRef.current.files[0];
  //   console.log(file);
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     // const image = reader.result;
  //     setPost({
  //       ...post,
  //       imageUrl: reader.result,
  //     });
  //   };
  // };

  // 유튜브 비디오
  // const onChangeVideo = (event) => {
  //   const file = event.target.files[0];
  //   setVideoFile(file);
  //   const reader = new FileReader();
  //   // const file = imgRef.current.files[0];
  //   console.log(file);
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     // const image = reader.result;
  //     setPost({
  //       ...post,
  //       videoUrl: reader.result,
  //     });
  //   };
  // };

  // console.log(imageUrl);
  const [photo_one, setPhoto_one] = useState("");
  const [photo_two, setPhoto_two] = useState("");
  const [photo_three, setPhoto_three] = useState("");
  const [photo_four, setPhoto_four] = useState("");
  const [post, setPost] = useState("");

  const onSubmitHandler_1 = () => {
    console.log(photo_one);

    const formdata = new FormData();
    formdata.append("image", photo_one);

    console.log(formdata);
    console.log(typeof formdata);

    dispatch(__takePhoto({ roomId, formdata }));

    for (const pair of formdata) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  const onSubmitHandler_2 = () => {
    console.log(photo_two);

    const formdata = new FormData();
    formdata.append("image", photo_two);

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
    formdata.append("image", photo_three);

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
    formdata.append("image", photo_four);

    console.log(formdata);
    console.log(typeof formdata);

    // dispatch(__takePhoto(formdata));

    for (const pair of formdata) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  console.log("Capture Start");

  $(function () {
    $("#pic_btn1").on("click", () => {
      html2canvas(document.querySelector("#picture_1")).then((canvas) => {
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

      // $.ajax({
      //   type: "post",
      //   data: {
      //     photo_one: photo_one,
      //   },
      //   dataType: "multipart/form-data",
      //   url: `https://photo-pie.shop/api/photo/room/${roomId}/shoot`,
      //   success: function (data) {
      //     console.log(data);
      //   },
      //   error: function (a, b, c) {
      //     alert("error");
      //   },
      // });
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
            picture_1
            <button id="pic_btn1" onClick={() => onSubmitHandler_1()}>
              나 촬영
            </button>
          </StDiv>
          <StDiv picture id="picture_2">
            picture_2
            <button id="pic_btn2" onClick={() => onSubmitHandler_2}>
              친구1
            </button>
          </StDiv>
          <StDiv picture id="picture_3">
            picture_3
            <button id="pic_btn2" onClick={() => onSubmitHandler_3}>
              친구2
            </button>
          </StDiv>
          <StDiv picture id="picture_4">
            picture_4
            <button id="pic_btn2" onClick={() => onSubmitHandler_4}>
              친구3
            </button>
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

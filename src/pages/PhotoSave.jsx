import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import Span from "../components/button/Span";
import { MdQrCode2, MdCloudDownload } from "react-icons/md";
import { ShareKakao } from "../components/Kakao/ShareKakao";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __completePhoto,
  __qrcodeGet,
  __qrcodeSend,
} from "../redux/modules/photoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { __outPhotoRoom } from "../redux/modules/videoSlice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import { dataURLtoFile } from "../components/file/dataURLtoFile";

const PhotoSave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  console.log(roomId);

  const [photo_pie, setPhoto_pie] = useState("");

  const [qrcode, setQrcode] = useState("");
  // console.log(qrcode);

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
    toast.success(
      "현재 자동으로 이미지 생성이 되지 않아\n 아래 이미지 생성 버튼을 꼭! 클릭해주세요!\nQR생성 이미지 팝업이 뜨지 않으면\n한 번 더 눌러주세요 ㅠㅠ\n빠르게 해결하겠습니다!\n 📷Photo-Pie",
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
        duration: 6000,
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
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  useEffect(() => {
    dispatch(__completePhoto(roomId));
  }, [dispatch, roomId]);

  const roomInfo = useSelector((state) => state.photos.loadRoomInfo);
  console.log("roomInfo --->", roomInfo);

  const roomPhotos = useSelector((state) => state.photos.loadRoomInfo.data1);
  console.log(roomPhotos);

  const role = useSelector((state) => state.videos.videoInfos[0].role);

  const qrcodeSend = () => {
    html2canvas(document.querySelector("#frame_box"))
      .then((canvas) => {
        let photo_pie = (canvas.toDataURL("image/jpg"), "photo_pie.jpg");
        // photo_two = photo_two.replace("data:image/jpg;base64,", "");
        setPhoto_pie(canvas.toDataURL(photo_pie));
      })
      .then(() => {
        const file = dataURLtoFile(photo_pie, "photo_pie.jpg");

        const completePhoto = new FormData();

        completePhoto.append("completePhoto", file);

        dispatch(__qrcodeSend({ roomId, formdata: completePhoto })).then(
          (res) => {
            console.log("사진전송 res --->", res);
            toast.success("QR Code 이미지를 생성해보세요!", {
              icon: "📸",
              style: {
                borderRadius: "10px",
                background: "#3a3232",
                color: "#fffaf2",
              },
              duration: 2000,
            });
          }
        );

        console.log("3초 후 데이터 보내기");
      });
  };

  const pictureSaveHandler = () => {
    html2canvas(document.querySelector("#frame_box")).then((canvas) => {
      let completePhoto = (canvas.toDataURL("image/jpg"), "Photo-Pie.jpg");
      // completePhoto = completePhoto.replace("data:image/jpg;base64,", "");
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

      reverseButtons: true, // 버튼 순서 거꾸로
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
    dispatch(__qrcodeGet(roomId))
      .then((res) => {
        console.log("qr get res ---> ", res);
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
  };

  return (
    <>
      {/* <input type="radio" id="mono" />
            <label htmlFor="mono">흑백</label>
            <input type="radio" id="color" />
            <label htmlFor="color">뽀샤시</label> */}
      <StDiv photo_shoot>
        <Toaster />
        <StDiv capture_area id="capture_area">
          <StDiv frame_box id="frame_box">
            <StImg
              abImg
              src={`data:image/png;base64,${roomInfo.data2?.frameUrl}`}
              alt="frame url"
            />
            <StDiv picture_box id="picture_box">
              {roomPhotos?.map((photo, i) => (
                <StDiv picture key={i}>
                  <StImg
                    photo_img
                    src={`data:image/png;base64,${photo}`}
                    alt={`photo_${i + 1}`}
                  />
                </StDiv>
              ))}
            </StDiv>
          </StDiv>
        </StDiv>
        <StDiv down_btn>
          {role === "leader" ? (
            <Button create_img onClick={qrcodeSend}>
              이미지 생성하기
            </Button>
          ) : null}
          <StDiv qrcode_box>
            {!!qrcode ? (
              <StImg
                qrimg
                src={`data:image/png;base64,${qrcode}`}
                alt="QR Code"
              />
            ) : null}
            <Span qrcode onClick={() => qrcodeGetHandler(roomId)}>
              <MdQrCode2 size={25} />
              QR Code 생성하기
            </Span>
          </StDiv>
          <ShareKakao />
          <button
            onClick={pictureSaveHandler}
            style={{
              borderRadius: "10px",
              backgroundColor: "#3a3232",
              color: "#fffaf2",
              width: "200px",
              height: "50px",
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
    `}
            ${(props) =>
    props.frame_box &&
    css`
      position: relative;
      width: 500px;
      height: 750px;
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
      background-color: #fffaf2;
      border-radius: 10px;
      width: 200px;
      height: 200px;
      border: 1px solid gray;
    `}
`;

export default PhotoSave;

import html2canvas from "html2canvas";
import $ from "jquery";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import Span from "../components/button/Span";
import { RiKakaoTalkFill } from "react-icons/ri";
import { MdQrCode2, MdCloudDownload } from "react-icons/md";
import { ShareKakao } from "../components/Kakao/ShareKakao";
import { useEffect } from "react";

const PhotoSave = () => {
  console.log("Capture Start");
  //photosave 페이지 왔을 때 위 콘솔 안찍힘

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

  $(function () {
    $("#download").on("click", () => {
      html2canvas(document.querySelector("#capture_area")).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), "photo_pie.jpg");
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

  return (
    <>
      {/* <input type="radio" id="mono" />
            <label htmlFor="mono">흑백</label>
            <input type="radio" id="color" />
            <label htmlFor="color">뽀샤시</label> */}
      <StDiv photo_shoot>
        <StDiv capture_area id="capture_area">
          <StH3>Photo-Pie</StH3>
          <StDiv picture_box id="picture-box">
            <StDiv picture1></StDiv>
            <StDiv picture2></StDiv>
            <StDiv picture3></StDiv>
            <StDiv picture4></StDiv>
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
            <MdCloudDownload size={22} />
            PC에 다운로드하기
          </button>
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
    props.picture1 &&
    css`
      background-color: white;
      width: 200px;
      height: 300px;
      text-align: center;
      line-height: 300px;
      background-image: url("/image/2-8.jpg");
      background-position: center;
      background-size: cover;
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
    props.qrimg &&
    css`
      width: 200px;
      height: 200px;
      border: 1px solid gray;
    `}
`;

const StH3 = styled.h3`
  text-align: center;
  padding: 20px;
  color: white;
  font-size: 30px;
  margin: 0 0 15px 0;
`;

export default PhotoSave;

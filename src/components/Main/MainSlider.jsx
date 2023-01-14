import Slider from "react-slick";
// import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import FraimSlider1 from "./FrameSlider1";
import FraimSlider2 from "./FrameSlider2";

export const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  };

  return (
    <StDiv SliderBox>
      <Slider {...settings}>
        <StDiv Slider1>
          <StImg
            SinyoungBack3
            alt="SinyoungBack3"
            src="/image/SinyoungBack3.jpg"
          />
          <StBtn MainTopStartBtn>
            START
            <AiOutlineArrowRight />
          </StBtn>
        </StDiv>
        <StDiv Slider2>
          <StImg
            MainMiddleImg
            alt="MainMiddleImg"
            src="/image/MainMiddleImg.jpg"
          />
          <StBtn MainMiddleGoBtn>
            자세히 알아보기
            <AiOutlineArrowRight />
          </StBtn>
        </StDiv>
        <StDiv MainFrames>
          <StDiv MainFramesTitle>PHOTO FRAMES</StDiv>
          <StDiv MainFramesBox>
            <StDiv MainFramesPBox>Solid Colors</StDiv>
            <FraimSlider1 />
          </StDiv>
          <StDiv MainFramesBox>
            <StDiv MainFramesPBox>Color Gradients</StDiv>
            <FraimSlider2 />
          </StDiv>
        </StDiv>
        <div>
          <h3>4</h3>
        </div>
      </Slider>
    </StDiv>
  );
};

const StDiv = styled.div`
  ${(props) =>
    props.SliderBox &&
    css`
      position: relative;
      width: 100%;
      height: 100%;
      margin-bottom: 20px;
    `}

  ${(props) =>
    props.Slider1 &&
    css`
      width: 100%;
      height: 100%;
      display: flex;
    `}

    ${(props) =>
    props.MainFrames &&
    css`
      width: 100%;
      height: 900px;
      background-color: gray;
      padding-bottom: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

${(props) =>
    props.MainFramesTitle &&
    css`
      font-size: 60px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin: 30px auto;
    `}
    
    ${(props) =>
    props.MainFramesBox &&
    css`
      width: 95%;
      height: 350px;
      border: 1px solid black;
      background-color: #cecece;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    `}

    ${(props) =>
    props.MainFramesPBox &&
    css`
      font-size: 30px;
      width: 95%;
      height: 50px;
      display: flex;
      margin: 20px auto -20px auto;
    `}
`;

const StImg = styled.img`
  /* ${(props) =>
    props.SinyoungBack_2 &&
    css`
      margin-top: 70px;
      width: 100%;
      height: 100%;
    `} */
  ${(props) =>
    props.SinyoungBack3 &&
    css`
      position: relative;
      margin-top: 10px;
      width: 100%;
      height: 100%;
    `}
  ${(props) =>
    props.MainMiddleImg &&
    css`
      position: relative;
      width: 100%;
      height: 100%;
      margin-top: 30px;
    `}
`;
const StBtn = styled.button`
  ${(props) =>
    props.MainTopStartBtn &&
    css`
      position: absolute;
      top: 190px;
      /* right: 50px; */
      width: 250px;
      height: 50px;
      background-color: white;
      box-shadow: 7px 7px 0px 1px black;
      font-size: 30px;
      cursor: pointer;
    `}

  ${(props) =>
    props.MainMiddleGoBtn &&
    css`
      position: absolute;
      bottom: 30px;
      /* left: 50px; */
      width: 350px;
      height: 50px;
      background-color: white;
      box-shadow: 7px 7px 0px 1px black;
      font-size: 30px;
      cursor: pointer;
    `}
`;

export default MainSlider;

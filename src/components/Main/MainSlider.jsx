import Slider from "react-slick";
// import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";

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
        <div>
          <StImg
            SinyoungBack_2
            alt="SinyoungBack_2"
            src="/image/SinyoungBack_2.jpg"
          />
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
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
      width: 100%;
      height: 100%;
      margin-bottom: 20px;
    `}
`;

const StImg = styled.img`
  ${(props) =>
    props.SinyoungBack_2 &&
    css`
      :focus {
        outline: none;
        border: none;
      }
      width: 100%;
      height: 100%;
    `}
`;
export default MainSlider;

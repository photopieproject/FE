// import Slider from "react-slick";
// // import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styled, { css } from "styled-components";

// export const FraimSlider2 = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     arrow: true,
//     pauseOnHover: true,
//   };

//   return (
//     <StDiv SliderBox>
//       <Slider {...settings}>
//         <div>
//           <StImg
//             PhotoPieGroup
//             alt="photo_pie_group"
//             src="/image/photo_pie_group.jpg"
//           />
//         </div>
//         <div>
//           <StImg PhotoSeoul alt="photo-seoul" src="/image/photo-seoul.jpg" />
//         </div>
//         <div>
//           <StImg
//             SinyoungBack
//             alt="SinyoungBack"
//             src="/image/SinyoungBack.jpg"
//           />
//         </div>
//         <div>
//           <StImg
//             PhotoPieGroup
//             alt="photo_pie_group"
//             src="/image/photo_pie_group.jpg"
//           />
//         </div>
//         <div>
//           <StImg PhotoSeoul alt="photo-seoul" src="/image/photo-seoul.jpg" />
//         </div>
//         <div>
//           <StImg
//             SinyoungBack
//             alt="SinyoungBack"
//             src="/image/SinyoungBack.jpg"
//           />
//         </div>
//       </Slider>
//     </StDiv>
//   );
// };

// const StDiv = styled.div`
//   ${(props) =>
//     props.SliderBox &&
//     css`
//       width: 90%;
//       height: 100%;
//       margin-top: 40px;
//     `}
// `;

// const StImg = styled.img`
//   ${(props) =>
//     props.PhotoSeoul &&
//     css`
//       width: 170px;
//       height: 270px;
//     `}

//   ${(props) =>
//     props.SinyoungBack &&
//     css`
//       width: 170px;
//       height: 270px;
//     `}

//   ${(props) =>
//     props.PhotoPieGroup &&
//     css`
//       width: 170px;
//       height: 270px;
//     `}
// `;

// export default FraimSlider2;

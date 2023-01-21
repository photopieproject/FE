import Slider from "react-slick";
// import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const MainSlider = () => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false,
    };

    const noKeyLogin = () => {
        if (
            !localStorage.getItem("id") &&
            !localStorage.getItem("Authorization")
        ) {
            Swal.fire("Warning", "로그인 후 이용해주세요!", "warning");
            // alert();
            navigate("/login");
        } else {
            Swal.fire(
                "Success",
                "방을 만들거나 코드로 친구를 초대하세요!",
                "success"
            );
            navigate("/roomopen");
        }
    };

    return (
        <StDiv SliderBox>
            <Slider {...settings}>
                <StDiv Slider1>
                    <StP Share>SHARE YOUR MOMENT</StP>

                    <StBtn MainTopStartBtn onClick={noKeyLogin}>
                        START
                        <AiOutlineArrowRight />
                    </StBtn>
                    <StImg
                        MainPrac
                        alt="Main_Prac"
                        src="/image/Main_Prac.png"
                    />
                </StDiv>
                <StDiv Slider2>
                    <StP Slider2Title>A PIECE OF PIE FOR EVERYONE</StP>
                    <StDiv Slider2BtnBox>
                        <StBtn MainMiddleGoBtn>
                            자세히 알아보기
                            <AiOutlineArrowRight />
                        </StBtn>
                    </StDiv>

                    <StDiv Slider2Box>
                        <StDiv Box>
                            <StDiv ImgPlace></StDiv>
                            <StP TitleP>방 만들기</StP>
                            <StP ContentP>
                                START 버튼을 눌러 바로 촬영할 수 있는
                            </StP>
                            <StP ContentP>방을 만들어보세요</StP>
                        </StDiv>
                        <StDiv Box>
                            <StDiv ImgPlace></StDiv>
                            <StP TitleP>프레임 선택</StP>
                            <StP ContentP>사용자를 초대한 뒤</StP>
                            <StP ContentP>원하는 프레임을 선택하고</StP>
                            <StP ContentP>촬영을 준비하세요</StP>
                        </StDiv>
                        <StDiv Box>
                            <StDiv ImgPlace></StDiv>
                            <StP TitleP>촬영 및 다운로드</StP>
                            <StP ContentP>
                                자동으로 파이박스에 저장된 사진을
                            </StP>
                            <StP ContentP>다운로드하여 친구들과 공유하세요</StP>
                        </StDiv>
                    </StDiv>
                </StDiv>
                <StDiv Slider3>
                    <StDiv Slider3Box>
                        <StDiv Slider3Left>
                            <StDiv LeftPBox>
                                <StP SmallTitle>PHOTO-PIE</StP>
                                <StP Piece>A PIECE OF PIE FOR EVERYONE</StP>
                                <br />
                                <StP Piece2>
                                    서로 다른 공간에 있지만 그 순간을 함께
                                    남겨둘 수 있다면?
                                </StP>
                                <StP Piece2>
                                    포토파이에서 일상을 나누는 즐거움을
                                    경험해보세요 !
                                </StP>
                                <br />
                                <StP Piece2>Different spaces, same memory.</StP>
                                <StP Piece2>
                                    Experience the joy of sharing your daily
                                    moments
                                </StP>
                                <StP Piece2>with Photo Pie.</StP>
                            </StDiv>
                        </StDiv>
                        <StDiv Slider3Right>
                            <StImg
                                Frame3
                                alt="Frame3"
                                src="/image/Frame3.jpg"
                            />
                        </StDiv>
                    </StDiv>
                </StDiv>
            </Slider>
        </StDiv>
    );
};

const StP = styled.p`
    ${(props) =>
        props.Share &&
        css`
            font-size: 70px;
            font-weight: bold;
            font-family: "HELVETICA";
            height: 40px;
            display: flex;
            justify-content: center;
        `}
    ${(props) =>
        props.Slider2Title &&
        css`
            font-size: 50px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            height: 0px;
            margin-top: 30px;
            margin-bottom: 80px;
        `}
  ${(props) =>
        props.SmallTitle &&
        css`
            font-size: 30px;
            margin-bottom: 0px;
        `}
  ${(props) =>
        props.Piece &&
        css`
            font-size: 65px;
            margin-top: 0px;
            margin-bottom: 0px;
        `}
  ${(props) =>
        props.Piece2 &&
        css`
            font-size: 30px;
            margin-top: 0px;
            margin-bottom: 0px;
        `}
  ${(props) =>
        props.TitleP &&
        css`
            font-size: 30px;
            font-weight: bold;
        `}
  ${(props) =>
        props.ContentP &&
        css`
            font-size: 25px;
            margin: 0px;
        `}
`;
const StDiv = styled.div`
    ${(props) =>
        props.SliderBox &&
        css`
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
            font-family: "HELVETICA";
            font-size: 60px;
        `} 
    ${(props) =>
        props.Slider2Box &&
        css`
            width: 100%;
            height: 100%;
            display: flex;
        `}
    ${(props) =>
        props.Slider2BtnBox &&
        css`
            display: flex;
            justify-content: center;
            margin: 30px auto;
        `}
    ${(props) =>
        props.Box &&
        css`
            width: 33%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `}
    ${(props) =>
        props.ImgPlace &&
        css`
            width: 400px;
            height: 500px;
            display: flex;
            background-color: white;
        `}

  ${(props) =>
        props.Slider3 &&
        css`
            width: 100%;
            height: 100%;
            display: flex;
        `} 

    ${(props) =>
        props.Slider3Box &&
        css`
            width: 100%;
            height: 100%;
            display: flex;
            margin-top: 50px;
        `}

    ${(props) =>
        props.Slider3Left &&
        css`
            width: 60%;
            height: 800px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 70px;
        `}
    ${(props) =>
        props.LeftPBox &&
        css`
            width: 950px;
            height: 700px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: bold;
        `}
    ${(props) =>
        props.Slider3Right &&
        css`
            width: 40%;
            height: 800px;
            display: flex;
        `}
`;

const StImg = styled.img`
    ${(props) =>
        props.MainPrac &&
        css`
            width: 1000px;
            height: 600px;
            margin: auto;
        `}
    ${(props) =>
        props.Frame3 &&
        css`
            width: 450px;
            height: 700px;
            margin: auto;
            margin-left: 70px;
        `}
`;
const StBtn = styled.button`
    ${(props) =>
        props.MainTopStartBtn &&
        css`
            width: 250px;
            height: 50px;
            margin: 50px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            box-shadow: 7px 7px 0px 1px black;
            font-size: 30px;
            cursor: pointer;
        `}

    ${(props) =>
        props.MainMiddleGoBtn &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 350px;
            height: 50px;
            background-color: white;
            box-shadow: 7px 7px 0px 1px black;
            font-size: 30px;
            cursor: pointer;
        `}
`;

export default MainSlider;

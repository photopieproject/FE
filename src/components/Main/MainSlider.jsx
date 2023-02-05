import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Span from "../button/Span";
import frameBlackV2 from "../../assets/frame/frame_black_v2.png";
import frameWhiteV0 from "../../assets/frame/frame_white_v0.png";
import frameGraV1 from "../../assets/frame/frame_gra_v1.png";
import framePink from "../../assets/frame/frame_pink.png";
import frameMint from "../../assets/frame/frame_mint.png";

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
            toast.error("로그인 후 이용해주세요!", {
                style: {
                    borderRadius: "50px",
                    background: "#3a3232",
                    color: "#fffaf2",
                },
                iconTheme: {
                    primary: "#fffaf2",
                    secondary: "#3a3232",
                },
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            navigate("/roomopen");
        }
    };

    return (
        <StDiv SliderBox>
            <Toaster />
            <Slider {...settings} style={{ height: "660px" }}>
                <StDiv Slider1>
                    <StDiv main_1>
                        <StDiv main_txt>
                            <StH1>Photo-Pie</StH1>
                            <StP main_1_txt>SHARE YOUR MOMENT</StP>
                            <StBtn MainTopStartBtn onClick={noKeyLogin}>
                                사진 촬영하러가기
                            </StBtn>
                        </StDiv>
                        <StDiv main_photobox>
                            <div>
                                <StImg
                                    main1_photo
                                    src="/image/group.jpg"
                                    alt="group"
                                />
                                <StImg
                                    main1_photo
                                    src="/image/group.jpg"
                                    alt="group"
                                />
                                <StImg
                                    main1_photo
                                    src="/image/group.jpg"
                                    alt="group"
                                />
                            </div>
                            <div>
                                <StImg
                                    main1_photo
                                    src="/image/group2.jpg"
                                    alt="group2"
                                />
                                <StImg
                                    main1_photo
                                    src="/image/group2.jpg"
                                    alt="group2"
                                />
                                <StImg
                                    main1_photo
                                    src="/image/group2.jpg"
                                    alt="group2"
                                />
                            </div>
                            <div>
                                <StImg
                                    main1_photo
                                    src="/image/group3.jpg"
                                    alt="group3"
                                />
                                <StImg
                                    main1_photo
                                    src="/image/group3.jpg"
                                    alt="group3"
                                />
                                <StImg
                                    main1_photo
                                    src="/image/group3.jpg"
                                    alt="group3"
                                />
                            </div>
                        </StDiv>
                    </StDiv>
                </StDiv>

                <StDiv Slider2>
                    <StDiv Slider2Box>
                        <StMain main_2>
                            <StDiv txt_box>
                                <StDiv txtbox2>
                                    <StDiv tit>COURSE</StDiv>
                                    <StP main_1_txt>SHARE YOUR MOMENT</StP>
                                    <StBtn
                                        MainTopStartBtn3
                                        onClick={noKeyLogin}
                                    >
                                        사진 촬영하러가기
                                    </StBtn>
                                </StDiv>
                            </StDiv>
                            <StDiv ul_wrap2>
                                <StUl main_ul2>
                                    <StLi main2_li>
                                        <StP sub_title>One</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            회원가입 및 로그인을 해주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2_li>
                                        <StP sub_title>Two</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            새로고침 버튼 왼쪽에 자물쇠를 눌러서
                                            카메라와 마이크 접근을
                                            <Span red> 허용</Span>으로
                                            바꿔주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2_li>
                                        <StP sub_title>Three</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            방을 만든 후 초대코드로 친구들을
                                            초대하거나 친구가 보내준 초대코드를
                                            입력해주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2_li>
                                        <StP sub_title>Four</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            4명이 모였으면 방장에게 촬영버튼이
                                            생성됩니다.
                                            <br />
                                            한명씩 촬영을 해주세요!
                                        </StP>
                                    </StLi>
                                    <StLi main2_li>
                                        <StP sub_title>Five</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            촬영이 끝난 후 다같이 사진전송 하러
                                            가기를 눌러 이동해 주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2_li>
                                        <StP sub_title>Six</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            촬영한 사진을 저장하고 친구들과
                                            추억을 공유하세요!
                                        </StP>
                                    </StLi>
                                </StUl>
                            </StDiv>
                        </StMain>
                    </StDiv>
                </StDiv>

                <StDiv Slider3>
                    <StDiv Slider3Box>
                        <StMain main_3>
                            <StDiv txt_box3>
                                <StDiv tit>Best Frame</StDiv>
                                <StP main_1_txt>SHARE YOUR MOMENT</StP>
                                <StBtn MainTopStartBtn3 onClick={noKeyLogin}>
                                    사진 촬영하러가기
                                </StBtn>
                            </StDiv>
                            <StDiv ul_wrap3>
                                <StP rec>Recommend</StP>
                                <StUl main_ul3>
                                    <StLi main3_li>
                                        <StP main3_mini_sub_tit>1위</StP>
                                        <StP main3_sub_tit>Black</StP>
                                        <StImg
                                            frame_photo
                                            src={frameBlackV2}
                                            alt="black"
                                        />
                                    </StLi>
                                    <StLi main3_li>
                                        <StP main3_mini_sub_tit>2위</StP>
                                        <StP main3_sub_tit>White</StP>
                                        <StImg
                                            frame_photo
                                            src={frameWhiteV0}
                                            alt="white"
                                        />
                                    </StLi>
                                    <StLi main3_li>
                                        <StP main3_mini_sub_tit>3위</StP>
                                        <StP main3_sub_tit>Sunset</StP>
                                        <StImg
                                            frame_photo
                                            src={frameGraV1}
                                            alt="gradation"
                                        />
                                    </StLi>
                                    <StLi main3_li>
                                        <StP main3_mini_sub_tit>4위</StP>
                                        <StP main3_sub_tit>Pink</StP>
                                        <StImg
                                            frame_photo
                                            src={framePink}
                                            alt="pink"
                                        />
                                    </StLi>
                                    <StLi main3_li>
                                        <StP main3_mini_sub_tit>5위</StP>
                                        <StP main3_sub_tit>Mint</StP>
                                        <StImg
                                            frame_photo
                                            src={frameMint}
                                            alt="mint"
                                        />
                                    </StLi>
                                </StUl>
                            </StDiv>
                        </StMain>
                    </StDiv>
                </StDiv>
            </Slider>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.SliderBox &&
        css`
            width: 90%;
            max-width: 1920px;
            margin: 20px;
        `}
    ${(props) =>
        props.Slider1 &&
        css`
            width: 90%;
            max-width: 1920px;
            font-size: 60px;
            overflow: hidden;
        `}
    ${(props) =>
        props.main_1 &&
        css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 600px;
            gap: 250px;
        `}
    ${(props) =>
        props.main_txt &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.main_photobox &&
        css`
            display: flex;
            gap: 30px;
            transform: rotate(-27deg);
        `}
    ${(props) =>
        props.Slider2 &&
        css`
            width: 90%;
            max-width: 1920px;
            height: 600px;
            display: flex;
            font-size: 60px;
            overflow: hidden;
        `} 
    ${(props) =>
        props.Slider2Box &&
        css`
            width: 90%;
            max-width: 1920px;
            display: flex;
            margin: 0 auto;
        `}
    ${(props) =>
        props.tit &&
        css`
            font-size: 90px;
            font-weight: bold;
        `}
    ${(props) =>
        props.ul_wrap2 &&
        css`
            margin-top: 150px;
        `}
    ${(props) =>
        props.ul_wrap3 &&
        css`
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        `}
    ${(props) =>
        props.line &&
        css`
            width: 100%;
            height: 2px;
            margin: 15px 0 0;
            background-color: #3a3232;
        `}
    ${(props) =>
        props.Slider3 &&
        css`
            width: 90%;
            max-width: 1920px;
            display: flex;
            font-size: 60px;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        `}
    ${(props) =>
        props.Slider3Box &&
        css`
            width: 90%;
            max-width: 1920px;
            display: flex;
            margin: auto;
            justify-content: center;
            gap: 200px;
        `}
    ${(props) =>
        props.Slider3Left &&
        css`
            display: flex;
        `}
    ${(props) =>
        props.LeftPBox &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: bold;
        `}
            ${(props) =>
        props.txt_box &&
        css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        `}
            ${(props) =>
        props.txtbox2 &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 180px;
        `}
        
            ${(props) =>
        props.txt_box3 &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `}
`;

const StP = styled.p`
    ${(props) =>
        props.sub_title &&
        css`
            margin: 0;
            font-size: 24px;
            text-align: center;
        `}
    ${(props) =>
        props.txt &&
        css`
            margin: 0;
            margin: 40px 0 0;
            font-family: "Nanum Myeongjo", serif;
            font-size: 16px;
            line-height: 24px;
        `}
    ${(props) =>
        props.main3_mini_sub_tit &&
        css`
            margin: 0;
            font-size: 18px;
            text-align: left;
        `}
    ${(props) =>
        props.main3_sub_tit &&
        css`
            margin: 0;
            font-size: 28px;
            text-align: left;
        `}
    ${(props) =>
        props.rec &&
        css`
            font-size: 26px;
            margin: 0;
        `}
    ${(props) =>
        props.Piece &&
        css`
            font-family: "Belleza", sans-serif;
            font-size: 45px;
            margin: 50px 0;
        `}
    ${(props) =>
        props.Piece2 &&
        css`
            font-family: "Nanum Myeongjo", serif;
            font-size: 22px;
            margin-top: 8px;
        `}
    ${(props) =>
        props.Piece3 &&
        css`
            font-family: "Belleza", sans-serif;
            font-size: 22px;
            margin-top: 3px;
        `}
    ${(props) =>
        props.Piece4 &&
        css`
            font-family: "Belleza", sans-serif;
            font-size: 22px;
            margin: 3px;
            text-align: right;
        `}
    ${(props) =>
        props.ContentP &&
        css`
            font-size: 25px;
            margin: 0;
        `}
    ${(props) =>
        props.main_1_txt &&
        css`
            font-family: "Belleza", sans-serif;
            margin: 0;
            font-size: 25px;
        `}
    ${(props) =>
        props.big_txt &&
        css`
            margin: 0;
            display: block;
            position: absolute;
            margin: 0;
            left: 26px;
            bottom: -56px;
            font-family: "Cinzel", serif;
            font-size: 150px;
        `}
`;

const StImg = styled.img`
    ${(props) =>
        props.main1_photo &&
        css`
            width: 200px;
            margin-top: 30px;
        `}
    ${(props) =>
        props.Frame3 &&
        css`
            height: 600px;
        `}
    ${(props) =>
        props.frame_photo &&
        css`
            width: 200px;
            margin-top: 10px;
            @media (max-width: 1919px) {
                width: 120px;
            }
        `}
`;

const StBtn = styled.button`
    ${(props) =>
        props.MainTopStartBtn &&
        css`
            font-family: "Nanum Myeongjo", serif;
            width: 200px;
            height: 35px;
            font-size: 14px;
            margin-top: 60px;
            cursor: pointer;
            background-color: #3a3232;
            border: 0;
            border-radius: 50px;
            color: #fffaf2;
        `}
    ${(props) =>
        props.MainTopStartBtn3 &&
        css`
            font-family: "Nanum Myeongjo", serif;
            width: 200px;
            height: 35px;
            font-size: 14px;
            margin-top: 40px;
            cursor: pointer;
            background-color: #3a3232;
            border: 0;
            border-radius: 50px;
            color: #fffaf2;
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

const StMain = styled.main`
    ${(props) =>
        props.main_2 &&
        css`
            width: 100%;
            padding: 60px;
            margin: 0 auto;
            box-sizing: border-box;
            background-color: #fffaf2;
            font-family: "Belleza", sans-serif;
            color: #3a3232;
        `}
    ${(props) =>
        props.main_3 &&
        css`
            width: 100%;
            padding: 60px 10px;
            margin: 0 auto;
            box-sizing: border-box;
            background-color: #fffaf2;
            font-family: "Belleza", sans-serif;
            color: #3a3232;
            @media (max-width: 1919px) {
                padding: 100px 10px;
            }
        `}
`;

const StUl = styled.ul`
    ${(props) =>
        props.main_ul2 &&
        css`
            margin: -30px 0 0;
            padding: 0;
            display: flex;
            justify-content: center;
        `}
    ${(props) =>
        props.main_ul3 &&
        css`
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: flex-end;
            gap: 15px;
        `}
`;

const StLi = styled.li`
    ${(props) =>
        props.main2_li &&
        css`
            position: relative;
            width: 100%;
            max-width: 220px;
            height: 200px;
            margin: 0 30px 0 0;
            list-style: none;
        `}
    ${(props) =>
        props.main3_li &&
        css`
            list-style: none;
        `}
`;

const StH1 = styled.h1`
    font-family: "Belleza", sans-serif;
    font-size: 90px;
    margin: 0;
`;

export default MainSlider;

import Slider from "react-slick";
import React from "react";
// import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Span from "../button/Span";
import patternChan from "../../images/new_frame/pattern_chan.webp";
import deepblue from "../../images/new_frame/deepblue.webp";
import patternCity from "../../images/new_frame/pattern_city.webp";
import blackOrange from "../../images/new_frame/black_orange.webp";
import patternSunset from "../../images/new_frame/pattern_sunset.webp";
import group from "../../images/main/group.webp";
import group2 from "../../images/main/group2.webp";
import group3 from "../../images/main/group3.webp";
import Button from "../button/Button";
import { useState } from "react";
import GuideModal from "../modal/GuideModal";
// import { useDispatch } from "react-redux";
// import { __mainTopFrame } from "../../redux/modules/photoSlice";

export const MainSlider = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    console.log(process.env.PUBLIC_URL);
    const [guideModal, setGuideModal] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
    };

    // useEffect(() => {
    //     dispatch(__mainTopFrame())
    //         .then((res) => console.log("main res?", res))
    //         .catch((err) => console.log(err));
    // });

    const guideModalHandler = () => {
        setGuideModal(true);
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
                    <StDiv main1>
                        <StDiv mainTxt>
                            <StH1>Photo-Pie</StH1>
                            <StP main1Txt>SHARE YOUR MOMENT</StP>
                            <Button MainTopStartBtn onClick={noKeyLogin}>
                                사진 촬영하러가기
                            </Button>
                        </StDiv>
                        <StDiv mainPhotobox>
                            <div>
                                <StImg
                                    main1Photo
                                    src={group}
                                    alt="group"
                                    style={{ width: "200px", height: "300px" }}
                                />
                                <StImg
                                    main1Photo
                                    src={group}
                                    alt="group"
                                    style={{ width: "200px", height: "300px" }}
                                />
                                <StImg
                                    main1Photo
                                    src={group}
                                    alt="group"
                                    style={{ width: "200px", height: "300px" }}
                                />
                            </div>
                            <div>
                                <StImg
                                    main1Photo
                                    src={group2}
                                    alt="group2"
                                    style={{ width: "200px", height: "300px" }}
                                />
                                <StImg
                                    main1Photo
                                    src={group2}
                                    alt="group2"
                                    style={{ width: "200px", height: "300px" }}
                                />
                                <StImg
                                    main1Photo
                                    src={group2}
                                    alt="group2"
                                    style={{ width: "200px", height: "300px" }}
                                />
                            </div>
                            <div>
                                <StImg
                                    main1Photo
                                    src={group3}
                                    alt="group3"
                                    style={{ width: "200px", height: "300px" }}
                                />
                                <StImg
                                    main1Photo
                                    src={group3}
                                    alt="group3"
                                    style={{ width: "200px", height: "300px" }}
                                />
                                <StImg
                                    main1Photo
                                    src={group3}
                                    alt="group3"
                                    style={{ width: "200px", height: "300px" }}
                                />
                            </div>
                        </StDiv>
                    </StDiv>
                </StDiv>

                <StDiv Slider2>
                    <StDiv Slider2Box>
                        <StMain main2>
                            <StDiv txtBox>
                                <StDiv txtBox2>
                                    <StDiv tit>COURSE</StDiv>
                                    <StP main1Txt>SHARE YOUR MOMENT</StP>
                                    <StDiv slierbtnBox>
                                        <Button
                                            MainTopStartBtn3
                                            onClick={noKeyLogin}
                                        >
                                            사진 촬영하러가기
                                        </Button>
                                        <Button
                                            MainTopStartBtn3
                                            onClick={guideModalHandler}
                                        >
                                            사용 방법 가이드
                                        </Button>
                                        {guideModal && (
                                            <GuideModal
                                                setGuideModal={setGuideModal}
                                            />
                                        )}
                                    </StDiv>
                                </StDiv>
                            </StDiv>
                            <StDiv ulWrap2>
                                <StUl mainUl2>
                                    <StLi main2Li>
                                        <StP subTitle>One</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            회원가입 및 로그인을 해주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2Li>
                                        <StP subTitle>Two</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            새로고침 버튼 왼쪽에 자물쇠를 눌러서
                                            카메라와 마이크 접근을
                                            <Span txtBold> 허용</Span>으로
                                            바꿔주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2Li>
                                        <StP subTitle>Three</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            방을 만든 후 초대코드로 친구들을
                                            초대하거나 친구가 보내준 초대코드를
                                            입력해주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2Li>
                                        <StP subTitle>Four</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            1인용 - 차례로 사진을 4번 촬영
                                            해주세요!
                                            <br />
                                            2명 혹은 4명이 모였으면 방장에게
                                            촬영버튼이 생성됩니다.
                                            <br />
                                            한명씩 촬영을 해주세요!
                                        </StP>
                                    </StLi>
                                    <StLi main2Li>
                                        <StP subTitle>Five</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            촬영이 끝난 후 다같이
                                            <br />
                                            <Span txtBold>
                                                사진전송 하러 가기
                                            </Span>
                                            를 눌러 이동해 주세요.
                                        </StP>
                                    </StLi>
                                    <StLi main2Li>
                                        <StP subTitle>Six</StP>
                                        <StDiv line></StDiv>
                                        <StP txt>
                                            촬영한 사진을 저장하고 친구들과
                                            추억을 공유하세요!
                                            <br /> 저장된 사진은{" "}
                                            <Span txtBold>
                                                {" "}
                                                24시간이 지나면 자동 삭제
                                            </Span>
                                            됩니다!
                                        </StP>
                                    </StLi>
                                </StUl>
                            </StDiv>
                        </StMain>
                    </StDiv>
                </StDiv>

                <StDiv Slider3>
                    <StDiv Slider3Box>
                        <StMain main3>
                            <StDiv txtBox3>
                                <StDiv tit>Best Frame</StDiv>
                                <StP main1Txt>SHARE YOUR MOMENT</StP>
                                <Button MainTopStartBtn3 onClick={noKeyLogin}>
                                    사진 촬영하러가기
                                </Button>
                            </StDiv>
                            <StDiv ulWrap3>
                                <StP rec>Recommend</StP>
                                <StUl mainUl3>
                                    <StLi main3Li>
                                        <StP main3MiniSubTit>1위</StP>
                                        <StP main3SubTit>Bridge</StP>
                                        <StImg
                                            framePhoto
                                            src={patternChan}
                                            alt="Bridge"
                                            style={{
                                                width: "200px",
                                                height: "300px",
                                            }}
                                        />
                                    </StLi>
                                    <StLi main3Li>
                                        <StP main3MiniSubTit>2위</StP>
                                        <StP main3SubTit>Deep Blue</StP>
                                        <StImg
                                            framePhoto
                                            src={deepblue}
                                            alt="Deep Blue"
                                            style={{
                                                width: "200px",
                                                height: "300px",
                                            }}
                                        />
                                    </StLi>
                                    <StLi main3Li>
                                        <StP main3MiniSubTit>3위</StP>
                                        <StP main3SubTit>City</StP>
                                        <StImg
                                            framePhoto
                                            src={patternCity}
                                            alt="City"
                                            style={{
                                                width: "200px",
                                                height: "300px",
                                            }}
                                        />
                                    </StLi>
                                    <StLi main3Li>
                                        <StP main3MiniSubTit>4위</StP>
                                        <StP main3SubTit>Black Orange</StP>
                                        <StImg
                                            framePhoto
                                            src={blackOrange}
                                            alt="Black Orange"
                                            style={{
                                                width: "200px",
                                                height: "300px",
                                            }}
                                        />
                                    </StLi>
                                    <StLi main3Li>
                                        <StP main3MiniSubTit>5위</StP>
                                        <StP main3SubTit>Sunset</StP>
                                        <StImg
                                            framePhoto
                                            src={patternSunset}
                                            alt="Sunset"
                                            style={{
                                                width: "200px",
                                                height: "300px",
                                            }}
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
        props.main1 &&
        css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 600px;
            gap: 250px;
        `}
    ${(props) =>
        props.mainTxt &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
    ${(props) =>
        props.mainPhotobox &&
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
        props.ulWrap2 &&
        css`
            margin-top: 150px;
        `}
    ${(props) =>
        props.slierbtnBox &&
        css`
            position: relative;
            display: flex;
            gap: 10px;
        `}
    ${(props) =>
        props.ulWrap3 &&
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
        props.txtBox &&
        css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        `}
    ${(props) =>
        props.txtBox2 &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 180px;
        `}    
    ${(props) =>
        props.txtBox3 &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `}
`;

const StP = styled.p`
    ${(props) =>
        props.subTitle &&
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
        props.main3MiniSubTit &&
        css`
            margin: 0;
            font-size: 18px;
            text-align: left;
        `}
    ${(props) =>
        props.main3SubTit &&
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
        props.main1Txt &&
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
        props.main1Photo &&
        css`
            margin-top: 30px;
        `}
    ${(props) =>
        props.framePhoto &&
        css`
            margin-top: 10px;
            @media (max-width: 1919px) {
                width: 120px;
            }
        `}
`;

const StMain = styled.main`
    ${(props) =>
        props.main2 &&
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
        props.main3 &&
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
        props.mainUl2 &&
        css`
            margin: -30px 0 0;
            padding: 0;
            display: flex;
            justify-content: center;
        `}
    ${(props) =>
        props.mainUl3 &&
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
        props.main2Li &&
        css`
            position: relative;
            width: 100%;
            max-width: 220px;
            height: 200px;
            margin: 0 30px 0 0;
            list-style: none;
        `}
    ${(props) =>
        props.main3Li &&
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

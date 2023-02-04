import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
                        <StMain>
                            <StDiv main_cont>
                                <StSection main_left>
                                    <StDiv tit1>
                                        PHOTO-PIE
                                        <br />
                                        COURSE
                                    </StDiv>
                                    <StDiv thin_line></StDiv>
                                    <StDiv tit2>SHARE YOUR MOMENT</StDiv>
                                </StSection>
                                <StSection main_right>
                                    <StDiv cont>
                                        <StUl>
                                            <StLi>
                                                <StDiv li_cont>
                                                    <StDiv sub_title>ONE</StDiv>
                                                    <StDiv
                                                        mw70_op30_thin_line
                                                    ></StDiv>
                                                    <StDiv txt_3>
                                                        촬영한 사진을 저장하고
                                                        <br />
                                                        친구들과 추억을
                                                        공유하세요!
                                                    </StDiv>
                                                    <StP big_txt>1</StP>
                                                </StDiv>
                                            </StLi>
                                            <StLi>
                                                <StDiv li_cont>
                                                    <StDiv sub_title>TWO</StDiv>
                                                    <StDiv
                                                        mw70_op30_thin_line
                                                    ></StDiv>
                                                    <StDiv txt_3>
                                                        촬영한 사진을 저장하고
                                                        <br />
                                                        친구들과 추억을
                                                        공유하세요!
                                                    </StDiv>
                                                    <StP big_txt>2</StP>
                                                </StDiv>
                                            </StLi>
                                            <StLi>
                                                <StDiv li_cont>
                                                    <StDiv sub_title>
                                                        THREE
                                                    </StDiv>
                                                    <StDiv
                                                        mw70_op30_thin_line
                                                    ></StDiv>
                                                    <StDiv txt_3>
                                                        촬영한 사진을 저장하고
                                                        <br />
                                                        친구들과 추억을
                                                        공유하세요!
                                                    </StDiv>
                                                    <StP big_txt>3</StP>
                                                </StDiv>
                                            </StLi>
                                            <StLi>
                                                <StDiv li_cont>
                                                    <StDiv sub_title>
                                                        FOUR
                                                    </StDiv>
                                                    <StDiv
                                                        mw70_op30_thin_line
                                                    ></StDiv>
                                                    <StDiv txt_3>
                                                        촬영한 사진을 저장하고
                                                        <br />
                                                        친구들과 추억을
                                                        공유하세요!
                                                    </StDiv>
                                                    <StP big_txt>4</StP>
                                                </StDiv>
                                            </StLi>
                                            <StLi>
                                                <StDiv li_cont>
                                                    <StDiv sub_title>
                                                        FIVE
                                                    </StDiv>
                                                    <StDiv
                                                        mw70_op30_thin_line
                                                    ></StDiv>
                                                    <StDiv txt_3>
                                                        촬영한 사진을 저장하고
                                                        <br />
                                                        친구들과 추억을
                                                        공유하세요!
                                                    </StDiv>
                                                    <StP big_txt>5</StP>
                                                </StDiv>
                                            </StLi>
                                            <StLi>
                                                <StDiv li_cont>
                                                    <StDiv sub_title>SIX</StDiv>
                                                    <StDiv
                                                        mw70_op30_thin_line
                                                    ></StDiv>
                                                    <StDiv txt_3>
                                                        촬영한 사진을 저장하고
                                                        <br />
                                                        친구들과 추억을
                                                        공유하세요!
                                                    </StDiv>
                                                    <StP big_txt>6</StP>
                                                </StDiv>
                                            </StLi>
                                        </StUl>
                                    </StDiv>
                                </StSection>
                            </StDiv>
                        </StMain>
                    </StDiv>
                </StDiv>

                <StDiv Slider3>
                    <StDiv Slider3Box>
                        <StDiv Slider3Left>
                            <StDiv LeftPBox>
                                <StP Piece>A PIECE OF PIE FOR EVERYONE</StP>
                                <StDiv txt_box>
                                    <StP Piece2>
                                        서로 다른 공간에 있지만 그 순간을 함께
                                        남겨둘 수 있다면?
                                    </StP>
                                    <StP Piece2>
                                        포토파이에서 일상을 나누는 즐거움을
                                        경험해보세요 !
                                    </StP>
                                </StDiv>
                                <StDiv txt_box>
                                    <StP Piece3>
                                        Different spaces, same memory.
                                    </StP>
                                    <StP Piece3>
                                        Experience the joy of sharing your daily
                                        moments
                                    </StP>
                                </StDiv>
                                <StP Piece4>with Photo Pie.</StP>
                            </StDiv>
                        </StDiv>
                        <StDiv Slider3Right>
                            <StImg
                                Frame3
                                alt="Frame"
                                src="/image/frame_gra.png"
                                // src="/image/frame_black2.png"
                            />
                        </StDiv>
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
        props.main_cont &&
        css`
            max-width: 1920px;
            margin: 0 auto;
        `}
    ${(props) =>
        props.tit1 &&
        css`
            font-size: 65px;
            margin: 0 0 175px;
        `}
    ${(props) =>
        props.thin_line &&
        css`
            height: 1px;
            width: 100%;
            background-color: #3a3232;
        `}
    ${(props) =>
        props.tit2 &&
        css`
            margin: 15px 0 0;
            font-size: 25px;
            text-align: right;
        `}
    ${(props) =>
        props.cont &&
        css`
            position: relative;
            height: 600px;
        `}
    ${(props) =>
        props.li_cont &&
        css`
            position: relative;
            width: 100%;
            height: 100%;
        `}
    ${(props) =>
        props.sub_title &&
        css`
            font-size: 20px;
        `}
    ${(props) =>
        props.txt_1 &&
        css`
            max-width: 210px;
            margin: 75px 0 0;
            font-size: 16px;
        `}
    ${(props) =>
        props.txt_2 &&
        css`
            font-size: 32px;
        `}
    ${(props) =>
        props.mw70_op30_thin_line &&
        css`
            max-width: 70%;
            opacity: 0.3;
            height: 1px;
            width: 100%;
            background-color: #3a3232;
            position: relative;
            margin: 80px 0;
        `}
    ${(props) =>
        props.txt_3 &&
        css`
            max-width: 210px;
            margin: 75px 0 0;
            font-size: 16px;
            font-family: "Nanum Myeongjo", serif;
            text-align: right;
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
            margin: 20px 0;
        `}
`;

const StP = styled.p`
    ${(props) =>
        props.Piece &&
        css`
            font-family: "Belleza", sans-serif;
            font-size: 45px;txt_box
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
    width: 100%;
    height: 700px;
    background-color: #fffaf2;
    font-family: "Belleza", sans-serif;
    color: #3a3232;
`;

const StSection = styled.section`
    ${(props) =>
        props.main_left &&
        css`
            float: left;
            padding: 90px 95px 0;
            /* padding: 80px 85px 0 0; */
            width: 50%;
            max-width: 960px;
            box-sizing: border-box;
        `}
    ${(props) =>
        props.main_right &&
        css`
            float: right;
            width: 50%;
            max-width: 960px;
        `}
`;

const StUl = styled.ul`
    margin: 0;
    padding: 0;
`;

const StLi = styled.li`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    max-width: 360px;
    padding: 85px 25px 0;
    box-sizing: border-box;
    list-style: none;
    cursor: pointer;
    &:nth-child(2n-1) {
        background-color: #3a3232;
        color: #fffaf2;
    }
    &:nth-child(2n) {
        background-color: #fffaf2;
        color: #3a3232;
    }
    &:nth-child(2) {
        left: 120px;
    }
    &:nth-child(3) {
        left: 240px;
    }
    &:nth-child(4) {
        left: 360px;
    }
    &:nth-child(5) {
        left: 480px;
    }
    &:nth-child(6) {
        left: 600px;
    }
`;

const StH1 = styled.h1`
    font-family: "Belleza", sans-serif;
    font-size: 90px;
    margin: 0;
`;

export default MainSlider;

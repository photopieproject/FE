import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { __kakaoMsgSend } from "../../redux/modules/photoSlice";
import Button from "../button/Button";

export const ShareKakao = (photoUrl) => {
    const dispatch = useDispatch();
    const { roomId } = useParams();

    const [kakaoImg, setKakaoImg] = useState("");
    console.log("kakao?", kakaoImg);

    useEffect(() => {
        ShareKakaoSend();
    }, []);

    const ShareKakaoSend = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        if (window.Kakao) {
            const kakao = window.Kakao;

            // 중복 initialization 방지
            if (!kakao.isInitialized()) {
                // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
                kakao.init("8b4bfa212ce98720d4df490e0758420e");
                // kakao.init("process.env.REACT_APP_SHARE_KAKAO_LINK_KEY");
                //위에는 인증실패로 뜸, .env에서 못가져오나봄
            }

            kakao.Link.createDefaultButton({
                // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
                container: "#kakao-link-btn",
                objectType: "feed",
                content: {
                    title: "Photo-Pie",
                    description: "함께 찍은 사진을 공유하고 다운로드 해보세요!",
                    imageUrl:
                        "https://my-photopie-github-actions-s3-bucket.s3.ap-northeast-2.amazonaws.com/photopie-logo.png",
                    link: {
                        mobileWebUrl: kakaoImg,
                        webUrl: kakaoImg,
                    },
                },
                buttons: [
                    {
                        title: "다운로드",
                        link: {
                            mobileWebUrl: kakaoImg,
                            webUrl: kakaoImg,
                        },
                    },
                ],
            });
        }
    };

    const kakaoUrlHandler = (roomId) => {
        dispatch(__kakaoMsgSend(roomId)).then((res) => {
            toast.success(
                "카톡이미지가 생성되었어요!\n카카오톡 전송하기를 눌러 친구들에게 공유해 보세요!",
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
                    duration: 4000,
                }
            );
            console.log("kakao--->", res);
            setKakaoImg(res.payload.data1);
            console.log("set Img-->", kakaoImg);
        });
    };

    return (
        <StDiv kakaoSendBox>
            <Button kakaoUrl onClick={() => kakaoUrlHandler(roomId)}>
                카톡이미지 생성하기
                <RiKakaoTalkFill size={25} />
            </Button>
            <StDiv downbtn id="kakao-link-btn">
                <Button kakaoDown>
                    카카오톡 전송하기
                    <RiKakaoTalkFill size={25} />
                </Button>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.kakaoSendBox &&
        css`
            display: flex;
            gap: 5px;
        `}
    ${(props) =>
        props.downbtn &&
        css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
`;

export default ShareKakao;

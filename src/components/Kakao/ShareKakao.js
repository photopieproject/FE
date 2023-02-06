import { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled, { css } from "styled-components";
import Button from "../button/Button";

export const ShareKakao = (photoUrl) => {
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
                        "https://my-photopie-github-actions-s3-bucket.s3.ap-northeast-2.amazonaws.com/frame/rainbow.jpg", // i.e. process.env.FETCH_URL + '/logo.png'
                    link: {
                        mobileWebUrl: "https://photo-pie.store",
                        webUrl: "https://photo-pie.store",
                    },
                },
                buttons: [
                    {
                        title: "다운로드",
                        link: {
                            mobileWebUrl: "https://photo-pie.store",
                            webUrl: "https://photo-pie.store",
                        },
                    },
                    // {
                    //   title: "앱으로 보기",
                    //   link: {
                    //     mobileWebUrl: "https://photo-pie.store",
                    //     webUrl: "https://photo-pie.store",
                    //   },
                    // },
                ],
            });
        }
    };

    return (
        <div className="kakao-share-button">
            <StDiv downbtn id="kakao-link-btn">
                <Button down>
                    <RiKakaoTalkFill size={25} />
                    카카오톡 전송하기
                </Button>
            </StDiv>
        </div>
    );
};
//--------------새로 위
const StDiv = styled.div`
    ${(props) =>
        props.downbtn &&
        css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            width: 300px;
        `}
`;

export default ShareKakao;

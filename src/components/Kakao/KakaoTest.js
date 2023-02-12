export const KakaoTest = (kakaoImg) => {
    // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init(process.env.REACT_APP_KAKAO_SHARE);
        }

        kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
                title: "Photo-Pie",
                description: "함께 찍은 사진을 공유하고 다운로드 해보세요!",
                imageUrl: process.env.REACT_APP_IMAGE_URL,
                link: {
                    mobileWebUrl: kakaoImg,
                    webUrl: kakaoImg,
                },
            },
            buttons: [
                {
                    title: "사진 다운로드 하기",
                    link: {
                        mobileWebUrl: kakaoImg,
                        webUrl: kakaoImg,
                    },
                },
            ],
        });
    }
};

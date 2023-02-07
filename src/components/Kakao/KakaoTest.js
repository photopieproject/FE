export const KakaoTest = (kakaoImg) => {
    console.log("test");
    // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    console.log("what??", kakaoImg);
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init("8b4bfa212ce98720d4df490e0758420e");
        }

        kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
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

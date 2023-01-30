import { useEffect } from "react";

export const ShareKakao = (photoUrl) => {
  const ShareKakaoSend = (photoUrl) => {
    // * photoUrl = roomId에서 촬영한 사진 4장 + 프레임 합친 이미지 url (카톡 공유할 사진)
    // * REACT_APP_SHARE_KAKAO_LINK_KEY = 8b4bfa212ce98720d4df490e0758420e // env 파일에 추가, 외부로 공개되면 안됨

    //16~18줄 대신 써봄 -> "Kakao init:App key must be provided" 에러문구 사라짐
    //근데 process.env.REACT_APP_SHARE_KAKAO_LINK_KEY의 변수 지정 후
    // console.log(변수) 했을 때 콘솔이 안찍힘 ㅠㅠ
    useEffect(() => {
      window.Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
    }, []);

    // roomId에 따라 다른 url을 보내줄거기 때문에 photoUrl를 인자값으로 받아줌
    if (window.Kakao) {
      const kakao = window.Kakao;
      // if (!kakao.isInitialized()) {
      //   kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공 받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      // }

      kakao.Link.sendDefault({
        objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입
        content: {
          title: "Photopie", // 제목
          description: "함께 찍은 사진을 친구와 공유하고 다운로드 해보세요!", // 설명
          imageUrl:
            "https://my-photopie-github-actions-s3-bucket.s3.ap-northeast-2.amazonaws.com/frame/rainbow.jpg", // 일단 임시 url로 넣어 놨고, 추후 화질 좋고 예쁜(?) 포토파이 로고로 수정
          link: {
            mobileWebUrl: photoUrl, // imageUrl 클릭시 다운로드 할 이미지 링크로 이동하는 것 같음
            //"https://photo-pie.shop/api/photo/kakaodata"

            webUrl: photoUrl,
          },
        },
        buttons: [
          {
            title: "다운로드", // 버튼 제목
            link: {
              mobileWebUrl: photoUrl, // ‘다운로드‘ 버튼 클릭시 다운로드 할 이미지 링크로 이동
              webUrl: photoUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <div>
      <button onClick={() => ShareKakaoSend(photoUrl)}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/KakaoLogo.png`}
          alt={"Kakao Logo"}
        />
      </button>
    </div>
  );
};
export default ShareKakao;

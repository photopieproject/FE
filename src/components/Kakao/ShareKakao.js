import { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled, { css } from "styled-components";
import Button from "../button/Button";

export const ShareKakao = (photoUrl) => {
  // 왜 안되는지 모르겠는 애
  //   useEffect(() => {
  //     ShareKakaoSend();
  //   }, []);

  //   const ShareKakaoSend = () => {
  //     if (window.Kakao) {
  //       const kakao = window.Kakao;

  //       if (!kakao.isInitialized()) {
  //         kakao.init("8b4bfa212ce98720d4df490e0758420e"); // 카카오에서 제공 받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
  //         // kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공 받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
  //       }
  //       // kakao.Link.sendDefault({
  //       kakao.Link.sendDefaultButton({
  //         container: "#kakao-link-btn",
  //         objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입
  //         content: {
  //           title: "Photopie", // 제목
  //           description: "함께 찍은 사진을 친구와 공유하고 다운로드 해보세요!", // 설명
  //           imageUrl:
  //             "https://my-photopie-github-actions-s3-bucket.s3.ap-northeast-2.amazonaws.com/frame/rainbow.jpg", // 일단 임시 url로 넣어 놨고, 추후 화질 좋고 예쁜(?) 포토파이 로고로 수정
  //           link: {
  //             mobileWebUrl: "https://photo-pie.shop",
  //             // photoUrl, // imageUrl 클릭시 다운로드 할 이미지 링크로 이동하는 것 같음
  //             //"https://photo-pie.shop/api/photo/kakaodata"

  //             webUrl: "https://photo-pie.shop",
  //             // photoUrl,
  //           },
  //         },
  //         buttons: [
  //           {
  //             title: "다운로드", // 버튼 제목
  //             link: {
  //               mobileWebUrl: "https://photo-pie.shop",
  //               // photoUrl, // ‘다운로드‘ 버튼 클릭시 다운로드 할 이미지 링크로 이동
  //               webUrl: "https://photo-pie.shop",
  //               // photoUrl,
  //             },
  //           },
  //         ],
  //       });
  //     }
  //   };

  //   return (
  //     <div>
  //       <button
  //         id="kakao-link-btn"
  //         //  onClick={() => ShareKakaoSend(photoUrl)}
  //       >
  //         {/* <img
  //           src={`${process.env.PUBLIC_URL}/assets/KakaoLogo.png`}
  //           alt={"Kakao Logo"}
  //         /> */}
  //       </button>
  //     </div>
  //   );
  // };

  //--------------새로 아래
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

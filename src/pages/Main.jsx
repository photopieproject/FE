import styled, { css } from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import MainSlider from "../components/Main/MainSlider";
import FraimSlider1 from "../components/Main/FrameSlider1";
import FraimSlider2 from "../components/Main/FrameSlider2";
// import { useNavigate } from "react-router-dom";
const Main = () => {
  // const navigate = useNavigate();

  return (
    <div>
      <StDiv MainBox>
        <StDiv MainTop>
          <StDiv MainTopContents>
            <StDiv MainSliderBox>
              <MainSlider />
              {/* <StBtn MainTopStartBtn>
                  START
                  <AiOutlineArrowRight />
                </StBtn>
              </MainSlider> */}
            </StDiv>
            {/* <StP MainTopTitleP>SHARE YOUR MOMENT</StP>
            <StP MainTopSubP>일상을 나누다. 순간을 공유하다.</StP> */}
          </StDiv>

          {/* <StDiv MainTopImgBox>
            <StImg
              SinyoungBack_2
              alt="SinyoungBack_2"
              src="/image/SinyoungBack_2.jpg"
            /> */}
          {/* <StImg
              SinyoungBack1
              alt="SinyoungBack"
              src="/image/SinyoungBack.jpg"
            />
            <StImg
              SinyoungBack2
              alt="SinyoungBack"
              src="/image/SinyoungBack.jpg"
            />
            <StImg
              SinyoungBack3
              alt="SinyoungBack"
              src="/image/SinyoungBack.jpg"
            />
            <StImg
              SinyoungBack4
              alt="SinyoungBack"
              src="/image/SinyoungBack.jpg"
            /> */}
          {/* </StDiv> */}
        </StDiv>
        <StDiv MainLine>
          <StDiv MainLine1>PHOTO-PIE DIFFERENT SPACES SAME MEMORY</StDiv>
          <StDiv MainLine2>PHOTO-PIE DIFFERENT SPACES SAME MEMORY</StDiv>
        </StDiv>
        {/* <StDiv MainAbout>
          <StDiv MainAboutImg>IMAGE</StDiv>
          <StDiv MainAboutTextBox>
            <StP MainAboutTextP>
              서로 다른 공간에 있지만 그 순간을 함께 남겨둘 수 있다면?
            </StP>
            <StP MainAboutTextP>
              포토 파이에서 일상을 나누는 즐거움을 경험해보세요!
            </StP>
            <br />
            <StP MainAboutTextP>DIFFERENT SPACES, SAME MEMORY.</StP>
            <StP MainAboutTextP>
              EXPERIENCE THE JOY OF SHARING YOUR DAILY MOMENTS
            </StP>
            <StP MainAboutTextP>WITH PHOTO PIE !</StP>
          </StDiv>
        </StDiv> */}
        {/* <StDiv MainMiddle>
          <StDiv MainMiddleTextBox>
            <StP MainMiddleText>A PIECE OF PIE FOR EVERYONE</StP>
          </StDiv>
          <StDiv MainMiddleCardBox>
            <StDiv MainMiddleCardPlace>
              <StDiv MainMiddleCardImg></StDiv>
              <StDiv MainMiddleCardP>
                <StP MainMiddleCardPTitle>방 만들기</StP>
                <StDiv MainMiddleCardPSub>
                  <StP MainMiddleCardPSubP>
                    +버튼을 눌러 바로 촬영할 수 있는
                  </StP>
                  <StP MainMiddleCardPSubP>방을 만들어보세요</StP>
                </StDiv>
              </StDiv>
            </StDiv>
            <StDiv MainMiddleCardPlace>
              <StDiv MainMiddleCardImg></StDiv>
              <StDiv MainMiddleCardP>
                <StP MainMiddleCardPTitle>프레임 선택</StP>
                <StDiv MainMiddleCardPSub>
                  <StP MainMiddleCardPSubP>사용자를 초대한 뒤</StP>
                  <StP MainMiddleCardPSubP>원하는 프레임을 선택하고</StP>
                  <StP MainMiddleCardPSubP>촬영을 준비하세요</StP>
                </StDiv>
              </StDiv>
            </StDiv>
            <StDiv MainMiddleCardPlace>
              <StDiv MainMiddleCardImg></StDiv>
              <StDiv MainMiddleCardP>
                <StP MainMiddleCardPTitle>촬영 및 다운로드</StP>
                <StDiv MainMiddleCardPSub>
                  <StP MainMiddleCardPSubP>
                    자동으로 파이박스에 저장된 사진을
                  </StP>
                  <StP MainMiddleCardPSubP>
                    다운로드하여 친구들과 공유하세요
                  </StP>
                </StDiv>
              </StDiv>
            </StDiv>
          </StDiv>
          <StBtn MainMiddleGoBtn>
            자세히 알아보기
            <AiOutlineArrowRight />
          </StBtn>
        </StDiv> */}
        {/* <StDiv MainFrames>
          <StDiv MainFramesTitle>
            <StP MainFramesTitleP style={{ margin: "10px" }}>
              PHOTO FRAMES
            </StP>
          </StDiv>
          <StDiv MainFramesCardContainer>
            <StDiv MainFramesBox>
              <StDiv MainFramesPBox>
                <StP MainFramesP>Solid Colors</StP>
              </StDiv>
              <FraimSlider1 />
            </StDiv>
            <StDiv MainFramesBox>
              <StDiv MainFramesPBox>
                <StP MainFramesP>Color Gradients</StP>
              </StDiv>
              <FraimSlider2 />
            </StDiv>
          </StDiv>
        </StDiv> */}
      </StDiv>
    </div>
  );
};

const StDiv = styled.div`
  ${(props) =>
    props.MainBox &&
    css`
      width: 100vw;
      height: 100vh - 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* border: 1px solid black; */
    `}

  ${(props) =>
    props.MainTop &&
    css`
      width: 100%;
      height: 100vh - 100px;
      background-color: #e6ddca;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `}

  ${(props) =>
    props.MainSliderBox &&
    css`
      width: 100%;
      height: 100vh - 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30px;
      }
    `}
  ${(props) =>
    props.MainTopContents &&
    css`
      width: 100%;
      height: 100vh - 100px;
      background-color: #eee8dc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `}
    
  ${(props) =>
    props.MainTopImgBox &&
    css`
      width: 100%;
      height: 100%;
      /* background-color: gray; */
      /* display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start; */
    `}

${(props) =>
    props.MainLine &&
    css`
      width: 100%;
      height: 35px;
      background-color: white;
      font-weight: bold;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    `}
      
      ${(props) =>
    props.MainAbout &&
    css`
      width: 100%;
      height: 516px;
      background-color: #eee8dc;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      gap: 20px;
    `}

      ${(props) =>
    props.MainAboutImg &&
    css`
      width: 700px;
      height: 400px;
      border: 1px solid black;
    `}

    ${(props) =>
    props.MainAboutTextBox &&
    css`
      width: 700px;
      height: 400px;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}

${(props) =>
    props.MainMiddle &&
    css`
      width: 100%;
      height: 1200px;
      background-color: gray;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}

${(props) =>
    props.MainMiddleTextBox &&
    css`
      display: flex;
      justify-content: center;
      margin: 20px 0;
    `}

${(props) =>
    props.MainMiddleCardBox &&
    css`
      display: flex;
      justify-content: center;
      gap: 30px;
    `}

${(props) =>
    props.MainMiddleCardImg &&
    css`
      width: 400px;
      height: 500px;
      background-color: white;
    `}

    ${(props) =>
    props.MainMiddleCardPSub &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

    ${(props) =>
    props.MainFrames &&
    css`
      width: 100%;
      height: 900px;
      background-color: #dadada;
      padding-bottom: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

      ${(props) =>
    props.MainFramesTitle &&
    css`
      font-size: 60px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin: 0px;
    `}

    ${(props) =>
    props.MainFramesCardContainer &&
    css`
      width: 95%;
      height: 800px;
      border: 1px solid black;
      background-color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
    `}
    
    ${(props) =>
    props.MainFramesBox &&
    css`
      width: 95%;
      height: 350px;
      border: 1px solid black;
      background-color: #cecece;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
    
    ${(props) =>
    props.MainFramesCard &&
    css`
      width: 95%;
      height: 550px;
      border: 1px solid black;
      background-color: white;
    `}
    ${(props) =>
    props.MainFramesPBox &&
    css`
      width: 95%;
      height: 50px;
      display: flex;
    `}
    ${(props) =>
    props.MainMiddleCardP &&
    css`
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;

const StBtn = styled.button`
  ${(props) =>
    props.MainTopStartBtn &&
    css`
      margin-top: 200px;
      width: 250px;
      height: 50px;
      background-color: white;
      box-shadow: 7px 7px 0px 1px black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      cursor: pointer;
    `}

  ${(props) =>
    props.MainMiddleGoBtn &&
    css`
      width: 350px;
      height: 50px;
      background-color: white;
      box-shadow: 7px 7px 0px 1px black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      margin: 50px 0;
      cursor: pointer;
    `}
`;
const StP = styled.p`
  ${(props) =>
    props.MainTopTitleP &&
    css`
      height: 20px;
      font-size: 60px;
      font-weight: bold;
    `}

  ${(props) =>
    props.MainTopSubP &&
    css`
      height: 40px;
      margin-top: 0px;
      font-size: 20px;
    `}
 
 ${(props) =>
    props.MainAboutTextP &&
    css`
      font-weight: bold;
      font-size: 24px;
      margin: 0px;
    `}

    ${(props) =>
    props.MainMiddleText &&
    css`
      font-size: 60px;
      font-weight: bold;
      margin: 0px 0 80px 0;
    `}

    /* ${(props) =>
    props.MainMiddleCardP &&
    css`
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `} */
   
   ${(props) =>
    props.MainMiddleCardPTitle &&
    css`
      font-weight: bold;
      font-size: 30px;
      margin: 10px 0px;
    `}
    
    ${(props) =>
    props.MainMiddleCardPSubP &&
    css`
      font-size: 25px;
      margin: 0;
    `}
    
    ${(props) =>
    props.MainFramesP &&
    css`
      display: flex;
      font-size: 30px;
      margin: 0px;
    `}
`;

const StImg = styled.img`
  ${(props) =>
    props.SinyoungBack_2 &&
    css`
      width: 100%;
      height: 100%;
    `}
  ${(props) =>
    props.SinyoungBack1 &&
    css`
      width: 300px;
      height: 450px;
      margin: 50px 0px;
    `}
  ${(props) =>
    props.SinyoungBack2 &&
    css`
      width: 300px;
      height: 450px;
      margin: 0px 0px -50px -150px;
    `}
  ${(props) =>
    props.SinyoungBack3 &&
    css`
      width: 300px;
      height: 450px;
      margin: 0px 0px -150px -150px;
    `}
  ${(props) =>
    props.SinyoungBack4 &&
    css`
      width: 300px;
      height: 450px;
      margin: 0px 0px -100px -100px;
    `}
`;
export default Main;

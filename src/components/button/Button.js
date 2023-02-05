import styled, { css } from "styled-components";

const Button = (props) => {
  const {
    children,
    onClick,
    kakao,
    down,
    room_btn,
    start_camera,
    camera_btn1,
    camera_btn2,
    camera_btn3,
    camera_btn4,
    photo_trans,
    disabled,
    oneDis,
    twoDis,
    threeDis,
    fourDis,
    saveDisabled,
    create_img,
    PnBtn,
    pnDisabled,
  } = props;
  return (
    <StButton
      onClick={onClick}
      kakao={kakao}
      down={down}
      room_btn={room_btn}
      start_camera={start_camera}
      camera_btn1={camera_btn1}
      camera_btn2={camera_btn2}
      camera_btn3={camera_btn3}
      camera_btn4={camera_btn4}
      photo_trans={photo_trans}
      disabled={disabled}
      oneDis={oneDis}
      twoDis={twoDis}
      threeDis={threeDis}
      fourDis={fourDis}
      saveDisabled={saveDisabled}
      create_img={create_img}
      PnBtn={PnBtn}
      pnDisabled={pnDisabled}
    >
      {children}
    </StButton>
  );
};

const StButton = styled.button`
  border: 0;
  cursor: pointer;
  ${(props) =>
    props.down &&
    css`
            border-radius: 10px;
            background-color: #3a3232;
            color: #fffaf2;
            width: 200px;
            height: 50px;,
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        `}
  ${(props) =>
    props.room_btn &&
    css`
      /* font-family: "Nanum Myeongjo", serif; */
      background-color: #3a3232;
      border-radius: 50px;
      color: #fffaf2;
      width: 150px;
      height: 35px;
      margin-top: 20px;
      transition: background-color 0.25s ease-in-out;
      &:hover {
        background-color: #af9462;
      }
    `}
        ${(props) =>
    props.start_camera &&
    css`
      border-radius: 50px;
      width: 220px;
      height: 50px;
      font-size: 16px;
      margin-top: 50px;
      background-color: #3a3232;
      color: #fffaf2;
    `}
        ${(props) =>
    props.camera_btn1 &&
    css`
      border-radius: 10px;
      width: 100px;
      height: 100px;
      font-size: 16px;
      color: ${({ oneDis }) => (oneDis ? "#3a3232" : "#fffaf2")};
      transition: background-color 0.25s ease-in-out;
      background-color: ${({ oneDis }) => (oneDis ? "#f2eeee" : "#3a3232")};
      &:hover {
        background-color: #f2eeee;
        color: #3a3232;
      }
    `}
        ${(props) =>
    props.camera_btn2 &&
    css`
      border-radius: 10px;
      width: 100px;
      height: 100px;
      font-size: 16px;
      color: ${({ twoDis }) => (twoDis ? "#3a3232" : "#fffaf2")};
      transition: background-color 0.25s ease-in-out;
      background-color: ${({ twoDis }) => (twoDis ? "#f2eeee" : "#3a3232")};
      &:hover {
        background-color: #f2eeee;
        color: #3a3232;
      }
    `}
        ${(props) =>
    props.camera_btn3 &&
    css`
      border-radius: 10px;
      width: 100px;
      height: 100px;
      font-size: 16px;
      color: ${({ threeDis }) => (threeDis ? "#3a3232" : "#fffaf2")};
      transition: background-color 0.25s ease-in-out;
      background-color: ${({ threeDis }) => (threeDis ? "#f2eeee" : "#3a3232")};
      &:hover {
        background-color: #f2eeee;
        color: #3a3232;
      }
    `}
        ${(props) =>
    props.camera_btn4 &&
    css`
      border-radius: 10px;
      width: 100px;
      height: 100px;
      font-size: 16px;
      color: ${({ fourDis }) => (fourDis ? "#3a3232" : "#fffaf2")};
      transition: background-color 0.25s ease-in-out;
      background-color: ${({ fourDis }) => (fourDis ? "#f2eeee" : "#3a3232")};
      &:hover {
        background-color: #f2eeee;
        color: #3a3232;
      }
    `}
        ${(props) =>
    props.photo_trans &&
    css`
      border-radius: 10px;
      background-color: ${({ saveDisabled }) =>
        saveDisabled ? "#f2eeee" : "#3a3232"};
      color: ${({ saveDisabled }) => (saveDisabled ? "#3a3232" : "#fffaf2")};
      // cursor 안먹힘 수정 예정
      cursor: ${({ saveDisabled }) => (saveDisabled ? "defalut" : "pointer")};
      width: 200px;
      height: 50px;
    `}
        ${(props) =>
    props.create_img &&
    css`
      border-radius: 10px;
      background-color: #e2d6c5;
      color: #3a3232;
      width: 200px;
      height: 50px;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      transition: background-color 0.25s ease-in-out;
      &:hover {
        background-color: #3a3232;
        color: #fffaf2;
      }
    `}
    ${(props) =>
    props.PnBtn &&
    css`
      width: 120px;
      height: 40px;
      border-radius: 10px;
      margin-left: 10px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
        background-color: #3a3232;
        color: #fffaf2;
      }
      background: ${({ pnDisabled }) => (pnDisabled ? "#d9d9d9" : "#fffaf2")};
      color: ${({ pnDisabled }) => (pnDisabled ? "#fffaf2" : "#3a3232")};
      border: ${({ pnDisabled }) =>
        pnDisabled ? "none" : "2px solid #3a3232"};
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      &:disabled {
        background-color: #ddd8d8;
      }
    `}
`;

export default Button;

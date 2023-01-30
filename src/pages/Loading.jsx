import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

const Loading = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  console.log(roomId);

  useEffect(() => {
    setTimeout(() => {
      navigate(`/photosave/${roomId}`);
      // }, 30000); //잠시 바꿔놓겠습니다~!
    }, 3000);
  });

  return (
    <StDiv container>
      <StDiv box>
        <StDiv loader4></StDiv>
      </StDiv>
    </StDiv>
  );
};

const StDiv = styled.div`
  ${(props) =>
    props.container &&
    css`
      width: 100%;
      height: 100%;
      text-align: center;
      background-color: #478ba2;
      overflow: hidden;
    `}
  ${(props) =>
    props.box &&
    css`
      display: inline-block;
      height: 82.5vh;
      width: 100%;
      float: left;
      position: relative;
      /*margin:0 -4px -5px -2px;*/
      transition: all 0.2s ease;
    `}
        ${(props) =>
    props.loader4 &&
    css`
      position: relative;
      width: 250px;
      height: 40px;
      top: 45%;
      top: -webkit-calc(50% - 10px);
      top: calc(50% - 10px);
      left: 25%;
      left: -webkit-calc(50% - 75px);
      left: calc(50% - 75px);
      background-color: rgba(255, 255, 255, 0.2);
      &::before {
        content: "";
        position: absolute;
        background-color: #fff;
        top: 0px;
        left: 0px;
        height: 40px;
        width: 0px;
        z-index: 0;
        opacity: 1;
        -webkit-transform-origin: 100% 0%;
        transform-origin: 100% 0%;
        -webkit-animation: loader4 10s ease-in-out infinite;
        animation: loader4 10s ease-in-out infinite;
      }
      &::after {
        content: "LOADING ...";
        color: #fff;
        font-family: Lato, "Helvetica Neue";
        font-weight: 200;
        font-size: 20px;
        position: absolute;
        width: 100%;
        height: 40px;
        line-height: 40px;
        left: 0;
        top: 0;
      }
      @-webkit-keyframes loader4 {
        0% {
          width: 0px;
        }
        70% {
          width: 100%;
          opacity: 1;
        }
        90% {
          opacity: 0;
          width: 100%;
        }
        100% {
          opacity: 0;
          width: 0px;
        }
      }

      @keyframes loader4 {
        0% {
          width: 0px;
        }
        70% {
          width: 100%;
          opacity: 1;
        }
        90% {
          opacity: 0;
          width: 100%;
        }
        100% {
          opacity: 0;
          width: 0px;
        }
      }
    `}
`;

export default Loading;

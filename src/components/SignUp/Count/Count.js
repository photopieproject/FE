import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const Count = ({ ss }) => {
  const [seconds, setSeconds] = useState(parseInt(ss));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        clearInterval(countdown);
      } else {
        setSeconds(3);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <StDiv CountBox>
      <p>촬영 카운트</p>
      <StDiv CountNum>{seconds < 5 ? `${seconds}` : seconds}</StDiv>
    </StDiv>
  );
};
const StDiv = styled.div`
  ${(props) =>
    props.CountBox &&
    css`
      font-family: sans-serif;
      text-align: center;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      flex-direction: column;
      height: 30px;
    `}

  ${(props) =>
    props.CountNum &&
    css`
      font-size: 20px;
      font-weight: bold;
      margin: auto;
      text-align: center;
    `}
`;
export default Count;

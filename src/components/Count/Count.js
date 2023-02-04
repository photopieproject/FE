// import { useEffect, useRef, useState } from "react";

// const Count = () => {
//   const [sec, setSec] = useState();
//   const time = useRef(3);
//   const timerId = useRef(null);

//   useEffect(() => {
//     timerId.current = setInterval(() => {
//       setSec(time.current % 60);
//       time.current -= 1;
//     }, 1000);

//     return () => clearInterval(timerId.current);
//   }, []);

//   useEffect(() => {
//     //만약 타임아웃이 발생했을 경우
//     if (time.current === -1) {
//       console.log("타임 아웃");
//       clearInterval(timerId.current);
//       //dispatch event
//     }
//   }, [sec]);

//   return <div className="timer">{sec}초</div>;
// };
// export default Count;

//----다시-------
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

function Count() {
  const [showCount, setShowCount] = useState(true);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(5);
  const time = useRef(4);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= -1) {
      Swal.fire({
        title: "촬영완료 ! ",
        text: "촬영이 완료되었습니다:)",
      });
      clearInterval(timerId.current);
      setShowCount(false);
    }
  }, [sec]);

  return (
    <StDiv>
      {showCount && (
        <StP>
          &nbsp;&nbsp;{min} : {sec} 초 후 촬영됩니다 !
        </StP>
      )}
    </StDiv>
  );
}

const StP = styled.p`
  color: gray;
  font-size: 13px;
  font-weight: bolder;
`;

const StDiv = styled.div`
  margin-top: 10px;
  margin-left: 5px;
  align-items: center;
  color: orange;
  width: 200px;
  height: 40px;
`;
export default Count;

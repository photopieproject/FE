import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

function SmsCount() {
  const [min, setMin] = useState(2);
  const [sec, setSec] = useState(59);
  const time = useRef(179);
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
    if (time.current <= 0) {
      Swal.fire({
        icon: "error",
        title: "인증번호 만료",
        text: "인증번호를 다시 보내주세요!",
      });
      clearInterval(timerId.current);
    }
  }, [sec]);

  return (
    <StDiv>
      <StP>
        입력시간 &nbsp;&nbsp;{min} : {sec}
      </StP>
    </StDiv>
  );
}

const StP = styled.p`
  color: gray;
  font-size: 12px;
`;

const StDiv = styled.div`
  margin-top: 10px;
  margin-left: 5px;
  align-items: center;
  color: orange;
  width: 200px;
  height: 40px;
`;
export default SmsCount;

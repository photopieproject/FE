import { useEffect, useRef, useState } from "react";

const Count = () => {
  const [sec, setSec] = useState();
  const time = useRef(3);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    //만약 타임아웃이 발생했을 경우
    if (time.current === -1) {
      console.log("타임 아웃");
      clearInterval(timerId.current);
      //dispatch event
    }
  }, [sec]);

  return <div className="timer">{sec}초</div>;
};
export default Count;

import ResetPW from "../components/Find/ResetPW";
import FindPWMsg from "../components/Find/FindPWMsg";
import { useState } from "react";

//삼항연산자, 제어문

const FindPW = () => {
  const [show, setShow] = useState(false);
  // show =1 Registration...
  // show =2 Agree2...

  return (
    <div>{show === true ? <ResetPW /> : <FindPWMsg setShow={setShow} />}</div>
  );
};
export default FindPW;

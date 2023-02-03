import ResetPW from "../components/Find/ResetPW";
import FindPWMsg from "../components/Find/FindPWMsg";
import { useState } from "react";

//삼항연산자, 제어문

const FindPW = () => {
  const [show, setShow] = useState(false);

  return (
    <div>{show === true ? <ResetPW /> : <FindPWMsg setShow={setShow} />}</div>
  );
};
export default FindPW;

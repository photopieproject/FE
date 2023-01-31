import { useState } from "react";
import FindId2 from "../components/Find/FindId2";
import FindId1 from "../components/Find/FindId1";

//삼항연산자, 제어문

const FindID = () => {
  const [show, setShow] = useState(false);

  return (
    <div>{show === true ? <FindId2 /> : <FindId1 setShow={setShow} />}</div>
  );
};
export default FindID;

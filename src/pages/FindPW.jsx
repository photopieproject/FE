import ResetPW from "../components/Find/ResetPW";
import FindPWMsg from "../components/Find/FindPWMsg";
import { useState } from "react";
import { useInput } from "../lib/utils/useInput";

//삼항연산자, 제어문

const FindPW = () => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useInput();
  console.log(userId);
  return (
    <div>
      {show === true ? (
        <ResetPW userId={userId} setUserId={setUserId} />
      ) : (
        <FindPWMsg setShow={setShow} userId={userId} setUserId={setUserId} />
      )}
    </div>
  );
};
export default FindPW;

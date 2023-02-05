import Registration from "../components/SignUp/Registration";
import Agree2 from "../components/SignUp/Agree2";
import { useState } from "react";
import styled from "styled-components";

//삼항연산자, 제어문

const SignUp = () => {
  const [show, setShow] = useState(false);
  // show =1 Registration...
  // show =2 Agree2...

  return (
    <StDiv>
      {show === true ? <Registration /> : <Agree2 setShow={setShow} />}
    </StDiv>
  );
};
const StDiv = styled.div`
  width: 100%;
`;
export default SignUp;

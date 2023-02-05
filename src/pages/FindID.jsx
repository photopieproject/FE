import { useState } from "react";
import FindId2 from "../components/Find/FindId2";
import FindId1 from "../components/Find/FindId1";
import styled from "styled-components";

//삼항연산자, 제어문

const FindID = () => {
  const [show, setShow] = useState(false);

  return (
    <StDiv>{show === true ? <FindId2 /> : <FindId1 setShow={setShow} />}</StDiv>
  );
};
const StDiv = styled.div`
  width: 100%;
`;
export default FindID;

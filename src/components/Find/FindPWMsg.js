import styled, { css } from "styled-components";

function FindPWMsg({ setShow }) {
  //삼항연산자

  return (
    <div>
      <StDiv FindPWMsgBox></StDiv>
    </div>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.FindPWMsg &&
    css`
      width: 500px;
      height: 600px;
      border: 1px solid black;
      color: black;
    `}
`;
export default FindPWMsg;

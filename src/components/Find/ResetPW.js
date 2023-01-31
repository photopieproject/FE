import styled, { css } from "styled-components";

function ResetPW() {
  //삼항연산자

  return (
    <div>
      <StDiv ResetPWBox></StDiv>
    </div>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.ResetPWBox &&
    css`
      width: 500px;
      height: 600px;
      border: 1px solid black;
      color: black;
    `}
`;
export default ResetPW;

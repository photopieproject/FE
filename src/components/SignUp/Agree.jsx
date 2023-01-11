// import { useNavigate } from "react-router-dom";
// import styled, { css } from "styled-components";

// const Agree = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       {/* <StDiv AgreeBox> */}
//       {/* <StDiv Agree>회원가입</StDiv> */}
//       <StDiv AgreeBody>
//         <StDiv>
//           {/* <input id="allAgree" type="checkbox" />
//           <label htmlFor="allAgree">전체 동의</label> */}
//           {/* 라벨이랑 연결해줘야 내용눌러도 체크됨 */}
//           {/* <hr /> */}
//           <div>
//             {/* <input id="terms" type="checkbox" />
//             <label htmlFor="terms">(필수) 이용약관 동의</label>
//             <StBtn AgreeBtn onClick={() => navigate("/terms")}>
//               약관보기
//             </StBtn> */}
//           </div>
//           <div>
//             {/* <input id="private" type="checkbox" />
//             <label htmlFor="private">(필수) 개인정보처리 동의</label>
//             <StBtn AgreeBtn onClick={() => navigate("/private")}>
//               약관보기
//             </StBtn> */}
//           </div>
//           <div>
//             {/* <input id="marketing" type="checkbox" />
//             <label htmlFor="marketing">(선택) 마케팅 동의</label>
//             <StBtn AgreeBtn onClick={() => navigate("/marketing")}>
//               약관보기
//             </StBtn> */}
//           </div>
//         </StDiv>
//       </StDiv>
//       {/* <hr /> */}
//       {/* <StDiv SMSSend>
//           <StP SMSMsg>SMS 문자 인증</StP>
//           <div>
//             <StInput SMSInput placeholder="'-' 없이 기입해주세요"></StInput>
//             <StBtn SMSBtn>전송</StBtn>
//           </div>
//           <div>
//             <StInput SMSInput placeholder="숫자 4자리"></StInput>
//             <StBtn SMSBtn>인증</StBtn>
//           </div>
//           <StBtn NextGoBtn>다음</StBtn>
//         </StDiv> */}
//       {/* </StDiv> */}
//     </div>
//   );
// };

// const StInput = styled.input`
//   ${(props) =>
//     props.SMSInput &&
//     css`
//       width: 200px;
//       height: 30px;
//       margin-right: 5px;
//     `}
// `;

// const StDiv = styled.div`
//   ${(props) =>
//     props.AgreeBox &&
//     css`
//       width: 400px;
//       height: 600px;
//       border: 1px solid black;
//       color: black;
//     `}

//   ${(props) =>
//     props.Agree &&
//     css`
//       font-size: 30px;
//       font-weight: bold;
//       display: flex;
//       justify-content: center;
//       margin: 30px 0 0px 0;
//       color: #706fd3;
//     `}

//   ${(props) =>
//     props.AgreeBody &&
//     css`
//       margin-top: 30px;
//     `}

//   ${(props) =>
//     props.SMSSend &&
//     css`
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//     `};
// `;

// const StP = styled.p`
//   ${(props) =>
//     props.SMSMsg &&
//     css`
//       font-weight: bold;
//       font-size: 18px;
//     `}
// `;

// const StBtn = styled.button`
//   ${(props) =>
//     props.AgreeBtn &&
//     css`
//       width: 80px;
//       height: 30px;
//       -radius: 8px;
//       margin: 10px 0 10px 10px;
//       background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
//       background-size: 200%;
//       transition: 500ms;
//       border: none;
//       color: white;
//       font-weight: bold;
//       font-size: 14px;
//       &:hover {
//         cursor: pointer;
//         background-position: right;
//         /* font-size: 15px; */
//       }
//     `}

//   ${(props) =>
//     props.SMSBtn &&
//     css`
//       width: 50px;
//       height: 30px;
//       border-radius: 10px;
//       margin: 10px auto;
//       background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
//       background-size: 200%;
//       transition: 500ms;
//       border: none;
//       color: white;
//       font-weight: bold;
//       font-size: 14px;
//       &:hover {
//         cursor: pointer;
//         background-position: right;
//         /* font-size: 15px; */
//       }
//     `}

//   ${(props) =>
//     props.NextGoBtn &&
//     css`
//       width: 90px;
//       height: 40px;
//       border-radius: 15px;
//       margin: 10px auto;
//       background: linear-gradient(120deg, #706fd3, #b7a7ff, #706fd3);
//       background-size: 200%;
//       transition: 500ms;
//       border: none;
//       color: white;
//       font-weight: bold;
//       font-size: 16px;
//       &:hover {
//         cursor: pointer;
//         background-position: right;
//         /* font-size: 15px; */
//       }
//     `}
// `;

// export default Agree;

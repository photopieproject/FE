// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Span from "../button/Span";
import Swal from "sweetalert2";

const Header = () => {
    const navigate = useNavigate();

    return (
        <StDiv>
            <StDiv nav_main>
                <Span nav_logo onClick={() => navigate("/")}>
                    <StImg src="/image/logo.png" alt="logo" />
                </Span>
                <StDiv log_sign>
                    {/* <StSpan onClick={() => navigate("/login")}>로그인</StSpan> */}
                    {/* 토큰이 있으면 로그아웃으로 버튼 변경(누르면 쿠키삭제) / 토큰 없으면 로그인 버튼 */}
                    {/*  */}
                    {!localStorage.getItem("id") &&
                    !localStorage.getItem("Authorization") ? (
                        <Span onClick={() => navigate("/login")}>로그인</Span>
                    ) : (
                        <Span
                            onClick={() => {
                                // __postLogout();
                                Swal.fire(
                                    "Logout",
                                    "로그아웃 되었습니다",
                                    "success"
                                );
                                // alert("로그아웃 되었습니다!");
                                localStorage.removeItem("id");
                                localStorage.removeItem("nickname");
                                localStorage.removeItem("Authorization");
                                navigate("/login");
                            }}
                        >
                            로그아웃
                        </Span>
                    )}
                    <Span onClick={() => navigate("/signup")}>회원가입</Span>
                </StDiv>
            </StDiv>
            <StDiv nav_category>
                {/* <StDiv cate_gory>
                    <Span cate_txt active_txt onClick={() => navigate("/")}>
                        Home
                    </Span>
                    <Span cate_txt onClick={() => navigate("/roomopen")}>
                        RoomOpen
                    </Span>
                    <Span cate_txt onClick={() => navigate("/roomwaiting")}>
                        RoomWaiting
                    </Span>
                    <Span cate_txt onClick={() => navigate("/frame")}>
                        Frame
                    </Span>
                    <Span cate_txt onClick={() => navigate("/photoshoot")}>
                        PhotoShoot
                    </Span>
                    <Span cate_txt onClick={() => navigate("/loading")}>
                        Loading
                    </Span>
                    <Span cate_txt onClick={() => navigate("/photosave")}>
                        PhotoSave
                    </Span>
                </StDiv> */}
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.nav_main &&
        css`
            max-width: 1200px;
            /* width: 100%; */
            height: 35px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            margin: 0 auto;
            /* background-color: #eee8dc; */
        `}
    ${(props) =>
        props.nav_category &&
        css`
            display: flex;
            gap: 60px;
            align-items: baseline;
        `}
  ${(props) =>
        props.cate_gory &&
        css`
            display: flex;
            gap: 30px;
        `}
  ${(props) =>
        props.log_sign &&
        css`
            display: flex;
            gap: 15px;
        `}
`;

const StImg = styled.img`
    width: 250px;
`;

export default Header;

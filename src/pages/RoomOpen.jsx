import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import { useInput } from "../lib/utils/useInput";
import { __createRoom, __enterPhotoRoom } from "../redux/modules/videoSlice";
import Swal from "sweetalert2";

const RoomOpen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useInput();
    const [roomCode, setRoomCode] = useInput();

    const createRoomSubmit = () => {
        dispatch(__createRoom({ roomName }))
            .then((res) => {
                console.log("createRoom res---->", res);
                if (res.payload.statusCode === 200) {
                    Swal.fire("Success", res.payload.statusMsg, "success");
                    navigate(`/frame/${res.payload.data1.id}`);
                } else if (res.payload.data.statusCode === 400) {
                    Swal.fire("Error", res.payload.data.statusMsg, "error");
                } else if (
                    res.payload.data.statusCode === 401 ||
                    res.payload.status === 403
                ) {
                    Swal.fire(
                        "토큰이 만료되었습니다",
                        "다시 로그인해주세요!",
                        "error"
                    );
                    localStorage.removeItem("id");
                    localStorage.removeItem("nickname");
                    localStorage.removeItem("Authorization");
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log("createRoom err---->", err.payload.response.data);
            });
    };

    const enterRoomSubmit = () => {
        dispatch(__enterPhotoRoom({ roomCode }))
            .then((res) => {
                console.log("enterRoom res--->", res);
                if (res.payload.statusCode === 200) {
                    Swal.fire("Success", res.payload.statusMsg, "success");
                    navigate(`/photoshoot/${res.payload.data1.id}`);
                } else if (res.payload.data.statusCode === 400) {
                    Swal.fire("Error", res.payload.data.statusMsg, "error");
                } else if (
                    res.payload.data.statusCode === 401 ||
                    res.payload.status === 403
                ) {
                    Swal.fire(
                        "토큰이 만료되었습니다",
                        "다시 로그인해주세요!",
                        "error"
                    );
                    localStorage.removeItem("id");
                    localStorage.removeItem("nickname");
                    localStorage.removeItem("Authorization");
                    navigate("/login");
                }
            })
            .catch((err) => console.log("enterRoom err--->", err));
    };

    return (
        <StDiv room_open>
            <StP>방 만들기</StP>
            <StDiv room_box>
                <StInput
                    type="text"
                    placeholder="방 이름을 입력하세요"
                    value={roomName}
                    onChange={setRoomName}
                />
                <Button room_btn onClick={createRoomSubmit}>
                    방 개설하기
                </Button>
            </StDiv>
            <StP>코드로 방 찾기</StP>
            <StDiv room_box>
                <StInput
                    type="text"
                    placeholder="방 코드를 입력하세요"
                    value={roomCode}
                    onChange={setRoomCode}
                />
                <Button room_btn onClick={enterRoomSubmit}>
                    방 입장하기
                </Button>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.room_open &&
        css`
            width: 95%;
            max-width: 500px;
            padding: 10px;
            box-sizing: border-box;
        `}
    ${(props) =>
        props.room_box &&
        css`
            width: 95%;
            display: flex;
            flex-direction: column;
            align-items: center;
        `}
`;

const StInput = styled.input`
    width: 100%;
    /* width: 500px;
    height: 35px; */
    font-size: 16px;
    background-color: #fffaf2;
    color: #3a3232;
    border: 0;
    border-bottom: 2px solid #3a3232;
    padding: 10px;
    &:focus {
        outline: none;
    }
`;

const StP = styled.p`
    font-weight: bold;
    font-size: 18px;
    /* font-family: "Nanum Myeongjo", serif; */
    /* background-color: #3a3232;
    color: #fffaf2;
    width: 200px;
    padding: 10px 5px; */
`;

export default RoomOpen;

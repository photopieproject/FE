import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
                    navigate(`/roomwaiting/${res.payload.data.id}`);
                } else if (res.payload.response.data.statusCode === 401) {
                    Swal.fire(
                        "토큰이 만료되었습니다",
                        "다시 로그인해주세요!",
                        "error"
                    );
                    localStorage.removeItem("id");
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
                    navigate(`/roomwaiting/${res.payload.data.id}`);
                } else if (res.payload.statusCode === 400) {
                    Swal.fire("Error", res.payload.statusMsg, "error");
                }
            })
            .catch((err) => console.log("enterRoom err--->", err));
    };

    return (
        <div>
            <div>
                <StH1>방 만들기</StH1>
                <div>
                    <p>방 만들기</p>
                    <StDiv>
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
                    <p>코드로 방 찾기</p>
                    <StDiv>
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
                </div>
            </div>
        </div>
    );
};

const StDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StInput = styled.input`
    width: 500px;
    height: 35px;
    font-size: 20px;
    border: 1px solid #7e7373;
    border-radius: 5px;
    padding: 10px;
`;

const StH1 = styled.h1`
    text-align: center;
`;

export default RoomOpen;

import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../components/button/Button";
import { useInput } from "../lib/utils/useInput";
import { __createRoom } from "../redux/modules/videoSlice";

const RoomOpen = () => {
    const dispatch = useDispatch();

    const [roomName, setRoomName] = useInput();

    const createRoomSubmit = (e) => {
        e.preventDefault();
        dispatch(__createRoom({ roomName }))
            .then((res) => console.log)
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <div>
                <StH1>방 만들기</StH1>
                <div>
                    <p>방 만들기</p>
                    <StForm onSubmit={createRoomSubmit}>
                        <StInput
                            type="text"
                            placeholder="방 이름을 입력하세요"
                            value={roomName}
                            onChange={setRoomName}
                        />
                        <Button room_btn>방 개설하기</Button>
                    </StForm>
                    <p>코드로 방 찾기</p>
                    <StForm>
                        <StInput
                            type="text"
                            placeholder="방 코드를 입력하세요"
                        />
                        <Button room_btn>방 입장하기</Button>
                    </StForm>
                </div>
            </div>
        </div>
    );
};

const StForm = styled.form`
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

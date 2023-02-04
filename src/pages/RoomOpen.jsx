import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";
import { useInput } from "../lib/utils/useInput";
import { __createRoom, __enterPhotoRoom } from "../redux/modules/videoSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const RoomOpen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useInput();
    const [roomCode, setRoomCode] = useInput();

    useEffect(() => {
        toast.success(
            "친구들과 함께 할 방을 만들거나\n 친구에게 초대받은 코드를 입력해주세요!\n 📷 카메라 허용 + 🎤마이크 허용을 \n꼭 진행하고 입장해주세요!",
            {
                style: {
                    borderRadius: "10px",
                    background: "#3a3232",
                    color: "#fffaf2",
                    fontSize: "13px",
                },
                iconTheme: {
                    primary: "#fffaf2",
                    secondary: "#3a3232",
                },
                duration: 6000,
            }
        );
    }, []);

    const createRoomSubmit = () => {
        dispatch(__createRoom({ roomName }))
            .then((res) => {
                console.log("createRoom res---->", res);
                if (res.payload.statusCode === 200) {
                    toast.success(res.payload.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#3a3232",
                            color: "#fffaf2",
                        },
                        iconTheme: {
                            primary: "#fffaf2",
                            secondary: "#3a3232",
                        },
                    });
                    navigate(`/frame/${res.payload.data1.id}`);
                    // setTimeout(() => {
                    // }, 1000);
                } else if (res.payload.data.statusCode === 400) {
                    toast.error(res.payload.data.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#fffaf2",
                            color: "#3a3232",
                        },
                        iconTheme: {
                            primary: "#3a3232",
                            secondary: "#fffaf2",
                        },
                    });
                } else if (
                    res.payload.data.statusCode === 401 ||
                    res.payload.status === 403
                ) {
                    toast.error("토큰이 만료되었습니다\n다시 로그인해주세요!", {
                        style: {
                            borderRadius: "10px",
                            background: "#fffaf2",
                            color: "#3a3232",
                        },
                        iconTheme: {
                            primary: "#3a3232",
                            secondary: "#fffaf2",
                        },
                    });

                    localStorage.removeItem("id");
                    localStorage.removeItem("nickname");
                    localStorage.removeItem("Authorization");

                    navigate("/login");
                    // setTimeout(() => {
                    // }, 1000);
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
                    toast.success(res.payload.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#3a3232",
                            color: "#fffaf2",
                        },
                        iconTheme: {
                            primary: "#fffaf2",
                            secondary: "#3a3232",
                        },
                    });
                    navigate(`/photoshoot/${res.payload.data1.id}`);
                    // setTimeout(() => {
                    // }, 1000);
                } else if (res.payload.data.statusCode === 400) {
                    toast.error(res.payload.data.statusMsg, {
                        style: {
                            borderRadius: "10px",
                            background: "#fffaf2",
                            color: "#3a3232",
                        },
                        iconTheme: {
                            primary: "#3a3232",
                            secondary: "#fffaf2",
                        },
                    });
                } else if (
                    res.payload.data.statusCode === 401 ||
                    res.payload.status === 403
                ) {
                    toast.error("토큰이 만료되었습니다\n다시 로그인해주세요!", {
                        style: {
                            borderRadius: "10px",
                            background: "#fffaf2",
                            color: "#3a3232",
                        },
                        iconTheme: {
                            primary: "#3a3232",
                            secondary: "#fffaf2",
                        },
                    });

                    localStorage.removeItem("id");
                    localStorage.removeItem("nickname");
                    localStorage.removeItem("Authorization");

                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            })
            .catch((err) => console.log("enterRoom err--->", err));
    };

    return (
        <StDiv room_open>
            <Toaster />
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
            <StP code_para>코드로 방 찾기</StP>
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
    ${(props) =>
        props.code_para &&
        css`
            margin-top: 70px;
        `}
`;

export default RoomOpen;

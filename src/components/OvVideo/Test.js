import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import { useEffect, useState } from "react";
import OpenViduVideoComponent from "./OvVideo";
import UserVideoComponent from "./UserVideoComponent";

const Test = () => {
    const APPLICATION_SERVER_URL = "https://photo-pie.shop";
    const [state, setState] = useState({
        // 화상 통화
        mySessionId: "SessionA",
        // 참가자의 닉네임
        myUserName: "Participant" + Math.floor(Math.random() * 100),
        // 바로 뒤에 선언되는 객체를 얻을 수 있음
        session: undefined,
        // 페이지의 메인 비디오, 게시자 또는 구독자 중 하나가 됨
        mainStreamManager: undefined,
        // 자체 로컬 웹캠 스트림
        publisher: undefined,
        // 배열은 화상 통화에서 다른 사용자의 활성 스트림을 저장
        subscribers: [],
    });

    // 1. OpenVidu 개체 가져오기
    const OV = new OpenVidu();

    // 2. 세션 초기화
    setState(
        {
            session: OV.initSession(),
        },
        () => {
            // 다음 단계 참조
        }
    );

    let mySession = state.session;

    // 3. 세션에서 이벤트 발생 시 동작 지정
    mySession.on("streamCreated", (event) => {
        // streamCreated >> Session 개체가 수신한 각각의
        // 새 Stream에 대해 구독하고 반환된 구독자 개체를 subscribers 배열에 저장함

        // 스트림을 구독하여 수신함. 두번째 매개변수가 정의되지 않음
        // 따라서 OpenVidu는 자체적으로 html비디오를 생성하지 않음
        let subscriber = mySession.subscribe(event.stream, undefined);

        // 보조 배열을 사용하여 새 스트림을 푸시함
        let subscribers = state.subscribers;

        subscribers.push(subscriber);

        // 새로운 구독자로 상태 업데이트
        setState({
            subscribers: subscribers,
        });
    });

    // 모든 스트림을 파괴함
    mySession.on("streamDestroyed", (event) => {
        // streamDestroyed >> Session 개체에서 제거된 각 Stream에 대해(사용자가 화상 통화를 나갔다는 의미)
        // 관련 Subscriber를 subscribers 배열에서 제거하므로 HTML에서 필요한 UserVideoComponent를 자동으로 삭제함
        // 각 Stream 개체에는 streamManager 소유한 구독자 또는 게시자를 나타내는 속성이 있음
        event.preventDefault();

        // 구독자 배열에서 스트림을 제거
        this.deleteSubscriber(event.stream.streamManager);
    });

    // 모든 예외에서 비동기
    mySession.on("exception", (exception) => {
        // 서버 측에서 예기치 않은 비동기 오류가 발생할 때 Session 개체에 의해 트리거되는 이벤트
        console.warn(exception);
    });

    // 다음 단계 참조

    // 4. 유효한 사용자 토큰으로 세션에 연결
    // OpenVidu 배포에서 토큰 가져오기
    // this.getToken().then((token) => {
    //     console.log('token--->', token)
    // })

    // 토큰을 사용하여 세선에 연결하는 방법
    const getToken = async () => {
        const sessionId = await createSession(state.mySessionId);
        return await createToken(sessionId);
    };

    const createSession = async (sessionId) => {
        const response = await axios.post(
            APPLICATION_SERVER_URL + "api/sessions",
            { customSessionId: sessionId },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data; // sessionId
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(
            APPLICATION_SERVER_URL +
                "api/sessions/" +
                sessionId +
                "/connetions",
            {},
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data; // token
    };

    // 4. 유효한 사용자 토큰으로 세션에 연결
    // OpenVidu 배포에서 토큰 가져오기
    useEffect(() => {
        getToken().then((token) => {
            console.log("token--->", token);

            // 첫 번째 매개변수는 OpenVidu 배포에서 얻은 토큰
            // 두번째 매개변수는 이벤트의 모든 사용자가 검색할 수 있음
            mySession
                .connect(token, { clientData: state.myUserName })
                .then(async () => {
                    // 5. 나만의 카메라 스트림 가져오기

                    // targetElement로 정의되지 않은 게시자를 전달하는 게시자를 초기화함
                    // OpenVidu가 비디오를 삽입하는 것을 원하지 않음
                    let publisher = await OV.initPublisherAsnc(undefined, {
                        // 오디오 소스. 정의되지 않은 기본 마이크인 경우
                        audioSource: undefined,
                        // 영상 출처. 정의되지 않은 기본 웹캠인 경우
                        videoSource: undefined,
                        // 음소거 해제된 오디오로 게시를 시작할지 여부
                        publishAudio: true,
                        // 비디오를 활성화한 상태에서 게시를 시작할지 여부
                        publishVideo: true,
                        // 비디오의 해상도
                        resolution: "640x480",
                        // 비디오의 프레임 속도
                        frameRate: 30,
                        // 동영상이 대상 요소 'video-container'에 삽입되는 방식
                        insertMode: "APPEND",
                        // 로컬 비디오 미러링 여부
                        mirror: false,
                    });

                    // 6. 스트림 게시
                    mySession.publish(publisher);

                    // 현재 사용 중인 비디오 장치 가져오기
                    let devices = await OV.getDevices();
                    let videoDevices = devices.filter(
                        (device) => device.kind === "videoinput"
                    );
                    let currentVideoDeviceId = publisher.stream
                        .getMediaStream()
                        .getVideoTracks()[0]
                        .getSettings().deviceId;
                    let currentVideoDevice = videoDevices.find(
                        (device) => device.deviceId === currentVideoDeviceId
                    );

                    // 웹캠을 표시하고 게시자를 저장하도록 페이지의 기본 비디오를 설정함
                    setState({
                        currentVideoDevice,
                        mainStreamManager: publisher,
                        publisher: publisher,
                    });
                })
                .catch((error) => {
                    console.log(
                        "세션에 연결하는 동안 오류가 발생했습니다. --->",
                        error.code,
                        error.message
                    );
                });
        });
    }, []);

    const leaveSession = () => {
        // 7. Session 객체에 대해 disconnect 메서드를 호출하여 세션을 나감

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // 모든 속성 비우기
        // OV = null;
        setState({
            mySessionId: "SessionA",
            myUserName: "Participant" + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
        });
    };

    const onbeforeunload = (event) => {
        leaveSession();
    };

    return (
        <>
            {/* <input className="form-control" type="text" id="userName" value={myUserName} onChange={this.handleChangeUserName} required /> */}
            {state.subscribers.map((sub, i) => (
                <div key={i} className="stream-container col-md-6 col-xs-6">
                    <UserVideoComponent
                        streamManager={sub}
                        mainVideoStream={this.handleMainVideoStream}
                    />
                </div>
            ))}
            {state.mainStreamManager !== undefined ? (
                <div id="main-video" className="col-md-6">
                    <UserVideoComponent
                        streamManager={state.mainStreamManager}
                    />
                </div>
            ) : null}
            {state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6">
                    <UserVideoComponent
                        streamManager={state.publisher}
                        mainVideoStream={this.hanldeMainVideoStream}
                    />
                </div>
            ) : null}
            <div className="streamcomponent" onClick={this.handleVideoClicked}>
                <OpenViduVideoComponent
                    streamManager={this.props.streamManager}
                />
                <div>
                    <p> {this.getNicknameTag()} </p>
                </div>
            </div>
        </>
    );
};

export default Test;

import React from "react";
import OpenViduVideoComponent from "./OvVideo";

const UserVideoComponent = (props) => {
    return (
        <div>
            {props.streamManager !== undefined ? (
                <OpenViduVideoComponent streamManager={props.streamManager} />
            ) : null}
        </div>
    );
};

export default UserVideoComponent;

/*
export default class UserVideoComponent extends Component {
    constructor(props) {
        super(props);

        this.handleVideoClicked = this.handleVideoClicked.bind(this);
    }

    getNicknameTag() {
        // 사용자의 닉네임을 가져옴
        return JSON.parse(this.props.streamManager.stream.connection.data)
            .clientData;
    }

    handleVideoClicked(event) {
        // 상위 구성 요소가 기본 비디오 디스플레이(다른 UserVideoComponent)를 업데이트 하도록 이벤트를 트리거함
        if (this.props.mainVideoStream) {
            this.props.mainVideoStream(this.props.streamManager);
        }
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent
                            streamManager={this.props.streamManager}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}
*/

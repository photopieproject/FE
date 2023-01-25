import React from "react";

const OpenViduVideoComponent = (props) => {
    const videoRef = React.useRef();

    React.useEffect(() => {
        if (props.streamManager && !!videoRef) {
            props.streamManager.addVideoElement(videoRef.current);
        }
        return () => {};
    }, []);

    return <video autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;

/*
export default class OpenViduVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    // componentDidUpdate(props) {
    //     if (props && !!this.videoRef) {
    //         this.props.streamManager.addVideoElement(this.videoRef.current);
    //     }
    // }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }
}
*/

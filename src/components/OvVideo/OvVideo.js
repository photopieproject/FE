import React from "react";

const OpenViduVideoComponent = (props) => {
    const videoRef = React.useRef();

    React.useEffect(() => {
        if (props.streamManager && !!videoRef) {
            props.streamManager.addVideoElement(videoRef.current);
        }
        return () => {};
    }, [props.streamManager, videoRef]);

    // React.useEffect(() => {
    //     const getUserMedia = async () => {
    //         try {
    //             const stream = await navigator.mediaDevices.getUserMedia({
    //                 video: { width: 200, height: 300 },
    //                 audio: true,
    //             });
    //             videoRef.current.srcObject = stream;
    //         } catch (err) {}
    //     };
    //     getUserMedia();
    // }, []);

    return <video autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;

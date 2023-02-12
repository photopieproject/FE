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

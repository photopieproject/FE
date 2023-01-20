import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Loading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/photosave");
        }, 30000);
    });

    return (
        <StDiv container>
            <StDiv box>
                <StDiv loader4></StDiv>
                <StP>Photo-Pie</StP>
                <StSpan>PHOTO-PIE...</StSpan>
            </StDiv>
        </StDiv>
    );
};

const StDiv = styled.div`
    ${(props) =>
        props.container &&
        css`
            width: 100%;
            height: 100%;
            text-align: center;
            background-color: #478ba2;
            overflow: hidden;
        `}
    ${(props) =>
        props.box &&
        css`
            display: inline-block;
            height: 82.5vh;
            width: 100%;
            float: left;
            position: relative;
            /*margin:0 -4px -5px -2px;*/
            transition: all 0.2s ease;
        `}
        ${(props) =>
        props.loader4 &&
        css`
            position: relative;
            width: 250px;
            height: 40px;
            top: 45%;
            top: -webkit-calc(50% - 10px);
            top: calc(50% - 10px);
            left: 25%;
            left: -webkit-calc(50% - 75px);
            left: calc(50% - 75px);
            background-color: rgba(255, 255, 255, 0.2);
            &::before {
                content: "";
                position: absolute;
                background-color: #fff;
                top: 0px;
                left: 0px;
                height: 40px;
                width: 0px;
                z-index: 0;
                opacity: 1;
                -webkit-transform-origin: 100% 0%;
                transform-origin: 100% 0%;
                -webkit-animation: loader4 10s ease-in-out infinite;
                animation: loader4 10s ease-in-out infinite;
            }
            &::after {
                content: "LOADING ...";
                color: #fff;
                font-family: Lato, "Helvetica Neue";
                font-weight: 200;
                font-size: 20px;
                position: absolute;
                width: 100%;
                height: 40px;
                line-height: 40px;
                left: 0;
                top: 0;
            }
            @-webkit-keyframes loader4 {
                0% {
                    width: 0px;
                }
                70% {
                    width: 100%;
                    opacity: 1;
                }
                90% {
                    opacity: 0;
                    width: 100%;
                }
                100% {
                    opacity: 0;
                    width: 0px;
                }
            }

            @keyframes loader4 {
                0% {
                    width: 0px;
                }
                70% {
                    width: 100%;
                    opacity: 1;
                }
                90% {
                    opacity: 0;
                    width: 100%;
                }
                100% {
                    opacity: 0;
                    width: 0px;
                }
            }
        `}
`;

const StP = styled.p`
    color: #777;
    font-family: Lato, "Helvetica Neue";
    font-weight: 300;
    position: absolute;
    font-size: 20px;
    width: 100%;
    height: 25px;
    text-align: center;
    bottom: 0px;
    margin: 0;
    top: 160px;
    background-color: #fff;
    opacity: 0;
    text-transform: uppercase;
    transition: all 0.2s ease;
    &:hover {
        bottom: 0px;
        top: 150px;
        opacity: 1;
        transition: all 0.2s ease;
        z-index: 2;
        cursor: pointer;
    }
`;

const StSpan = styled.span`
    color: transparent;
    font-size: 1.4rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: "PHOTO_PIE...";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-right: 4px solid #17feff;
        overflow: hidden;
        color: #17feff;
        animation: load91371 2s linear infinite;
    }

    @keyframes load91371 {
        0%,
        10%,
        100% {
            width: 0;
        }

        10%,
        20%,
        30%,
        40%,
        50%,
        60%,
        70%,
        80%,
        90%,
        100% {
            border-right-color: transparent;
        }

        11%,
        21%,
        31%,
        41%,
        51%,
        61%,
        71%,
        81%,
        91% {
            border-right-color: #17feff;
        }

        60%,
        80% {
            width: 100%;
        }
    }
`;
export default Loading;

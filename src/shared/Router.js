import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import FindPW from "../pages/FindPW";
import FindID from "../pages/FindID";
import RoomOpen from "../pages/RoomOpen";
import Frame from "../pages/Frame";
import OneCamera from "../pages/OneCamera";
import TwoCamera from "../pages/TwoCamera";
import FourCamera from "../pages/FourCamera";
import Loading from "../pages/Loading";
import PhotoSave from "../pages/PhotoSave";
import Terms from "../pages/Terms";
import Private from "../pages/Private";
import Marketing from "../pages/Marketing";
import Kakao from "../pages/Kakao";
import Google from "../pages/Google";
import SharePage from "../pages/SharePage";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="findpw" element={<FindPW />} />
                    <Route path="findid" element={<FindID />} />
                    <Route path="roomopen" element={<RoomOpen />} />
                    <Route path="frame/:roomId" element={<Frame />} />
                    <Route path="onecamera/:roomId" element={<OneCamera />} />
                    <Route path="twocamera/:roomId" element={<TwoCamera />} />
                    <Route path="fourcamera/:roomId" element={<FourCamera />} />
                    <Route path="loading/:roomId" element={<Loading />} />
                    <Route path="photosave/:roomId" element={<PhotoSave />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="private" element={<Private />} />
                    <Route path="marketing" element={<Marketing />} />
                    <Route
                        path="api/user/kakao/callback"
                        element={<Kakao />}
                    ></Route>
                    <Route
                        path="api/user/google/callback"
                        element={<Google />}
                    ></Route>
                    <Route path="sharepage" element={<SharePage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;

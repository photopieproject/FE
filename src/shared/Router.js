import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import RoomOpen from "../pages/RoomOpen";
import RoomWaiting from "../pages/RoomWaiting";
import Frame from "../pages/Frame";
import PhotoShoot from "../pages/PhotoShoot";
import Loading from "../pages/Loading";
import PhotoSave from "../pages/PhotoSave";
import Kakao from "../pages/Kakao";
import Private from "../pages/Private";
import Terms from "../pages/Terms";
import Marketing from "../pages/Marketing";
import Google from "../pages/Google";
import Test from "../components/OvVideo/Test";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="roomopen" element={<RoomOpen />} />
                    <Route
                        path="roomwaiting/:roomId"
                        element={<RoomWaiting />}
                    />
                    <Route path="frame/:roomId" element={<Frame />} />
                    <Route path="photoshoot/:roomId" element={<PhotoShoot />} />
                    <Route path="loading/:roomId" element={<Loading />} />
                    <Route path="photosave/:roomId" element={<PhotoSave />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="private" element={<Private />} />
                    <Route path="marketing" element={<Marketing />} />
                    <Route path="test" element={<Test />} />
                    <Route
                        path="api/user/kakao/callback"
                        element={<Kakao />}
                    ></Route>
                    <Route
                        path="api/user/google/callback"
                        element={<Google />}
                    ></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;

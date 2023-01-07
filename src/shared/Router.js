import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Main from "../pages/Main";
import HowTo from "../pages/HowTo";
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

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="howto" element={<HowTo />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="roomopen" element={<RoomOpen />} />
          <Route path="roomwaiting" element={<RoomWaiting />} />
          <Route path="frame" element={<Frame />} />
          <Route path="photoshoot" element={<PhotoShoot />} />
          <Route path="loading" element={<Loading />} />
          <Route path="photosave" element={<PhotoSave />} />
          <Route path="terms" element={<Terms />} />
          <Route path="private" element={<Private />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="/api/user/kakao/callback" element={<Kakao />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

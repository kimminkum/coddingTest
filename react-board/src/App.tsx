import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoradList";
import Write from "./Write";
import Detail from "./Detail";
import KakaoApi from "./Components/KaKaoApi";
import MapleApi from "./MapleApi";
import JsKakao from "./Components/JsKakao";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KakaoLogout from "./Components/KakaoLogout";

declare global {
  interface Window {
    Kakao: any;
  }
}

const App: React.FC = () => {
  const [loginOn, setLoginOn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    accessToken: string;
    userId: string;
    nickname: string;
  } | null>(null);

  const handleLoginStatusChange = (data: {
    isLoggedIn: boolean;
    accessToken: string;
    userId: string;
    nickname: string;
  }) => {
    setLoginOn(data.isLoggedIn);
    setUserInfo({
      accessToken: data.accessToken,
      userId: data.userId,
      nickname: data.nickname
    });
  };

  useEffect(() => {
    console.log("hi");
    console.log(loginOn);
    console.log(userInfo);
  }, [loginOn, userInfo]);

  return (
    <div className="App">
      <div className="bg"></div>

      <div className="base">
        {/* <BrowserRouter>
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<BoardList />} />
          </Routes>
        </BrowserRouter> */}

        {/* maple */}
        <MapleApi></MapleApi>
        {/* kakao */}
        {!loginOn && (
          <KakaoApi
            loginOn={loginOn}
            onLoginStatusChange={handleLoginStatusChange}
          ></KakaoApi>
        )}
        {loginOn && (
          <KakaoLogout
            loginOn={loginOn}
            onLoginStatusChange={handleLoginStatusChange}
            userInfo={userInfo}
          ></KakaoLogout>
        )}
        <br />
        {/* <JsKakao></JsKakao> */}
      </div>
    </div>
  );
};
export default App;

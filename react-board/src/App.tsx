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

  const handleLoginStatusChange = async (data: {
    isLoggedIn: boolean;
    accessToken: string;
    userId: string;
    nickname: string;
  }) => {
    await setLoginOn(data.isLoggedIn);
    // 여기서 토큰 값을 사용하거나 필요한 작업을 수행할 수 있습니다.
    console.log("hit : " + data.accessToken);
  };

  useEffect(() => {
    console.log(loginOn);
  }, [setLoginOn]);

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
          ></KakaoLogout>
        )}
        <br />
        {/* <JsKakao></JsKakao> */}
      </div>
    </div>
  );
};
export default App;

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

declare global {
  interface Window {
    Kakao: any;
  }
}

const App: React.FC = () => {
  const [loginOn, setLoginOn] = useState<boolean>(false);

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
            onLoginStatusChange={setLoginOn}
          ></KakaoApi>
        )}
        {loginOn && <div>logout 해야해</div>}
        <br />
        {/* <JsKakao></JsKakao> */}
      </div>
    </div>
  );
};
export default App;

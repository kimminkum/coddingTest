import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoradList";
import Write from "./Write";
import Detail from "./Detail";
import KakaoApi from "./KakaoApi";
import MapleApi from "./MapleApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";

declare global {
  interface Window {
    Kakao: any;
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="bg"></div>

      <div className="base">
        <BrowserRouter>
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<BoardList />} />
          </Routes>
        </BrowserRouter>

        {/* maple */}
        <MapleApi></MapleApi>
        {/* kakao */}
        <KakaoApi></KakaoApi>
      </div>
    </div>
  );
};
export default App;

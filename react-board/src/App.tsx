import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoradList";
import Write from "./Write";
import Detail from "./Detail";
import KakaoApi from "./Components/KaKaoApi";
import MapleApi from "./MapleApi";
import JsKakao from "./Components/JsKakao";
import KakaoMap from "./Components/KakaoMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KakaoLogout from "./Components/KakaoLogout";
import "./Styled/basic.scss";
import SEO from "./Seo";

const App: React.FC = () => {
  const [loginOn, setLoginOn] = useState<boolean>(false);
  // userInfo를 여기다가 써서 저장하고 다시 보내야한다.
  // 자식노드에서 얻은 데이터를 위로 올려서 다른 자식에게 보낼때의 방법인것같다.
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
        <br />
        <KakaoMap></KakaoMap>
        <br />
        <SEO
          title="kmk react"
          description="공부하는 사이트"
          keywords={["키워드1", "키워드2", "키워드3"]}
        ></SEO>
      </div>
    </div>
  );
};
export default App;

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const KakaoLogin: React.FC = () => {
  const kakaoRestApiKey = "dfa29646980902382513abb967b3a190";
  const redirectUri = "http://localhost:3000/auth";

  const [cookies, setCookie] = useCookies(["authorize-access-token"]);
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   displayToken();
  // }, []);

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  };

  // const displayToken = () => {
  //   const storedToken = cookies["authorize-access-token"];
  //   console.log("cookies : " + storedToken);

  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // };

  return (
    <div>
      <a id="kakao-login-btn" href="#" onClick={loginWithKakao}>
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </a>

      <p id="token-result">{token ? `login success, token: ${token}` : "x"}</p>
    </div>
  );
};

export default KakaoLogin;

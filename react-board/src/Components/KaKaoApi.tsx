import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const KakaoLogin: React.FC = () => {
  const kakaoRestApiKey = "dfa29646980902382513abb967b3a190";
  const kakaoJsApiKey = "fae8525c37a641272a708847243cf167";
  const redirectUri = "http://localhost:3000/auth";
  //@ts-ignore
  const Kakao = window.Kakao;

  const [cookies, setCookie] = useCookies(["authorize-access-token"]);
  const [token, setToken] = useState<string | null>(null);

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  };

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

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const KakaoLogin: React.FC = () => {
  const kakaoRestApiKey = "dfa29646980902382513abb967b3a190";
  const redirectUri = "http://localhost:3000/";

  const [cookies, setCookie] = useCookies(["authorize-access-token"]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    displayToken();
  }, []);

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const displayToken = () => {
    const storedToken = cookies["authorize-access-token"];
    console.log("cookies : " + storedToken);

    if (storedToken) {
      setToken(storedToken);
      // 아래의 Kakao.Auth.getStatusInfo()를 직접 사용하는 대신, 서버에서 토큰을 검증하는 방식으로 수정할 수 있습니다.
      // (서버에서 토큰을 검증하지 않을 경우 보안에 취약할 수 있습니다.)
      // 예: 서버에 '/validate-kakao-token'과 같은 엔드포인트를 만들어 토큰을 검증하고, 클라이언트에서는 단순히 저장된 토큰을 표시하는 용도로 사용
    }
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

      <p id="token-result">{token ? `login success, token: ${token}` : ""}</p>
    </div>
  );
};

export default KakaoLogin;

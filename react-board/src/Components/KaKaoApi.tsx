import * as React from "react";
import queryString from "query-string";
import axios from "axios";

interface KakaoTokenData {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}

const KakaoLogin: React.FC = () => {
  const kakaoRestApiKey = "dfa29646980902382513abb967b3a190";
  const kakaoJsApiKey = "fae8525c37a641272a708847243cf167";
  const redirectUri = "http://localhost:3000/auth";
  //@ts-ignore
  const Kakao = window.Kakao;
  const query = queryString.parse(window.location.search);

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  };

  React.useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, [query.code]);

  const sendKakaoTokenToServer = async (accessToken: string) => {
    try {
      const res = await axios.post("/auth/kakao", {
        access_token: accessToken
      });

      if (res.status === 201 || res.status === 200) {
        const user = res.data.user;
        window.localStorage.setItem(
          "token",
          JSON.stringify({
            access_token: res.data.jwt
          })
        );
      } else {
        window.alert("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getKakaoTokenHandler = async (code: string) => {
    try {
      const dataToSend: KakaoTokenData = {
        grant_type: "authorization_code",
        client_id: kakaoRestApiKey,
        redirect_uri: redirectUri,
        code: code
      };
      const queryStringToSend = Object.keys(dataToSend)
        .map(
          (key) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent((dataToSend as any)[key])
        )
        .join("&");

      // 토큰 발급 REST API
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        queryStringToSend,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }
      );

      // 서버에 전달
      sendKakaoTokenToServer(response.data.access_token);
    } catch (error) {
      console.error(error);
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
    </div>
  );
};

export default KakaoLogin;

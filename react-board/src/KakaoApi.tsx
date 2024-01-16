import React, { useState, useEffect } from "react";

const KakaoLogin: React.FC = () => {
  const kakaoRestApiKey = "dfa29646980902382513abb967b3a190";
  const redirectUri = "http://localhost:3000/";
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const kakaoClientId = "fae8525c37a641272a708847243cf167";

  const kakaoOnSuccess = async (data: any) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
  };
  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };

  const handleKakaoLogin = () => {
    // 사용자가 로그인 버튼을 클릭하면 카카오 로그인 페이지로 이동
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const handleGetUserInfo = async (code: string) => {
    try {
      // 백엔드 서버로 인가 코드를 전송하고 액세스 토큰을 얻음
      const response = await fetch("YOUR_BACKEND_SERVER_TOKEN_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, redirectUri })
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;

        // 얻은 액세스 토큰을 이용하여 사용자 정보를 가져옴
        const userInfoResponse = await fetch(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (userInfoResponse.ok) {
          const userInfoData = await userInfoResponse.json();
          setUserInfo(userInfoData);
        } else {
          console.error("Failed to get user information");
        }
      } else {
        console.error("Failed to exchange code for access token");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCodeExchange = () => {
    // URL에서 인가 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // 인가 코드가 있으면 해당 코드로 액세스 토큰을 얻음
      handleGetUserInfo(code);
    }
  };

  // 컴포넌트가 마운트될 때 실행
  useEffect(() => {
    handleCodeExchange();
  }, []);

  return (
    <div>
      <button onClick={handleKakaoLogin}>Kakao 로그인</button>
      {userInfo && (
        <div>
          <h2>사용자 정보</h2>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KakaoLogin;

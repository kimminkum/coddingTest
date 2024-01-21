import KakaoLogin from "react-kakao-login";
import React, { useEffect, useState } from "react";

const SocialKakao = () => {
  const kakaoClientId = "fae8525c37a641272a708847243cf167";
  const [kakaoData, setKakaoData] = useState<any | null>(null);

  useEffect(() => {
    console.log(kakaoData);
  }, [kakaoData]);

  const kakaoOnSuccess = async (data: any) => {
    setKakaoData(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
  };

  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };
  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />

      {kakaoData && (
        <div>
          <p>Id : {kakaoData.response.access_token}</p>
          <p>name : {kakaoData.profile.properties.nickname}</p>
        </div>
      )}
    </>
  );
};

export default SocialKakao;

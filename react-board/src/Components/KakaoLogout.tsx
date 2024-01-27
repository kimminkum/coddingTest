import axios from "axios";
import React, { useEffect, useState } from "react";

interface KakaoApiProps {
  loginOn: boolean;
  onLoginStatusChange: (data: {
    isLoggedIn: boolean;
    accessToken: string;
    userId: string;
    nickname: string;
  }) => void;
  userInfo: {
    accessToken: string;
    userId: string;
    nickname: string;
  } | null;
}

const KakaoLogout: React.FC<KakaoApiProps> = ({
  loginOn,
  onLoginStatusChange,
  userInfo
}) => {
  const [names, setNames] = useState<string | null>(null);

  const kakaoLogout = async () => {
    try {
      const { accessToken, userId, nickname } = await getAccessToken(); //
      await axios({
        method: "POST",
        url: "https://kapi.kakao.com/v1/user/logout",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`
        }
      });

      // 로그아웃 성공 후에 필요한 작업 수행
      onLoginStatusChange({
        isLoggedIn: !loginOn,
        accessToken: "",
        userId: "",
        nickname: ""
      });
      window.location.href = "/";
    } catch (e: any) {
      console.log("e : ", e);
      // 이미 만료된 토큰일 경우
      if (e.response?.data?.code === -401) {
        // 에러 개체가 '알 수 없는' 형식입니다.
        // 로그아웃 성공 후에 필요한 작업 수행
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    const resData = async () => {
      // 여기에서도 userInfo의 정보 활용
      if (userInfo) {
        const { accessToken, userId, nickname } = await getAccessToken();
      }
    };

    resData();
    console.log("hey");
    console.log(userInfo);
  }, [names, userInfo]);

  // 실제 토큰 값을 받아오는 함수를 추가
  const getAccessToken = async () => {
    // 여기에 실제 토큰 값을 받아오는 로직을 추가
    return {
      accessToken: userInfo?.accessToken,
      userId: userInfo?.userId,
      nickname: userInfo?.nickname
    };
  };

  return (
    <div>
      <button onClick={kakaoLogout}>Kakao Logout</button>
    </div>
  );
};

export default KakaoLogout;

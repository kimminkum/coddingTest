import axios from "axios";

interface KakaoApiProps {
  loginOn: boolean;
  onLoginStatusChange: (data: {
    isLoggedIn: boolean;
    accessToken: string;
    userId: string;
    nickname: string;
  }) => Promise<void>;
}

const KakaoLogout: React.FC<KakaoApiProps> = ({
  loginOn,
  onLoginStatusChange
}) => {
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

  // 실제 토큰 값을 받아오는 함수를 추가
  const getAccessToken = async () => {
    // 여기에 실제 토큰 값을 받아오는 로직을 추가
    return {
      accessToken: "your_actual_token_value",
      userId: "your_actual_user_id",
      nickname: "your_actual_nickname"
    };
  };

  return (
    <div>
      <button onClick={kakaoLogout}>Kakao Logout</button>
    </div>
  );
};

export default KakaoLogout;

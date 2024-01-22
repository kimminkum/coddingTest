import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (query.code) {
      fnGetKakaoOauthToken();
    }
  }, [query.code]);

  const fnGetKakaoOauthToken = async () => {
    const makeFormData = (params: { [key: string]: string }) => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key]);
      });

      return searchParams;
    };

    const code = query.code as string;

    try {
      const res = await axios({
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        url: "https://kauth.kakao.com/oauth/token",
        data: makeFormData({
          grant_type: "authorization_code",
          client_id: kakaoRestApiKey,
          redirect_uri: redirectUri,
          code // 인가 코드
        })
      });

      fnGetKakaoUserInfo(res.data.access_token);
      // sessionStorage/localStorage에 결과값 저장
      // state에 kakao accesstoken 저장
    } catch (err) {
      console.warn(err);
    }
  };

  const fnGetKakaoUserInfo = async (token: string) => {
    try {
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` // 카카오 토큰 api로 얻은 accesstoken 보내기
        },
        url: "https://kapi.kakao.com/v2/user/me"
      });

      // sessionStorage/localStorage에 사용자 정보 저장
      console.log(res);
      console.log(res.data.id.toString());
      console.log(res.data.kakao_account.profile.nickname);
      // fnUserInfoCheck(
      //   res.data.id.toString(),
      //   res.data.kakao_account.profile.nickname
      // ); // 서비스 내 유저 조회를 위해 kakaoId, nickname 전달
    } catch (e) {
      console.log("e : ", e);
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

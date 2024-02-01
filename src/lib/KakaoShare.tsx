"use client";

import Script from "next/script";
declare global {
  interface Window {
    Kakao: any;
  }
}
function KakaoShare() {
  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_API_KEY);
  };
  return <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit} />;
}

export default KakaoShare;

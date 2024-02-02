import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";
import { rem, pretendard } from "@/app/styles/fonts/fonts";
import styles from "@/app/styles/fonts/fonts.module.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthChage from "@/components/layout/AuthChage";
import PageControlBtnGroup from "@/components/layout/PageControlBtnGroup";
import dynamic from "next/dynamic";

const KakaoShare = dynamic(() => import("@/lib/KakaoShare"));
const CreateModal = dynamic(() => import("@/components/portal/CreateModal"));
const CreateAlert = dynamic(() => import("@/components/portal/CreateAlert"));
const CreateConfirm = dynamic(() => import("@/components/portal/CreateConfirm"));

export const metadata: Metadata = {
  title: "YOLOCEAN",
  description: "해양레저를 찾고있나? 욜로오션~🌊🌊🌊"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang="ko" className={`${rem.variable} ${pretendard.variable}`}>
        <body id="top" className={`${styles.font} text-tc-base`}>
          <div id="modal" />
          <div id="back_drop" />
          <div id="confirm" />
          <div id="alert" />

          <Header />
          <AuthChage />
          <main className="max-w-[1200px] mx-auto w-[90%] min-h-full">{children}</main>
          <PageControlBtnGroup />
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
          <CreateModal />
          <CreateAlert />
          <CreateConfirm />
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="lazyOnload"
          />
          <Script strategy="lazyOnload" src="https://cdn.iamport.kr/v1/iamport.js" />
          <Script strategy="lazyOnload" src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
          <Script strategy="lazyOnload" src="https://developers.kakao.com/sdk/js/kakao.js" />
          <KakaoShare />
        </body>
      </html>
    </ReactQueryProvider>
  );
}

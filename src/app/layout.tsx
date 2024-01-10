import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang="ko">
        <body className={openSans.className}>
          <main>{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
          <div id="portal" />
          <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9be24acbab35476edd2a2034f6cbd437&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
          />
          <Script src="https://cdn.iamport.kr/v1/iamport.js" />
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
        </body>
      </html>
    </ReactQueryProvider>
  );
}

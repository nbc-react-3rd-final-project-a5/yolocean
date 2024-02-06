import { REM } from "next/font/google";
import localFont from "next/font/local";

const rem = REM({
  weight: "variable",
  variable: "--font-rem",
  subsets: ["latin"]
});

const pretendard = localFont({
  src: [
    {
      path: "./subset-PretendardVariable-ko.ttf",
      style: "normal"
    },
    {
      path: "./subset-PretendardVariable-ko.woff",
      style: "normal"
    },
    {
      path: "./subset-PretendardVariable-ko.woff2",
      style: "normal"
    }
  ],
  weight: "variable",
  variable: "--font-pretendard",
  declarations: [{ prop: "unicode-range", value: "U+AC00-D7A3, U+3131-313C" }]
});

export { rem, pretendard };

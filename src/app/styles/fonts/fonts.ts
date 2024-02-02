import { REM } from "next/font/google";
import localFont from "next/font/local";

const rem = REM({
  weight: "variable",
  variable: "--font-rem",
  subsets: ["latin"]
});
const pretendard = localFont({
  src: "./PretendardVariable-ko.woff2",
  weight: "variable",
  variable: "--font-pretendard",
  declarations: [{ prop: "unicode-range", value: "U+AC00-D7A3, U+3131-313C" }]
});

export { rem, pretendard };

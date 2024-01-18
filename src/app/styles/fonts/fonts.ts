import { REM } from "next/font/google";
import localFont from "next/font/local";

const rem = REM({
  weight: "variable",
  variable: "--font-rem",
  subsets: ["latin"]
});
const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  variable: "--font-pretendard",
  declarations: [{ prop: "unicode-range", value: "U+AC00-D7A3" }]
});

export { rem, pretendard };

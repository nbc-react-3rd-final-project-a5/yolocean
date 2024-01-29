import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "YOLOCEAN - 아이디/비밀번호 찾기",
  openGraph: {
    images: ["/opengraph-image.png"]
  }
};

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default layout;

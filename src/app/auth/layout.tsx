import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "YOLOCEAN | 로그인/회원가입",
  description: "욜로오션의 회원이 되어 보세요! 🌊🌊🌊",
  openGraph: {
    images: [`/opengraph-image.png`]
  }
};

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default layout;

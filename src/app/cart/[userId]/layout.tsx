import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "YOLOCEAN | 장바구니",
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

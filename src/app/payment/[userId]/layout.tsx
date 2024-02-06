import React from "react";

export const metadata = {
  title: "YOLOCEAN | 렌탈 결제를 진행합니다.",
  openGraph: {
    images: [`${process.env.PUBLIC_URL}/images/opengraph-image.png`]
  }
};

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <>{children}</>;
};
export default layout;

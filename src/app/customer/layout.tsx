import React from "react";

export const metadata = {
  title: "YOLOCEAN | 고객센터",
  description: "찾으시는 문의가 없으시다면 1:1 문의를 진행해 주세요. 언제나 친절하게 답변해드리겠습니다. ",
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

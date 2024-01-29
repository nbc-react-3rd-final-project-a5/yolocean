import React from "react";

export const metadata = {
  title: "YOLOCEAN - 렌탈 결제",
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

import React from "react";

export const metadata = {
  title: "YOLOCEAN - 고객센터",
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

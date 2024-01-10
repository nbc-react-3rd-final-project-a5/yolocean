import Image from "next/image";
import React from "react";

interface Props {
  size: "sm" | "md" | "lg";
  src: string;
  alt?: string;
}

// 아바타 사이즈
const avatarSize = {
  sm: 50,
  md: 150,
  lg: 200
};

const Avatar = ({ size, src, alt }: Props) => {
  const altText = () => {
    switch (size) {
      case "sm":
        return "리뷰 유저 이미지";
      case "md":
        return "카테고리 이미지";
      case "lg":
        return "마이페이지 유저 이미지";
      default:
        return "이미지";
    }
  };
  return (
    <Image
      className="rounded-full"
      src={src}
      width={avatarSize[size]}
      height={avatarSize[size]}
      priority
      alt={alt || altText()}
      draggable={false}
    />
  );
};

export default Avatar;

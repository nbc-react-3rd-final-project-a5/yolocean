import Image from "next/image";
import React from "react";
import defaultUser from "../../public/images/avatar_default.jpg";
interface Props {
  size: "sm" | "lg";
  src: string | null;
  alt?: string;
}

// 아바타 사이즈
const avatarSize = {
  sm: "w-[36px] h-[36px]",
  lg: "w-[200px] h-[200px]"
};

const Avatar = ({ size, src, alt }: Props) => {
  const altText = () => {
    switch (size) {
      case "sm":
        return "리뷰 유저 이미지";
      case "lg":
        return "마이페이지 유저 이미지";
      default:
        return "이미지";
    }
  };
  return (
    <figure className={`${avatarSize[size]} rounded-full relative overflow-hidden`}>
      <Image
        className="rounded-full"
        src={src === null ? defaultUser : src}
        fill
        priority
        alt={alt || altText()}
        draggable={false}
      />
    </figure>
  );
};

export default Avatar;

import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  size?: keyof typeof EnumSize;
  fontWeight?: keyof typeof EnumFontWeight;
  color?: keyof typeof EnumColor;
  isOutline?: boolean;
  isFull?: boolean;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}

enum EnumSize {
  sm = "px-[2em] py-[0.5em] min-w-[5rem] text-[14px]",
  md = "px-[2em] py-[0.5em] min-w-[10rem] text-[16px]",
  lg = "px-[2em] py-[0.5em] min-w-[15rem] text-[18px]"
}

enum EnumFontWeight {
  thin = "font-light",
  default = "font-normal",
  bold = "font-semibold"
}

enum EnumBg {
  blue = "bg-point",
  gray = "bg-tc-middle",
  white = "bg-white"
}

enum EnumColor {
  blue = "text-point",
  gray = "text-tc-white",
  white = "text-white"
}

// color 값으로 색상 가져오기
enum EnumBorder {
  blue = "border-point",
  gray = "border-tc-middle",
  white = "border-tc-middle"
}

const CustomLink = ({
  href,
  children,
  onClick,
  disabled = false,
  size = "md",
  fontWeight = "default",
  color = "blue",
  isOutline = false,
  isFull = false,
  className,
  replace,
  scroll,
  prefetch
}: Props) => {
  const disabledStyle = " bg-line text-tc-light";
  const defaultStyle = "inline-block text-center border rounded-[5px]";
  const customStyleObj = {
    size: EnumSize[size],
    fontWeight: EnumFontWeight[fontWeight],
    bg: isOutline ? EnumBg["white"] : EnumBg[color],
    color: isOutline ? EnumColor[color] : color === "white" ? EnumColor["gray"] : EnumColor["white"],
    border: disabled ? "border-line" : EnumBorder[color],
    curser: disabled && "cursor-default"
  };
  const customStyle = Object.values(customStyleObj).join(" ");

  return (
    <Link
      href={disabled ? "#" : href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      onClick={onClick}
      className={`${defaultStyle} ${customStyle}  ${isFull && "w-full"} ${disabled && disabledStyle} ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;

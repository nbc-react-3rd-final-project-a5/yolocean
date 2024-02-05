"use clinet";

import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  size?: keyof typeof EnumSize;
  fontWeight?: keyof typeof EnumFontWeight;
  color?: keyof typeof EnumColor;
  isOutline?: boolean;
  isFull?: boolean;
  className?: string;
  name?: string;
  type?: "submit" | "reset" | "button" | undefined;
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
  red = "bg-red-200",
  white = "bg-white"
}

enum EnumColor {
  blue = "text-point",
  gray = "text-tc-white",
  red = "text-white",
  white = "text-white"
}

// color 값으로 색상 가져오기
enum EnumBorder {
  blue = "border-point",
  gray = "border-tc-middle",
  red = "border-red-200",
  white = "border-point"
}

const CustomButton = ({
  name,
  children,
  onClick,
  disabled = false,
  size = "md",
  fontWeight = "default",
  color = "blue",
  isOutline = false,
  isFull = false,
  type,
  className
}: Props) => {
  const disabledStyle = "disabled:border-line disabled:bg-line disabled:text-tc-light";
  const defaultStyle = "inline-block text-center border rounded-[5px]";
  const customStyleObj = {
    size: EnumSize[size],
    fontWeight: EnumFontWeight[fontWeight],
    bg: isOutline ? EnumBg["white"] : EnumBg[color],
    color: isOutline ? EnumColor[color] : color === "white" ? EnumColor["blue"] : EnumColor["white"],
    border: EnumBorder[color]
  };
  const customStyle = Object.values(customStyleObj).join(" ");

  return (
    <button
      type={type || "submit"}
      name={name}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultStyle} ${customStyle}  ${isFull && "w-full"} ${disabledStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;

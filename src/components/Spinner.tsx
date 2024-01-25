import React from "react";
import styles from "@/app/styles/spinner.module.css";

interface Props {
  // sm : 50% 작게, md : 기본, lg : 50% 크게
  size?: keyof typeof EnumSpinnerSize;
  isShowText?: boolean;
}

enum EnumSpinnerSize {
  sm = "scale-50",
  md = "scale-100",
  lg = "scale-150"
}

enum EnumFontSize {
  sm = "text-[8px]",
  md = "text-[16px]",
  lg = "text-[24px]"
}

const Spinner = ({ size = "md", isShowText = false }: Props) => {
  return (
    <div className="flex flex-col gap-8 m-8 items-center">
      <div className={`${styles.spinner_wrap} transform ${EnumSpinnerSize[size]}`}>
        <div className={`${styles.spinner} `}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {isShowText && <p className={`font-bold tracking-widest ${EnumFontSize[size]}`}>로딩중</p>}
    </div>
  );
};

export default Spinner;

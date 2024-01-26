import React from "react";
import Image from "next/image";

interface Props {
  info_img: string;
}

const Description = ({ info_img }: Props) => {
  return (
    <Image
      src={info_img}
      alt="product_info"
      sizes="(max-width: 1200px) 795px"
      width={0}
      height={0}
      className="max-w-[795px] w-full h-auto mobile:max-w-[300px] mobile:mx-auto"
    />
  );
};

export default Description;

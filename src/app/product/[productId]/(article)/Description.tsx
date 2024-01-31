import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  info_img: string;
}

const Description = ({ info_img }: Props) => {
  return (
    <div>
      <Image
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
        placeholder="blur"
        src={info_img}
        alt="product_info"
        sizes="(max-width: 1200px) 795px"
        width={0}
        height={0}
        className="max-w-[795px] w-full h-auto min-h-[1200px] mobile:max-w-[300px] mobile:mx-auto"
      />
    </div>
  );
};

export default Description;

import Image from "next/image";
import React, { ReactNode } from "react";
import { ProductProperties } from "@/types/db";
import Link from "next/link";
interface Card {
  product: ProductProperties;
  overlay?: { btn: ReactNode };
}

const Card = ({ product, overlay }: Card) => {
  return (
    <Link href={`/product/${product.id}`} className="flex flex-col w-[264px] h-[340px] relative group gap-[20px]">
      <div className="relative w-[264px] h-[264px]">
        <Image
          alt={`${product.name}_image`}
          style={{ objectFit: "fill" }}
          fill
          sizes="(max-width: 1200px) 264px"
          src={product.thumbnail}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <span className="text-[12px] text-tc-light">{product.category.category_name}</span>
        <h1 className="text-[14px] font-[500] ">{product.name}</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <p className="text-[16px] ">{product.price}</p>
          <span className="text-[13px] line-through text-tc-light">할인가격</span>
        </div>
        <span className="text-[18px] font-[500] text-point">40%</span>
      </div>
      {overlay && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 group-hover:before:bg-black group-hover:before:opacity-60 before:content-[''] before:absolute before:inset-0">
          <Link
            href={`/product/${product.id}`}
            className="bg-white w-[80%] py-4 rounded-lg relative group-hover:block hidden"
          >
            페이지 이동
          </Link>
          <div className="bg-white w-[80%] py-4 rounded-lg relative group-hover:block hidden">{overlay.btn}</div>
        </div>
      )}
    </Link>
  );
};

export default Card;

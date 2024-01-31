import Image from "next/image";
import React, { ReactNode } from "react";
import { ProductProperties } from "@/types/db";
import { GrFormView } from "react-icons/gr";
import Link from "next/link";
interface Card {
  product: ProductProperties;
  categoryId: string;
  overlay?: ReactNode;
}

const Card = ({ product, overlay, categoryId }: Card) => {
  return (
    <div className="relative  w-full mobile:max-w-[160px] tablet:max-w-[180px]  group ">
      <Link
        className="flex flex-col max-w-[246px] mobile:max-w-[160px] w-full max-h-[340px]  gap-[20px]"
        href={`/product/${product.id}`}
      >
        <div className="relative  mobile:max-w-[160px] mobile:h-[160px] tablet:max-w-[180px] tablet:h-[180px] max-w-[246px] w-full h-[246px] bg-bg">
          <Image
            alt={`${product.name}_image`}
            // sizes="(max-width: 1200px) 246px (min-width:1200px) 500px"
            sizes="(max-width: 1200px) 246px, (max-width: 1024px) 160px, 500px"
            fill
            src={product.thumbnail}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-between">
            <span className="text-[12px] text-tc-light">{product.category.category_name}</span>
            <div className="text-[11px] flex items-center gap-[2px]">
              <GrFormView siza={14} />
              {product.view}
            </div>
          </div>
          <h1 className="text-[14px] font-[500] truncate ">{product.name}</h1>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex gap-[8px] items-center mobile:relative">
            <p className="text-[16px] ">
              {((product.price * (100 - product.percentage_off!)) / 100).toLocaleString()}원
            </p>
            {(product.percentage_off as number) > 0 && (
              <span className="text-[13px] line-through text-tc-light mobile:absolute mobile:top-[-13px]">
                {product.price.toLocaleString()}원
              </span>
            )}
          </div>
          {(product.percentage_off as number) > 0 && (
            <span className="text-[18px] font-[500] text-point">{product.percentage_off}%</span>
          )}
        </div>
      </Link>
      {overlay && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 group-hover:before:bg-black group-hover:before:opacity-60 before:content-[''] before:absolute before:inset-0">
          <Link
            href={`/product/${product.id}`}
            className="bg-white w-[80%] py-4 rounded-lg relative group-hover:block hidden"
          >
            페이지 이동
          </Link>
          <div className="bg-white w-[80%] py-4 rounded-lg relative group-hover:block hidden">{overlay}</div>
        </div>
      )}
    </div>
  );
};

export default Card;

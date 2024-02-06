import Image from "next/image";
import React, { ReactNode } from "react";
import { ProductProperties } from "@/types/db";
import { GrFormView } from "react-icons/gr";
import Link from "next/link";
interface Card {
  product: ProductProperties;
  categoryId: string;
}

const Card = ({ product, categoryId }: Card) => {
  return (
    <Link
      className="flex flex-col max-w-[246px] mobile:max-w-[160px] w-full max-h-[340px] tablet:max-w-[180px]  gap-[20px]"
      href={`/product/${product.id}`}
      aria-label={`${product.name} 페이지로 이동`}
    >
      <div className="relative  mobile:max-w-[160px] mobile:h-[160px]  tablet:h-[180px] tablet:max-w-[180px] max-w-[246px] w-full h-[246px] bg-bg">
        <Image
          alt={`${product.name}_image`}
          sizes="(max-width: 1200px) 246px, (max-width: 1024px) 160px, 300px"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
          fill
          width={0}
          height={0}
          src={product.thumbnail}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <span className="text-[12px] h-[12px] text-tc-light">{product.category.category_name}</span>
          <div className="text-[11px] h-[11px] flex items-center gap-[2px]">
            <GrFormView siza={14} />
            {product.view}
          </div>
        </div>
        <h1 className="text-[14px] h-[14px] font-[500] truncate ">{product.name}</h1>
      </div>
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex gap-[8px] items-center mobile:relative">
          <p className="text-[16px] h-[16px] ">
            {((product.price * (100 - product.percentage_off!)) / 100).toLocaleString()}원
          </p>
          {(product.percentage_off as number) > 0 && (
            <span className="text-[13px] h-[13px] line-through text-tc-light mobile:absolute mobile:top-[-13px]">
              {product.price.toLocaleString()}원
            </span>
          )}
        </div>
        {(product.percentage_off as number) > 0 && (
          <span className="text-[18px] h-[18px] font-[500] text-point">{product.percentage_off}%</span>
        )}
      </div>
    </Link>
  );
};

export default Card;

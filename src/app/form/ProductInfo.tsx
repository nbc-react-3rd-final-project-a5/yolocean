import { getProduct } from "@/service/table";
import Image from "next/image";
import React from "react";

interface Props {
  productId: string;
}

const ProductInfo = async ({ productId }: Props) => {
  const product = await getProduct({ productId });
  return (
    <div className="flex flex-row py-[20px] gap-[12px] border-t-[1px] border-b-[1px] border-t-[#262626] border-b-[#E5E5E5]">
      <figure className="min-w-[190px] min-h-[190px]">
        <Image priority src={product.thumbnail} width={190} height={190} alt={`${product.name} 썸네일 이미지`} />
      </figure>
      <div className="w-full overflow-hidden flex flex-col gap-[10px] leading-none">
        <p className="text-[14px] font-normal tracking-[-0.42px] text-[#999] leading-none">
          {product.category.category_name}
        </p>
        <p className=" font-medium tracking-[-0.48px] text-[#262626] truncate">{product.name}</p>
      </div>
    </div>
  );
};

export default ProductInfo;

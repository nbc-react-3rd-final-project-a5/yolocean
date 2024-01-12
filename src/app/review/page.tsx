import ReviewForm from "@/components/form/ReviewForm";
import Image from "next/image";
import React from "react";
import Section from "@/components/layout/Section";
import getPath from "@/utils/getPath";

const getProduct = async (domain: string, productId: string) => {
  const res = await fetch(`http://${domain}/api/product/${productId}`);
  const data = await res.json();

  return data;
};

const page = async () => {
  const productId = "17f56560-5065-4dd4-b32a-4e99a9b6c00c";
  const userId = "3255837d-277c-4e5d-9e52-6956be86f182";
  const { domain } = getPath();
  const productInfo = await getProduct(domain!, productId);

  return (
    <>
      <Section title={"리뷰 작성하기"} className="font-[600] text-[25px] leading-none" isCenter={true}>
        <div className="flex flex-row py-[20px] gap-[12px] border-[1px] border-t-[#262626] border-b-[#E5E5E5]">
          <figure className="w-[190px] h-[190px]">
            <Image src={productInfo.thumbnail} width={190} height={190} alt={`${productInfo.name} 썸네일 이미지`} />
          </figure>
          <div>
            <div className="flex flex-col gap-[10px] leading-none">
              <p className="text-[14px] font-normal tracking-[-0.42px] text-[#999] leading-none">
                {productInfo.category.category_name}
              </p>
              <p className=" font-medium tracking-[-0.48px] text-[#262626] truncate">{productInfo.name}</p>
            </div>
          </div>
        </div>
        <ReviewForm bucket="review" userId={userId} productId={productId} isReview={true} />
      </Section>
    </>
  );
};

export default page;

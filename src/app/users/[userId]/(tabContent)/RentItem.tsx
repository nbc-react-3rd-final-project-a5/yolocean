import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  rentData: any;
  /**
   * true : 렌트완료, false : 예약내역
   */
  isReturn: boolean;
}

const RentItem = ({ rentData, isReturn }: Props) => {
  return (
    <div className="flex flex-row ">
      <figure className="relative w-[190px] h-[190px]">
        <Image src={rentData.product.thumbnail} className="absolute" fill alt="이미지" />
      </figure>
      <div className="relative w-full">
        <p className="text-point font-semibold mb-[20px]">{`${rentData.rent_date.replaceAll("-", ".")} ${
          isReturn ? "사용" : "예약"
        }`}</p>
        <p className="text-[15px] text-tc-light mb-[10px]">{rentData.product.category.category_name}</p>
        <p className=" font-medium leading-6 truncate mb-[15px]">{rentData.product.name}</p>
        <p className=" font-medium truncate mb-[15px]">{rentData.store.name}</p>
        <p className=" font-medium truncate mb-[15px]">{rentData.product.price * rentData.count}원</p>
        <p className=" font-medium truncate">수량 : {rentData.count}</p>
        {isReturn && (
          <div className="absolute  bottom-3 right-0  flex gap-[5px]">
            <Link
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/form?formtype=review&storeId=${rentData.store_id}&productId=${rentData.product_id}`}
              className="min-w-[7rem] px-6 py-2 text-center rounded text-white bg-point"
            >
              리뷰작성
            </Link>
            <Link
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${rentData.product_id}`}
              className="min-w-[7rem] px-6 py-2 text-center rounded border border-point text-point bg-white"
            >
              페이지 이동
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentItem;

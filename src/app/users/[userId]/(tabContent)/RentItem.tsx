import CustomLink from "@/components/CustomLink";
import Image from "next/image";
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
    <>
      <div className="flex ">
        <figure className="aspect-square w-[25%]  h-[190px] flex items-center">
          <Image src={rentData.thumbnail} width={190} height={190} alt="이미지" />
        </figure>

        <div className=" w-[75%] overflow-hidden">
          <p className="text-point font-semibold mb-[20px]">{`${rentData.rent_date.replaceAll("-", ".")} ${
            isReturn ? "사용" : "예약"
          }`}</p>
          <p className="text-[15px] text-tc-light mb-[10px]">{rentData.category_name}</p>
          <p className=" font-medium leading-6 truncate mb-[15px] ">{rentData.product_name}</p>
          <p className=" font-medium truncate mb-[15px]">{rentData.store_name}</p>
          <p className=" font-medium truncate mb-[15px]">{rentData.paid_price}원</p>
          <p className=" font-medium truncate mb-[15px]">수량 : {rentData.count}</p>
          {isReturn && (
            <div className=" flex flex-nowrap justify-end gap-[5px]">
              <CustomLink
                prefetch={false}
                size="sm"
                href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/form?formtype=review&storeId=${rentData.store_id}&productId=${rentData.product_id}`}
              >
                리뷰작성
              </CustomLink>
              <CustomLink
                color="white"
                prefetch={false}
                size="sm"
                href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${rentData.product_id}`}
              >
                페이지 이동
              </CustomLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RentItem;

import Image from "next/image";
import React from "react";

interface Props {
  rentData: any;
}

const RentItem = ({ rentData }: Props) => {
  return (
    <div className="flex flex-row">
      <figure className="relative w-[190px] h-[190px]">
        <Image src={rentData.product.thumbnail} className="absolute" fill alt="이미지" />
      </figure>
      <div>
        <p>{rentData.rent_date}</p>
        <p>{rentData.product.category.category_name}</p>
        <p>{rentData.product.name}</p>
        <p>{rentData.store.name}</p>
        <p>{rentData.product.price * rentData.count} 원</p>
        <div>
          <p>수량 : {rentData.count}</p>
        </div>
      </div>
    </div>
  );
};

export default RentItem;

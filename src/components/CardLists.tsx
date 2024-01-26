import React from "react";
import Card from "./Card";
import { ProductProperties } from "@/types/db";

const CardLists = ({ cardLists }: { cardLists: ProductProperties[] }) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-[30px]   mobile:grid-cols-2 tablet:grid-cols-3">
        {cardLists.map((item: ProductProperties) => (
          <Card categoryId={item.category_id!} product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default CardLists;

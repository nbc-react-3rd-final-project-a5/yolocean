import React from "react";
import { AdminRent } from "@/types/db";
import RentItem from "./RentItem";

interface Props {
  rentList: AdminRent[];
}

const RentList = ({ rentList }: Props) => {
  //   console.log(rentList);
  return (
    <>
      <div id="tab" className="mt-[10px] mx-auto space-y-[20px] min-w-[800px]">
        {rentList !== undefined && rentList.length > 0 ? (
          <ul>
            {rentList.map((rent: AdminRent) => (
              <li className="mb-[5px]" key={rent.id}>
                <RentItem rentItem={rent} />
              </li>
            ))}
          </ul>
        ) : (
          <div>no review</div>
        )}
      </div>
    </>
  );
};

export default RentList;

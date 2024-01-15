import useOffice from "@/hooks/useOffice";
import KakaoMap from "@/lib/KakaoMap";
import { useModalStore } from "@/store/modalStore";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  regionId: string | undefined;
}

// 아무것도 선택이 안되었을경우를 어떻게 처리할지 생각 필요

const StockTable = ({ regionId }: Props) => {
  const { office, isLoading } = useOffice(regionId);
  const { openModal } = useModalStore();
  return (
    <>
      {!isLoading && office && regionId && (
        <table className="w-full text-sm text-left border text-gray-500 ">
          <thead className="text-gray-700 border-gray-200 border-b ">
            <tr>
              <th className="px-6 py-3 w-2/4 bg-gray-50" scope="col">
                지점명
              </th>
              <th className="px-6 py-3 w-1/12  text-center" scope="col">
                재고
              </th>
              <th className="px-6 py-3 w-1/6  text-center bg-gray-50" scope="col">
                위치마커
              </th>
            </tr>
          </thead>
          <tbody>
            {office.map(({ id, address, lat, lng, name, region_id, stock }) => (
              <tr key={id}>
                <td className="px-6 py-3 border-gray-200 border-b bg-gray-50" scope="row">
                  {name}
                </td>
                <td className=" px-6 py-3  text-center border-gray-200 border-b">{stock ? stock[0].count : "null"}</td>
                <td className=" px-6 py-3  text-center border-gray-200 border-b bg-gray-50">
                  <FaLocationDot
                    onClick={() => {
                      openModal(name, <KakaoMap store={{ id, address, lat, lng, name, region_id, stock }} />);
                    }}
                    className="mx-auto text-[#3074F0] cursor-pointer"
                    size={20}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default StockTable;

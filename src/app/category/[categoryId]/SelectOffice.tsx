"use client";
import { useRegion } from "@/hooks";
import { supabase } from "@/service/supabase";
import { useModalStore } from "@/store/modalStore";
import { useOfficeStore } from "@/store/officeStore";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const SelectOffice = () => {
  const { regions, isLoading } = useRegion();
  const [selectedId, setSelectedId] = useState<string>("");
  const [officeInfo, setOfficeInfo] = useState<{ name: string; address: string; id: string }[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<{ name: string; address: string; id: string }>({
    name: "",
    address: "",
    id: ""
  });
  const { setRegionId, setOffice } = useOfficeStore();
  const { closeModal } = useModalStore();

  const getStoreByRegionId = async (regionId: string) => {
    const { data: office, error } = await supabase.from("store").select("name, address, id").eq("region_id", regionId);
    setOfficeInfo(office!);
  };

  return (
    <>
      <div className="flex justify-between bg-[#3074F0] h-[60px] text-[20px] text-white items-center p-[20px]">
        <h1>위치선택</h1>
        <IoClose className="text-white cursor-pointer" onClick={closeModal} size={30} />
      </div>
      <div className="w-[500px] min-h-[512px] px-[20px] pt-[40px] pb-[30px]">
        <form
          className="flex flex-col gap-[30px] w-[460px] h-full"
          onSubmit={(e) => {
            e.preventDefault();
            setRegionId(selectedId);
            setOffice(selectedOffice);
            closeModal();
          }}
        >
          <div className="flex flex-col gap-[20px]">
            <p className="font-semibold">행정구역</p>
            <div className="w-[460px] h-[82px] leading-none	p-[15px] grid grid-cols-7 gap-x-[20px] border border-[#E5E5E5]">
              {regions?.map((region) => {
                return (
                  <p
                    key={region.id}
                    className={`${
                      selectedId === region.id ? "text-[#3074F0]" : "text-[#999999]"
                    } whitespace-nowrap cursor-pointer`}
                    onClick={() => {
                      setSelectedId(region.id);
                      getStoreByRegionId(region.id);
                      setSelectedOffice({ name: "", address: "", id: "" });
                    }}
                  >
                    {region.region}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-semibold">지점명</p>
            <div className="w-[460px] min-h-[46px] p-[15px] leading-none grid grid-cols-2 gap-x-[20px] gap-y-[10px] border border-[#E5E5E5]">
              {officeInfo?.map((info) => {
                return (
                  <p
                    key={info.name}
                    className={`${
                      selectedOffice.name === info.name ? "text-[#3074F0]" : "text-[#999999]"
                    } cursor-pointer truncate`}
                    onClick={() => {
                      setSelectedOffice(info);
                    }}
                  >
                    {info.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="font-semibold">선택한 지점 주소</p>
            <div className="w-[460px] h-[46px] text-[#3074F0] flex gap-[10px] items-center pl-[15px] border border-[#E5E5E5]">
              <FaLocationDot /> <p>{selectedOffice.address}</p>
            </div>
          </div>
          <div className="mx-auto flex gap-[9px]">
            <button type="submit" className="w-[168px] h-[50px] rounded-[5px] text-white bg-[#3074F0]">
              위치 선택
            </button>
            <button
              type="button"
              className="w-[168px] h-[50px] rounded-[5px] text-white bg-[#999999]"
              onClick={closeModal}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SelectOffice;

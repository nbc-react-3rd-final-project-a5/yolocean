"use client";
import CustomButton from "@/components/CustomButton";
import { supabase } from "@/service/supabase";
import { getAllRegion } from "@/service/table";
import { useModalStore } from "@/store/modalStore";
import { useOfficeStore } from "@/store/officeStore";
import { Region } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const SelectOffice = () => {
  // const { regions, isLoading } = useRegion();
  const {
    data: regions,
    isError,
    isLoading
  } = useQuery<Region[]>({ queryFn: async () => await getAllRegion(), queryKey: ["region"] });
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
      <div className="mobile:max-w-[500px] mobile:w-full w-[500px]  bg-white min-h-[512px] h-full px-[20px] pt-[40px] pb-[30px]">
        <form
          className="flex flex-col gap-[30px] max-w-[460px] w-full h-full"
          onSubmit={(e) => {
            e.preventDefault();
            setRegionId(selectedId);
            setOffice(selectedOffice);
            closeModal();
          }}
        >
          <div className="flex flex-col gap-[20px]">
            <p className="font-semibold">행정구역</p>
            <div className="max-w-[460px] w-full h-[82px] leading-none	p-[15px] grid grid-cols-7 gap-x-[20px] border border-[#E5E5E5] mobile:p-[5px] mobile:grid-cols-5">
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
            <div className="max-w-[460px] w-full min-h-[46px] p-[15px] leading-none grid grid-cols-2 gap-x-[20px] gap-y-[10px] border border-[#E5E5E5]">
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
            <div className="max-w-[460px] w-full h-[46px] text-[#3074F0] flex gap-[10px] items-center pl-[15px] border border-[#E5E5E5]">
              <FaLocationDot /> <p>{selectedOffice.address}</p>
            </div>
          </div>
          <div className="mx-auto flex gap-[9px]">
            <CustomButton color="blue" onClick={() => {}} size="md" className="h-[50px]">
              위치 선택
            </CustomButton>
            <CustomButton size="md" type="button" color="gray" className="h-[50px]" onClick={closeModal}>
              취소
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default SelectOffice;

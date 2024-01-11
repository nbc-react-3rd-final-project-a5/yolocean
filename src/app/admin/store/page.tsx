"use client";

import { Store } from "@/types/db";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Postcode } from "./PostCode";
import { useAddressStore } from "@/store/addressStore";
import { getLatLng } from "./useMap";
import useRegion from "@/hooks/useRegion";

type StoreForm = Omit<Store, "id">;
type LatLng = {
  lat: string;
  lng: string;
};
const StoreForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      lat: "",
      lng: "",
      address: "",
      region_id: ""
    }
  });
  const { address, initAddress } = useAddressStore();
  const { region, isLoading } = useRegion();

  const handleStoreFormSubmit = async (data: StoreForm) => {
    try {
      const result = await getLatLng(address);
      if (typeof result === "string") {
        alert(result);
      } else {
        data.lat = result.lat;
        data.lng = result.lng;
      }
      if (
        window.confirm(
          `등록하시려는 지점 정보가 맞습니까? 
지점명 : ${data.name}
주소 : ${data.address}`
        )
      ) {
        insertStoreData(data);
        alert("등록이 완료되었습니다!");
      } else {
        return;
      }
    } catch (error) {
      alert("등록 중 오류 발생. 새로고침 후 시도해주세요.");
      return;
    }
  };

  const insertStoreData = async (data: StoreForm) => {
    await fetch("/api/store", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };
  useEffect(() => {
    initAddress();
  }, []);
  return (
    <div>
      <form
        className="w-[300px] flex flex-col justify-center align-center gap-1"
        onSubmit={handleSubmit(handleStoreFormSubmit)}
      >
        <label htmlFor="name">지점명 *</label>
        <input
          className=" border-black border-solid border"
          id="name"
          type="text"
          {...register("name", {
            required: "지점명을 입력해주세요."
          })}
        />
        {errors?.name ? <p className=" text-red-500">{errors.name.message}</p> : null}

        <select
          {...register("region_id", {
            required: "카테고리를 선택해주세요."
          })}
        >
          <option>카테고리 선택 *</option>
          {region?.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.region}
              </option>
            );
          })}
        </select>
        {errors?.region_id ? <p className=" text-red-500">{errors.region_id.message}</p> : null}

        <Postcode />
        <input
          className="border-black border-solid border"
          id="address"
          type="text"
          value={address}
          {...register("address", {
            required: "주소를 입력해주세요."
          })}
          readOnly
        />
        <button type="submit">지점 등록하기</button>
      </form>
    </div>
  );
};

export default StoreForm;

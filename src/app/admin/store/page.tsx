"use client";

import { Store } from "@/types/db";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Postcode } from "./PostCode";
import { getLatLng } from "./useMap";
import useRegion from "@/hooks/useRegion";

type StoreForm = Omit<Store, "id">;
type LatLng = {
  lat: string;
  lng: string;
};
const StoreForm = () => {
  const [address, setAddress] = useState<string>("");
  const { region, isLoading } = useRegion();

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

  const handleStoreFormSubmit = async (data: StoreForm) => {
    try {
      const result = await getLatLng(address);
      console.log("address", address);
      console.log("result", result);
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

  return (
    <div className="m-auto container max-w-[1200px] w-[90%] flex flex-col justify-center align-center gap-1">
      <p className="text-2xl font-bold">지점등록 페이지</p>
      <form className="w-[300px] flex flex-col justify-center gap-1" onSubmit={handleSubmit(handleStoreFormSubmit)}>
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
            required: "행정지역을 선택해주세요."
          })}
        >
          <option>행정지역 선택 *</option>
          {region?.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.region}
              </option>
            );
          })}
        </select>
        {errors?.region_id ? <p className=" text-red-500">{errors.region_id.message}</p> : null}

        <Postcode setAddress={setAddress} />
        <input
          className="border-black border-solid border"
          id="address"
          type="text"
          placeholder="주소를 검색해주세요."
          value={address}
          readOnly
        />

        <button
          className="border border-black w-[200px] bg-slate-300 mx-auto"
          type="submit"
          onClick={() => {
            setValue("address", address);
          }}
        >
          지점 등록하기
        </button>
      </form>
    </div>
  );
};

export default StoreForm;

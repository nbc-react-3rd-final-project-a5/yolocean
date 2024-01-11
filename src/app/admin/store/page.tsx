"use client";

import { Store } from "@/types/db";
import React from "react";
import { useForm } from "react-hook-form";
import { Postcode } from "./PostCode";
import { useAddressStore } from "@/store/address";
import { getLagLng } from "./useMap";

type StoreForm = Omit<Store, "id">;

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
      address: ""
    }
  });
  const { address } = useAddressStore();
  // const data = getLagLng(address);
  // console.log("data", data);
  const handleStoreFormSubmit = async (data: StoreForm) => {
    insertStoreData(data);
  };
  const insertStoreData = async (data: StoreForm) => {
    await fetch("/api/store", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };
  return (
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
    </form>
  );
};

export default StoreForm;

"use client";

import { Store } from "@/types/db";
import React from "react";
import { useForm } from "react-hook-form";
import { Postcode } from "./PostCode";

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
  return (
    <>
      <input
        className=" border-black border-solid border"
        id="name"
        type="text"
        {...register("name", {
          required: "해당 필드는 필수입니다."
        })}
      />
      <Postcode />
    </>
  );
};

export default StoreForm;

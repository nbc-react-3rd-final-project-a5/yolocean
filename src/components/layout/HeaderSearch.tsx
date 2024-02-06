"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

type Input = {
  searchWord: string;
};

const HeaderSearch = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors }
  } = useForm<Input>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (data.searchWord === undefined) {
      alert("검색어를 입력해주세요.");
      return;
    }
    resetField("searchWord");

    router.push(`/search/${data.searchWord}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center p-2 h-[32px]  border border-point rounded-full">
        <input id="searchWord" type="text" className="w-[180px]  focus:outline-none" {...register("searchWord", { required: true })} aria-label="Search" />
        <button className="inline cursor-pointer " type="submit" aria-label="searchBtn">
          <AiOutlineSearch className="inline cursor-pointer" size="22" color="#3074F0" />
        </button>
      </div>
    </form>
  );
};

export default HeaderSearch;

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

type Input = {
  searchWord: string;
};

const MobileSearch = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors }
  } = useForm<Input>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (data.searchWord === undefined) {
      alert("검색어를 입력해주세요.");
      return;
    }
    resetField("searchWord");

    router.push(`/search/${data.searchWord}`);
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div className="border-none w-0 h-0">
      <button className="cursor-pointer block" type="button" onClick={() => setOpen(!open)}>
        <AiOutlineSearch className="inline cursor-pointer" size="22" color="#3074F0" />
      </button>
      <div
        className={
          open
            ? "flex justify-center gap-4 items-center min-h-[90px] z-10 absolute p-2 bg-white rounded-sm shadow w-full top-0 left-0 text-center"
            : "hidden"
        }
      >
        <div className="w-[80%]  border border-point rounded-full p-1 ">
          <form className="flex justify-between" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="mx-2  focus:outline-none focus:bg-transparent w-[80%]"
              {...register("searchWord", { required: true })}
            />
            <div>
              <button className="inline cursor-pointer mr-2" type="submit">
                <AiOutlineSearch className="inline cursor-pointer " size="22" color="#3074F0" />
              </button>
            </div>
          </form>
        </div>
        <button className="inline cursor-pointer " type="button" onClick={() => setOpen(!open)}>
          <AiOutlineClose className="inline cursor-pointer" size="22" color="#3074F0" />
        </button>
      </div>
    </div>
  );
};

export default MobileSearch;

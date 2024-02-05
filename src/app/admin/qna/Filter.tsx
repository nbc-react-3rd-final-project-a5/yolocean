"use client";
import CustomButton from "@/components/CustomButton";
import { getAllCategory } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  category: string;
}

const Filter = ({ category }: Props) => {
  const { data: categoryList, isLoading } = useQuery({
    queryFn: async () => await getAllCategory(),
    queryKey: ["category"]
  });
  const router = useRouter();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const pathname = usePathname();

  async function handlenSubmitFilter(value: any) {
    const { answer, category } = value;
    router.push(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${pathname}?answer=${answer}&category=${category}`);
  }

  return (
    <form id="tab" onSubmit={handleSubmit(handlenSubmitFilter)} className="flex justify-end items-center  gap-[20px]">
      {!isLoading && categoryList && (
        <select
          {...register("category", { required: true })}
          className=" py-[3.5px] rounded-md px-[10px] border"
          defaultValue={categoryList.find((item: any) => item.id === category)?.id || "All"}
          name="category"
        >
          <option value={"All"}>All</option>
          {categoryList.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.category_name}
            </option>
          ))}
        </select>
      )}
      <select
        className="  py-[3.5px] rounded-md px-[10px] border"
        defaultValue={"답변완료"}
        {...register("answer", { required: true })}
      >
        <option value={"답변완료"}>답변완료</option>
        <option value={"미답변"}>미답변</option>
      </select>
      <div>
        <CustomButton type="submit" size="sm">
          적용
        </CustomButton>
      </div>
    </form>
  );
};

export default Filter;

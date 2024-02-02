"use client";
import CustomButton from "@/components/CustomButton";
import { getAllCarousel } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

interface Props {
  category: string;
}

const Filter = ({ category }: Props) => {
  const { data: categoryList, isLoading } = useQuery({
    queryFn: async () => await getAllCarousel(),
    queryKey: ["category"]
  });
  const router = useRouter();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const pathname = usePathname();

  useEffect(() => {
    console.log("응애 태어남");

    return () => {
      console.log("으앙 주금");
    };
  }, []);

  async function handlenSubmitFilter(value: any) {
    const { answer, category } = value;
    console.log(answer);
    router.push(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${pathname}?answer=${answer}&category=${category}`);
  }

  return (
    <form onSubmit={handleSubmit(handlenSubmitFilter)} className="flex justify-end items-center  gap-[20px]">
      {!isLoading && (
        <select
          {...register("category", { required: true })}
          className="bg-point text-white py-[3.5px] rounded-md px-[10px]"
          defaultValue={categoryList.find((item: any) => item.category_name === category)?.id || "All"}
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
        className="bg-point text-white py-[3.5px] rounded-md px-[10px]"
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

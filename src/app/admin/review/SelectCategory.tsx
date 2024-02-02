import React, { useState } from "react";
import { getAllCategory } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import { CategoryTable } from "@/types/db";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  currentPage: number;
}

const SelectCategory = ({ currentPage }: Props) => {
  //카테고리 읽어오기
  const { data: categoryList, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => getAllCategory()
  });
  //카테고리 메뉴 열기
  const [openCate, setOpenCate] = useState(false);

  const pathName = usePathname();

  return (
    <div>
      <button
        id="categoryDropDown"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenCate(!openCate)}
        className="flex flex-row space-x-[10px]"
      >
        <p className="text-[14px] text-point font-medium leading-loose mobile:hidden">카테고리</p>
      </button>
      <div
        id="dropdown"
        className={
          openCate
            ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-44  mobile:w-full mobile:left-0 mobile:text-center mobile:mt-7"
            : "hidden"
        }
      >
        {!isCategoryLoading && (
          <ul className="pb-2 text-sm  text-gray-700">
            {categoryList!.map((category: CategoryTable) => (
              <li key={category.id}>
                <Link
                  href={{
                    href: pathName,
                    query: { article: category.id, page: 1 }
                  }}
                  prefetch={false}
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={{
                  href: pathName,
                  query: { article: "all", page: 1 }
                }}
                prefetch={false}
              >
                전체보기
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectCategory;
